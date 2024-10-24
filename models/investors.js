const mongoose = require('mongoose');

const investorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    contactInfo: {
        email: String,
        phone: String,
        website: String,
    },
    investmentAreas: [String],
    fundingRange: {
        min: Number,
        max: Number,
    },
    location: {
        city: String,
        state: String,
        country: String,
    },
    experience: Number, // In years
    preferredFundingStages: [String], // E.g., Seed, Series A, etc.
    logoURL:{  // URL for the logo image
        type: String, 
        default:"https://images.pexels.com/photos/7414283/pexels-photo-7414283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

        set: (v)=> v===""?"https://images.pexels.com/photos/7414283/pexels-photo-7414283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1":v,
    },    
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },
});

const Investor = mongoose.model('Investor', investorSchema);

module.exports = Investor;
