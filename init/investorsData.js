const sampleInvestors = [


    // {
    //     name: "John Doe",
    //     industry: "Technology",
    //     contactInfo: {
    //         email: "johndoe@example.com",
    //         phone: 1234567890,
    //         website: "https://johndoeventures.com"
    //     },
    //     investmentAreas: "Artificial Intelligence, Blockchain, Cloud Computing",
    //     fundingRange: {
    //         min: 50000,
    //         max: 200000
    //     },
    //     location: {
    //         city: "San Francisco",
    //         state: "California",
    //         country: "USA"
    //     },
    //     experience: 10,
    //     preferredFundingStages: "Series A",
    //     logoURL: "https://images.pexels.com/photos/7414283/pexels-photo-7414283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     status: "Active",
    //     owner: "605c5b2b515df830b8c915da"  // Example ObjectId (replace with actual user ID)
    // },
    {
        name: "Jane Smith",
        industry: "Healthcare",
        contactInfo: {
            email: "janesmith@example.com",
            phone: 9876543210,
            website: "https://janesmithinvestments.com"
        },
        investmentAreas: "Biotechnology, Pharmaceuticals",
        fundingRange: {
            min: 100000,
            max: 500000
        },
        location: {
            city: "New York",
            state: "New York",
            country: "USA"
        },
        experience: 15,
        preferredFundingStages: "Seed",
        logoURL: {
            filename: "investorImg",
            url: "https://images.pexels.com/photos/8962682/pexels-photo-8962682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }, 
        status: "Active",
        owner: "67338d295785c04cf16cc2c4"  
    },
    // {
    //     name: "Carlos Gonzalez",
    //     industry: "Renewable Energy",
    //     contactInfo: {
    //         email: "carlosg@example.com",
    //         phone: 4567891234,
    //         website: "https://cgenergyinvest.com"
    //     },
    //     investmentAreas: "Solar Energy, Wind Energy",
    //     fundingRange: {
    //         min: 250000,
    //         max: 1000000
    //     },
    //     location: {
    //         city: "Madrid",
    //         state: "Madrid",
    //         country: "Spain"
    //     },
    //     experience: 8,
    //     preferredFundingStages: "Series B",
    //     logoURL: "https://images.pexels.com/photos/123123/pexels-photo-123123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     status: "Inactive",
    //     owner: "605c5b2b515df830b8c915dc"
    // }


];

module.exports = { data: sampleInvestors };
