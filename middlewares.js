const Joi = require('joi');
const passport = require('passport');
const flash = require('express-flash');

const Startup = require("./models/startups.js")
const Investor = require("./models/investors.js");
const Mentor = require("./models/mentors.js");


// Middleware function to validate request data
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // Send a 400 error response if validation fails
      return res.status(400).json({ error: error.details[0].message });
    }
    next(); // Move to the next middleware or route handler if validation passes
  };
};

module.exports = validateRequest;




module.exports.isLoggedIn = (req, res, next)=>{

  // console.log('Is user authenticated?', req.isAuthenticated());

  // console.log(req.user);

  if(!req.isAuthenticated()){
    //const Message = req.flash('error', 'Register First');
    req.session.redirectUrl = req.originalUrl;
    console.log( req.session.redirectUrl)
    req.flash("error", "Register/Login First");
    return res.redirect("/register");
  }
  next();
};




module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl){
    console.log( req.session.redirectUrl)
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}




module.exports.isInvestor = async (req, res, next) => {
   let investor = await Investor.findById(req.params.id);
   if(!investor.owner.equals(res.locals.currUser._id)){
    req.flash("error", "You are not Owner of This");
    return res.redirect(`/investors/${req.params.id}`);
   }
   next(); 
}


module.exports.isStartup = async (req, res, next) => {
  let startup = await Startup.findById(req.params.id);
  if(!startup.owner.equals(res.locals.currUser._id)){
   req.flash("error", "You are not Owner of This");
   return res.redirect(`/startups/${req.params.id}`);
  }
  next(); 
}



module.exports.isMentor = async (req, res, next) => {
  let mentor = await Mentor.findById(req.params.id);
  if(!mentor.owner.equals(res.locals.currUser._id)){
   req.flash("error", "You are not Owner of This");
   return res.redirect(`/mentors/${req.params.id}`);
  }
  next(); 
}
