const mongoose = require("mongoose");
const startupdata = require("./startupdata.js");
const Startup = require("../models/startups.js");
const Investor = require("../models/investors.js");
const investorsData = require("./investorsData.js");
const Mentor = require("../models/mentors.js");
const mentorsData = require("./mentorsData.js");


const MONGO_URL = 'mongodb://127.0.0.1:27017/AyushPortal';

async function main(){
    await mongoose.connect(MONGO_URL)
}

main().then(()=>{
    console.log("Database Connected");
}).catch(err => {
    console.log(err);
})


// const initDB = async ()=> {
//     await Startup.deleteMany({});
//     await Startup.insertMany(startupdata.data);
//     console.log("data was initialized");
// }

const initDB = async ()=> {
    await Investor.deleteMany({});
    await Investor.insertMany(investorsData.data);
    console.log("data was initialized");
}


// const initDB = async ()=> {
//     await Mentor.deleteMany({});
//     await Mentor.insertMany(mentorsData.data);
//     console.log("data was initialized");
// }

initDB();