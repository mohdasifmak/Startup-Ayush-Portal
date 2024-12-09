const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        phone: Number,
        website: String,
    },
    investmentAreas: {
        type: String,
        require: true,
    },
    fundingRange: {
        min: Number,
        max: Number,
    },
    location: {
        city: String,
        state: String,
        country: String,
    },
    experience: Number,
    preferredFundingStages: { type: String, enum: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Bootstrapped'], required: true },

    logoURL:{  // URL for the logo image
        url: String,
        filename: String,
    },    
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const Investor = mongoose.model('Investor', investorSchema);

module.exports = Investor;
