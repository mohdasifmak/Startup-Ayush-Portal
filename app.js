if(process.env.NODE_ENV != "production"){
   const dotenv = require('dotenv');
   dotenv.config(); 
}


const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Startup = require("./models/startups.js")
const Investor = require("./models/investors.js");
const Mentor = require("./models/mentors.js");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require('express-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/WrapAsync.js");
const validateRequest = require('./middlewares.js');
const {investorValidationSchema, mentorValidationSchema, startupValidationSchema } = require('./SchemaValidation.js');
const {isLoggedIn} = require('./middlewares.js');
const {saveRedirectUrl} = require('./middlewares.js');
const {isInvestor} = require('./middlewares.js');
const {isMentor} = require('./middlewares.js');
const {isStartup} = require('./middlewares.js');
const multer = require('multer');
const {storage, cloudinary} = require("./cloudConfig.js");
const MongoStore = require('connect-mongo');
const upload = multer({ storage });


//startup = demo1
//investor = demo2
//mentor = demo3


//const dbUrl = 'mongodb://127.0.0.1:27017/AyushPortal';

const dbUrl = process.env.ATLAS_URL;

async function main(){
    await mongoose.connect(dbUrl);
}

main().then(()=>{
    console.log("Database Connected");
}).catch(err => {
    console.log(err);
})



app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

// Serve static files from the 'assets' directory
app.use('/assets', express.static('assets'));


app.engine("ejs", ejsMate);



const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});


store.on("error", ()=>{
    console.log("Error in Mongo Seassion Store", err);
});

const sessionOption = {
  store,  
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 7*24*60*60*1000,
    maxAge:  7*24*60*60*1000,
    httpOnly: true
  },
}



app.use(session(sessionOption));
app.use(flash());


//passport setup for authentication and aothorization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success_message = req.flash('success');
    res.locals.error_message = req.flash('error');
    res.locals.currUser = req.user;
    next();
  });




// Render the homepage
app.get('/', (req, res) => {
    res.render('home'); 
});



// Render registration form
app.get('/register', (req, res) => {
    //console.log('Rendering register page...');
    res.render('register');
  });




app.post('/register', async (req, res) => {
    const { name, username, email, password, role } = req.body;

    try {
        // Register new user asynchronously
        const newUser = new User({username, email, role });

        // User.register() returns a promise; await its completion
        const registeredUser = await User.register(newUser, password);

        //console.log(registeredUser);
        // After registration, redirect based on role to role-specific form
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }

            if (role === 'Startup') {
                res.render('startupForm', { registeredUser });
            } else if (role === 'Investor') {
                res.render('investorForm', { registeredUser });
            } else if (role === 'Mentor') {
                res.render('mentorForm', { registeredUser });
            } else {
                // If General User, no additional form is required, redirect to home
                res.redirect('/');
            }   

        });

    } catch (err) {
        // Handle registration errors
        console.log('Error registering user:', err);
        if (err.name === 'UserExistsError') {
            return res.status(400).send('User with this email or username already exists.');
        }
        return res.status(500).send('Error registering user.');
    }
});


  

// Render login form
app.get('/login', (req, res) => {
    const errorMessage = req.flash('error');
    res.render('login', { errorMessage });
});


app.post('/login', saveRedirectUrl ,passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), async (req, res)=>{
    req.flash("success", "You are now login");
    let redirectUrl = res.locals.redirectUrl || "/";
    delete req.session.redirectTo;
    res.redirect(redirectUrl);
}); 


app.get('/logout', (req, res, next)=>{
   req.logout((err) => {
    if(err){
        return next(err);
    }
    req.flash("success", "You are log out");
    res.redirect('/');
   })
});





app.get('/startups', async (req, res)=>{
     const allStartups = await Startup.find({});
     //console.log(allStartups);
     res.render("startups.ejs", {allStartups})
})



app.post('/register/startup', upload.single("logo"), validateRequest(startupValidationSchema), async (req, res) => {
    try{
        let url = req.file.path;
        let filename = req.file.filename;
        console.log(url);
        console.log(filename);
        const newStartup = new Startup(req.body);
        newStartup.owner = req.user._id;
        newStartup.logo= {url, filename};
        await newStartup.save();
        console.log(newStartup);
        req.flash("success", "Welcome To Startup AYUSH Portal");
        res.redirect('/startups');
    }catch(err){
        res.status(500).send('Something went wrong');
    }
   
});



app.get('/startups/:id', isLoggedIn, async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id).populate("owner");
        if (!startup) {
          return res.status(404).send('Startup not found');
        }
        console.log(startup);
        res.render('showStartup', { startup });
      } catch (error) {
        console.error('Error fetching startup:', error);
        res.status(500).send('Server Error');
      }
})


// Route to get the edit form
app.get('/startup/update/:id', isLoggedIn, isStartup, async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id);
        if (!startup) {
            return res.status(404).send('Investor not found');
        }
        res.render('editStartup', { startup });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});



// Route to handle update submission
app.post('/startup/update/:id', upload.single("logo"), isStartup, async (req, res) => {
    try {
        let startup = await Startup.findByIdAndUpdate(req.params.id, req.body);

        if(typeof req.file != "undefined"){
            let url = req.file.path;
            let filename = req.file.filename;
            startup.logo = {url, filename};
            await startup.save();
        }
        req.flash("success", "Profile Updated");
        res.redirect(`/startups/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating investor');
    }
});



// Route to delete an investor
app.post('/startup/delete/:id', isLoggedIn, isStartup, async (req, res) => {
    try {
        await Startup.findByIdAndDelete(req.params.id);
        req.flash("success", "Profile Deleted");
        res.redirect('/startups'); // Redirect back to the investors list
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting investor');
    }
});



app.get('/about', (req, res) => {
    res.render("about.ejs");
})




app.post('/register/investor', upload.single("logoURL") ,validateRequest(investorValidationSchema), async (req, res) => {
    try{
        let url = req.file.path;
        let filename = req.file.filename;
        //console.log(req.body);
        const newInvestor = new Investor(req.body);
        newInvestor.owner = req.user._id;
        newInvestor.logoURL= {url, filename};
        await newInvestor.save();
        console.log(newInvestor);
        req.flash("success", "Welcome To Startup AYUSH Portal");
        res.redirect('/investors');
    }catch(err){
        console.log(err);
        res.status(500).send('Somgthing went Wrong');
    }
    
});




app.get('/investors', async (req, res) => {
    try {
        const investors = await Investor.find();
        res.render('investors', { investors });
    } catch (error) {
        console.error('Error fetching investors:', error);
        res.status(500).send('Server Error');
    }
});



app.get('/investors/:id', isLoggedIn, async (req, res) => {
    try {
        const investor = await Investor.findById(req.params.id).populate("owner");
        if (!investor) {
            return res.status(404).send('Investor not found');
        }
        console.log(investor);
        res.render('showInvestor', { investor });
    } catch (error) {
        console.error('Error fetching investor:', error);
        res.status(500).send('Server Error');
    }
});


// Route to get the edit form
app.get('/investor/update/:id',isLoggedIn, isInvestor, async (req, res) => {
    try {
        const investor = await Investor.findById(req.params.id);
        if (!investor) {
            return res.status(404).send('Investor not found');
        }
        res.render('editInvestor', { investor });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});


// Route to handle update submission
app.post('/investor/update/:id',upload.single("logoURL"), isInvestor, async (req, res) => {
    try {
        let investor = await Investor.findByIdAndUpdate(req.params.id, req.body);

        if(typeof req.file !== "undefined"){
            let url = req.file.path;
            let filename = req.file.filename;
            investor.logoURL= {url, filename};
            await investor.save();
        }
        req.flash("success", "Profile Updated");
        res.redirect(`/investors/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating investor');
    }
});



// Route to delete an investor
app.post('/investor/delete/:id', isInvestor, isLoggedIn, async (req, res) => {
    try {
        await Investor.findByIdAndDelete(req.params.id);
        req.flash("success", "Profile Deleted");
        res.redirect('/investors'); // Redirect back to the investors list
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting investor');
    }
});






app.post('/register/mentor',upload.single("logoUrl"), validateRequest(mentorValidationSchema), async (req, res) => {
    try{
        let url = req.file.path;
        let filename = req.file.filename;
        console.log(url);
        console.log(filename);
        const newMentor = new Mentor(req.body);
        newMentor.owner = req.user._id;
        newMentor.logoUrl = {url, filename};
        console.log(newMentor);
        await newMentor.save();
        console.log(newMentor);
        req.flash("success", "Welcome To Startup AYUSH Portal");
        res.redirect('/mentors');
    }catch(err){
        console.log(err);
        res.status(500).send('Somgthing went Wrong');
    }
});



// app.post('/register/mentor', upload.single("logoUrl"), (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send("File upload failed.");
//         }
//         res.status(200).send(req.file);
//     } catch (err) {
//         console.error("Error handling file upload:", err);
//         res.status(500).send("Internal Server Error.");
//     }
// });




app.get("/mentors", async (req, res)=>{
    try {
        const mentors = await Mentor.find();
        res.render('mentors', { mentors });
      } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).send('Server Error');
      }
})


app.get("/mentors/:id", isLoggedIn, async (req, res)=>{
    try {
        const mentor = await Mentor.findById(req.params.id).populate("owner");
        if (!mentor) {
          return res.status(404).send('Mentor not found');
        }
        //console.log(mentor);
        return res.render('showMentor', { mentor });
      } catch (error) {
        console.error('Error fetching mentor:', error);
        return res.status(500).send('Server Error');
      }
})




// Route to get the edit form
app.get('/mentor/update/:id', isLoggedIn, isMentor, async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id);
        if (!mentor) {
            return res.status(404).send('Investor not found');
        }
        res.render('editMentor', { mentor });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});


// Route to handle update submission
app.post('/mentor/update/:id',upload.single("logoUrl"), async (req, res) => {
    try {
        let mentor = await Mentor.findByIdAndUpdate(req.params.id, req.body);
        if(typeof req.file != "undefined"){
            let url = req.file.path;
            let filename = req.file.filename;
            mentor.logoUrl = {url, filename};
            await mentor.save();
        }
        req.flash("success", "Profile Updated");
        res.redirect(`/mentors/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating Mentor');
    }
});



// Route to delete an investor
app.post('/mentor/delete/:id', isLoggedIn, isMentor, async (req, res) => {
    try {
        await Mentor.findByIdAndDelete(req.params.id);
        req.flash("success", "Profile Deleted");
        res.redirect('/mentors'); // Redirect back to the investors list
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting investor');
    }
});


  
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).send("Internal Server Error");
});


app.all("*", (req, res, next) =>{
    next(new ExpressError(404, "Page Not Found"));
});




app.use((err, req, res, next) => {
     let {statusCode , message} = err;
     res.status(statusCode).send(message);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});