
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  expertise: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  email: {
      type: String,
      required: true
  },
  phone: {
      type: Number,
      required: true
  },
  bio: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  logoUrl: {
    url: String,
    filename: String,
  },
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model('Mentor', MentorSchema);
