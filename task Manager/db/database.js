const mongoose = require('mongoose')




const connectDB = async ()=>{

try {
  const connectionInstance = await mongoose.connect(process.env.MONGOOSEURI)

//   console.log(connectionInstance);
  console.log("db connection successfully ");
    
} catch (error) {
    console.log("db connection error", error);
    throw error
}}

module.exports = {connectDB}


