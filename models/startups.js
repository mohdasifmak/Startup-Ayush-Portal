const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const ContactInfoSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: Number},
    website: { type: String },
});

const FundingInfoSchema = new mongoose.Schema({
    fundingStage: { type: String, enum: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Bootstrapped'], required: true },
    fundingRaised: { type: Number },
    investmentRequired: { type: Number },
});

const OperationalDetailsSchema = new mongoose.Schema({
    teamSize: { type: Number },
    revenueModel: { type: String },
    visionMission: { type: String },
    status: { type: String, enum: ['Active', 'Closed', 'Acquired'], required: true },
});


// Define the main Startup schema with nested sub-schemas
const StartupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: {
        url: String,
        filename: String,
    },
    industry: { type: String, enum: ['Ayurveda', 'Yoga', 'Naturopathy', 'Unani', 'Siddha', 'Homeopathy'], required: true },
    founderName: { type: String, required: true },
    foundedYear: { type: Number, min: 1900, max: 2024, required: true },
    location: { type: String, required: true },
    
    // Embedding sub-schemas for contact, funding, and operational details
    contactInfo: ContactInfoSchema,
    fundingInfo: FundingInfoSchema,
    operationalDetails: OperationalDetailsSchema,

    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

// Export the model for use in routes
const Startup = mongoose.model('Startup', StartupSchema);

module.exports = Startup;