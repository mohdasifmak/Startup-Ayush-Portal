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



//add owner either this way or direct add in data file
const initDB = async ()=> {
    await Startup.deleteMany({});
    startupdata.data = startupdata.data.map((obj) => ({...obj, owner: "673388f4c263bfc6ee1ff6b0"}));
    await Startup.insertMany(startupdata.data);
    console.log("data was initialized");
}



// const initDB = async ()=> {
//     await Investor.deleteMany({});
//     //investorsData.data = investorsData.data.map((obj) => ({...obj, owner: "67338d295785c04cf16cc2c4"}));
//     await Investor.insertMany(investorsData.data);
//     console.log("data was initialized");
// }


// const initDB = async ()=> {
//     await Mentor.deleteMany({});
//     await Mentor.insertMany(mentorsData.data);
//     console.log("data was initialized");
// }

initDB();