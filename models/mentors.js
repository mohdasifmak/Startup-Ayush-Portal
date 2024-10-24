
const mongoose = require('mongoose');

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
  contactInfo: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
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
    type: String,
    default:"https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    set: (v)=> v===""?"https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1":v,
    required: true
  }
});

module.exports = mongoose.model('Mentor', MentorSchema);
