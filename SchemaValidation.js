
const Joi = require("joi");

const investorValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    industry: Joi.string().required(),
    
    contactInfo: Joi.object({
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^\d{10}$/).required(),
        website: Joi.string().uri().allow('').optional(),
    }).optional(),

    investmentAreas: Joi.string().required(),
    
    fundingRange: Joi.object({
        min: Joi.number().min(0).required(),
        max: Joi.number().greater(Joi.ref('min')).required(),
    }).optional(),
    
    location: Joi.object({
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        country: Joi.string().optional(),
    }).optional(),
    
    experience: Joi.number().integer().min(0).required(),
    
    preferredFundingStages: Joi.string().valid('Pre-seed', 'Seed', 'Series A', 'Series B', 'Bootstrapped').required(),
    
    logoURL: Joi.string().uri().default("https://images.pexels.com/photos/7414283/pexels-photo-7414283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"),
    
    status: Joi.string().valid('Active', 'Inactive').default('Active'),
});








const mentorValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    expertise: Joi.string().min(3).required(),
    experience: Joi.number().integer().min(0).required(),
    location: Joi.string().required(),
    
    // Top-level email and phone fields
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required(),

    bio: Joi.string().min(10).required(),
    availability: Joi.string().required(),
    logoUrl: Joi.string().uri().default("https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"),
});











const contactInfoValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10}$/).required(), // Assuming phone number is 10 digits
    website: Joi.string().uri().allow('').optional(),
});

const fundingInfoValidationSchema = Joi.object({
    fundingStage: Joi.string().valid('Pre-seed', 'Seed', 'Series A', 'Series B', 'Bootstrapped').required(),
    fundingRaised: Joi.number().min(0).required(),
    investmentRequired: Joi.number().min(0).required(),
});

const operationalDetailsValidationSchema = Joi.object({
    teamSize: Joi.number().min(1).required(),
    revenueModel: Joi.string().required(),
    visionMission: Joi.string().optional(),
    status: Joi.string().valid('Active', 'Closed', 'Acquired').required(),
});




// Main Startup validation schema
const startupValidationSchema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    logo: Joi.string().uri().allow('').default("https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"),
    industry: Joi.string().valid('Ayurveda', 'Yoga', 'Naturopathy', 'Unani', 'Siddha', 'Homeopathy').required(),
    founderName: Joi.string().required(),
    foundedYear: Joi.number().integer().min(1900).max(2024).required(),
    location: Joi.string().required(),
    
    // Nested validation for contact, funding, and operational details
    contactInfo: contactInfoValidationSchema,
    fundingInfo: fundingInfoValidationSchema,
    operationalDetails: operationalDetailsValidationSchema,
});




module.exports = { investorValidationSchema,  mentorValidationSchema, startupValidationSchema};