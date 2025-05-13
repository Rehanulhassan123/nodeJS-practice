const {StatusCodes} = require("http-status-codes")
const apiError = require("../utils/CustomApiError.js")
const User = require("../models/userModel.js")
const jwt = require("jsonwebtoken")


const verifyJWT = async(req,res,next)=>
{
  
  try {
    const authHeaders = req.headers.authorization
    if(!authHeaders || !authHeaders.startsWith("Bearer "))
    {
       throw new apiError(StatusCodes.UNAUTHORIZED,"Token is required")
    }
    const token = await authHeaders.split(" ")[1]
   const decodedToken = jwt.verify(token,process.env.jWT_SECRET)
   if(!decodedToken)
   {
    throw new apiError(StatusCodes.INTERNAL_SERVER_ERROR,"something went worng while verifying token")
   }
   

   const user = await User.findOne({_id:decodedToken.id}).select("-password")

    req.user = user

    next()
    
  } catch (error) {
    throw new apiError(StatusCodes.UNAUTHORIZED,"invalid token authentication")
  }
}

module.exports = verifyJWT