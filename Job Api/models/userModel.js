
const mongoose = require("mongoose")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Jobs = require("./jobModel.js")


const userSchema = new mongoose.Schema(
    {
      username:{
        type:String,
        required:[true,"UserName is required"],
        minLength:4,
        maxLength:10,
        lowercase: true
      },
      email:{
        type:String,
        required:[true,"UserName is required"],
        lowercase: true,
        match:[
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}  \])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
       "Email is required"],
       unique:true

      },
      password:{
        type:String,
        required:[true,"password is required"],
        minLength:5,
      }
    },
    {timestamps:true}
)
// ++++++++++++++++++++++++++++ adding password hashing using bcrypt ++++++++++++++++++

userSchema.pre("save", async function(next){
    
  if(!this.isModified("password")) return next()

    this.password = await bycrypt.hash(this.password,10)
    next()
})

///+++++++++++++++++ adding hook to delete jobs when user get deleted ++++++++++++++++++

 userSchema.pre("remove", async function (next){
   try {

    await Jobs.deleteMany({createdBy:this._id})
    next()
    
   } catch (error) {
    throw new apiError(500,"something went wrong while deleting jobs")
   }
 })

/// +++++++++++++++++++++++++++++++ adding function for checking the passowrd ++++++++++++

userSchema.methods.validatePassword =  async function(password)
{
     const result = bycrypt.compare(await password,this.password)
      return result
}

/// +++++++++++++++++++++++++++ creating jwt tokens +++++++++++++++++++++++++++++++++++++++++

   userSchema.methods.GenerateJWT = async function()
   {
      return jwt.sign(
        {id:this._id, name:this.username},
        process.env.jWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRY}
      )
   }




module.exports = mongoose.model("user",userSchema)