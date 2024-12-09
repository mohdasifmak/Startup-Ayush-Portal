const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");



//passport atomaticaly add the username and password, so no need to define in schema
const userSchema = new mongoose.Schema({
  //username: { type: String, required: true, unique: true }, // Username field
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Startup', 'Investor', 'Mentor', 'General User'], required: true },
  date: { type: Date, default: Date.now }
});


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
module.exports = User;
