const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Startup = require("./models/startups.js")
const Investor = require("./models/investors.js");
const Mentor = require('./models/mentors.js');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js");


const MONGO_URL = 'mongodb://127.0.0.1:27017/AyushPortal';

async function main(){
    await mongoose.connect(MONGO_URL)
}

main().then(()=>{
    console.log("Database Connected");
}).catch(err => {
    console.log(err);
})



// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'assets' directory
app.use('/assets', express.static('assets'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.engine("ejs", ejsMate);


const sessionOption = {
  secret:"myCode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 7*24*60*60*1000,
    maxAge:  7*24*60*60*1000,
    httpOnly: true
  },
}

app.use(session(sessionOption));


//passport setup for authentication and aothorization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get('/test1', (req, res)=>{
  res.render('mentorForm')
})


app.get('/test2', (req, res)=>{
    res.render('startupForm')
  })


  app.get('/test3', (req, res)=>{
    res.render('investorForm')
  })

// Render the homepage
app.get('/', (req, res) => {
    res.render('home');  // 'index' refers to the 'index.ejs' file in the 'views' folder
});


app.get('/startups', async (req, res)=>{
     const allStartups = await Startup.find({});
     //console.log(allStartups);
     res.render("startups.ejs", {allStartups})
})



app.post('/register/startup', async (req, res) => {
    const newStartup = new Startup(req.body);
    await newStartup.save();
    console.log(newStartup);
    res.redirect('/startups');
});



app.get('/startups/:id', async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id);
        if (!startup) {
          return res.status(404).send('Startup not found');
        }
        res.render('showStartup', { startup });
      } catch (error) {
        console.error('Error fetching startup:', error);
        res.status(500).send('Server Error');
      }
})


// Route to get the edit form
app.get('/startup/update/:id', async (req, res) => {
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
app.post('/startup/update/:id', async (req, res) => {
    try {
        await Startup.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/startups');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating investor');
    }
});



// Route to delete an investor
app.post('/startup/delete/:id', async (req, res) => {
    try {
        await Startup.findByIdAndDelete(req.params.id);
        res.redirect('/startups'); // Redirect back to the investors list
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting investor');
    }
});



app.get('/about', (req, res) => {
    res.render("about.ejs");
})




app.post('/register/investor', async (req, res) => {
    const newInvestor = new Investor(req.body);
    await newInvestor.save();
    console.log(newInvestor);
    res.redirect('/investors');
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



app.get('/investors/:id', async (req, res) => {
    try {
        const investor = await Investor.findById(req.params.id);
        if (!investor) {
            return res.status(404).send('Investor not found');
        }
        res.render('showInvestor', { investor });
    } catch (error) {
        console.error('Error fetching investor:', error);
        res.status(500).send('Server Error');
    }
});


// Route to get the edit form
app.get('/investor/update/:id', async (req, res) => {
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
app.post('/investor/update/:id', async (req, res) => {
    try {
        await Investor.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/investors');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating investor');
    }
});



// Route to delete an investor
app.post('/investor/delete/:id', async (req, res) => {
    try {
        await Investor.findByIdAndDelete(req.params.id);
        res.redirect('/investors'); // Redirect back to the investors list
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting investor');
    }
});


app.get("/mentors", async (req, res)=>{
    try {
        const mentors = await Mentor.find();
        res.render('mentors', { mentors });
      } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).send('Server Error');
      }
})


app.get("/mentors/:id", async (req, res)=>{
    try {
        const mentor = await Mentor.findById(req.params.id);
        if (!mentor) {
          return res.status(404).send('Mentor not found');
        }
        res.render('showMentor', { mentor });
      } catch (error) {
        console.error('Error fetching mentor:', error);
        res.status(500).send('Server Error');
      }
})




app.post('/register/mentor', async (req, res) => {
    const newStartup = new Mentor(req.body);
    await newStartup.save();
    console.log(newStartup);
    res.redirect('/mentors');
});




// Route to get the edit form
app.get('/mentor/update/:id', async (req, res) => {
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
app.post('/mentor/update/:id', async (req, res) => {
    try {
        await Mentor.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/mentors');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating investor');
    }
});



// Route to delete an investor
app.post('/mentor/delete/:id', async (req, res) => {
    try {
        await Mentor.findByIdAndDelete(req.params.id);
        res.redirect('/mentors'); // Redirect back to the investors list
    } catch (err) {
        console.log(err);
        res.status(500).send('Error deleting investor');
    }
});




// Render registration form
app.get('/register', (req, res) => {
    res.render('register');
  });




  app.post('/register', async (req, res) => {
    const { name, username, email, password, role } = req.body;

    try {
        // Register new user asynchronously
        const newUser = new User({ name, username, email, role });

        // User.register() returns a promise; await its completion
        const registeredUser = await User.register(newUser, password);

        // After registration, redirect based on role to role-specific form
        if (role === 'Startup') {
            res.render('startupForm', { userId: registeredUser._id });
        } else if (role === 'Investor') {
            res.render('investorForm', { userId: registeredUser._id });
        } else if (role === 'Mentor') {
            res.render('mentorForm', { userId: registeredUser._id });
        } else {
            // If General User, no additional form is required, redirect to home
            res.redirect('/home');
        }

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
    res.render('login');
  });
  


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});