const mongoose = require("mongoose")


const connectDB = async()=>{
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGOOSEURI)
    console.log("db connected successfully",)
  } 
  catch (error) {
    throw error
  }
}

module.exports = connectDB