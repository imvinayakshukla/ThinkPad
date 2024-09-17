const mongoose = require('mongoose');

const url = "mongodb+srv://vinayakshukla0786:Vinayak%40123@cluster0.8q87j.mongodb.net/";


// Use async/await to connect to MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;