const mongoose = require("mongoose");


// Define the sub-schema for different sections of the startup data
const ContactInfoSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String },
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
        type: String,
        default:"https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

        set: (v)=> v===""?"https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1":v,
        required: true
    },
    industry: { type: String, enum: ['Ayurveda', 'Yoga', 'Naturopathy', 'Unani', 'Siddha', 'Homeopathy'], required: true },
    founderName: { type: String, required: true },
    foundedYear: { type: Number, min: 1900, max: 2024, required: true },
    location: { type: String, required: true },
    
    // Embedding sub-schemas for contact, funding, and operational details
    contactInfo: ContactInfoSchema,
    fundingInfo: FundingInfoSchema,
    operationalDetails: OperationalDetailsSchema,
});

// Export the model for use in routes
const Startup = mongoose.model('Startup', StartupSchema);

module.exports = Startup;