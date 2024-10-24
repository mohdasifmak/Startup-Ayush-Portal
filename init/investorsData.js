const sampleInvestors = [
    {
        name: "Global Ventures",
        industry: "Healthcare",
        contactInfo: {
            email: "contact@globalventures.com",
            phone: "9876543210",
            website: "http://globalventures.com"
        },
        investmentAreas: ["Healthcare Technology", "Wellness", "Biotechnology"],
        fundingRange: {
            min: 1000000,
            max: 5000000
        },
        location: {
            city: "New York",
            state: "NY",
            country: "USA"
        },
        experience: 15,
        preferredFundingStages: ["Seed", "Series A", "Series B"],
        logoURL: "https://images.pexels.com/photos/8962682/pexels-photo-8962682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        status: "Active"
    },
    {
        name: "AyurFund Capital",
        industry: "Ayurveda",
        contactInfo: {
            email: "info@ayurfund.com",
            phone: "9988776655",
            website: "http://ayurfund.com"
        },
        investmentAreas: ["Herbal Products", "Natural Remedies", "Wellness"],
        fundingRange: {
            min: 500000,
            max: 2000000
        },
        location: {
            city: "Mumbai",
            state: "Maharashtra",
            country: "India"
        },
        experience: 8,
        preferredFundingStages: ["Pre-seed", "Seed"],
        logoURL: "https://media.istockphoto.com/id/1822210952/photo/businessman-with-computer-reading-documents-in-office-stock-photo.jpg?s=2048x2048&w=is&k=20&c=DbmLfJa46vdrqzPmlx3E6MuHZqecjsvogBUfjrVNiII=",
        status: "Active"
    },
    {
        name: "HealthBridge Partners",
        industry: "Healthcare",
        contactInfo: {
            email: "partners@healthbridge.com",
            phone: "9123456780",
            website: "http://healthbridge.com"
        },
        investmentAreas: ["Digital Health", "Healthcare Systems", "Homeopathy"],
        fundingRange: {
            min: 2000000,
            max: 7000000
        },
        location: {
            city: "San Francisco",
            state: "CA",
            country: "USA"
        },
        experience: 20,
        preferredFundingStages: ["Series A", "Series B", "Series C"],
        logoURL: "https://media.istockphoto.com/id/1364917563/photo/businessman-smiling-with-arms-crossed-on-white-background.jpg?s=2048x2048&w=is&k=20&c=uEaEqFvI74GpTWzcRCiDMR3qWqS2qVzKQREVBgmcxao="
    },
    {
        name: "Wellness Equity",
        industry: "Wellness",
        contactInfo: {
            email: "contact@wellnessequity.com",
            phone: "7896541230",
            website: "http://wellnessequity.com"
        },
        investmentAreas: ["Yoga", "Mindfulness", "Wellness Apps"],
        fundingRange: {
            min: 1000000,
            max: 4000000
        },
        location: {
            city: "Bangalore",
            state: "Karnataka",
            country: "India"
        },
        experience: 12,
        preferredFundingStages: ["Seed", "Series A"],
        logoURL: "https://media.istockphoto.com/id/953587362/photo/businessman-standing-with-his-arms-folded-stock-image.jpg?s=2048x2048&w=is&k=20&c=wWxa--U2AQUSu3fEr7poehedecbHCKN92TQZs_2eSbw="
    },
    {
        name: "AYUSH Angels",
        industry: "AYUSH",
        contactInfo: {
            email: "contact@ayushangels.com",
            phone: "9823456781",
            website: "http://ayushangels.com"
        },
        investmentAreas: ["Naturopathy", "Homeopathy", "Herbal Research"],
        fundingRange: {
            min: 1500000,
            max: 6000000
        },
        location: {
            city: "Delhi",
            state: "Delhi",
            country: "India"
        },
        experience: 10,
        preferredFundingStages: ["Seed", "Series A"],
        logoURL: "https://media.istockphoto.com/id/1040999700/photo/handsome-indian-businessman.jpg?s=2048x2048&w=is&k=20&c=MILq144ilTFE935mytNxTYogkzDbHEh2u2wY_b7u9v4=",
        status: "Active"
    }
];

module.exports = { data: sampleInvestors };
