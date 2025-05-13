require("express-async-errors")
const apiError = require("../utils/CustomApiError.js")
const apiResponse = require("../utils/CustomApiResponse.js")
const {StatusCodes} = require("http-status-codes")
const User = require("../models/userModel.js")

const registerUser = async(req,res)=>
{
  const {username,email,password} = req.body
  if(!username || !email || !password)
  {
    console.log(StatusCodes);
    throw new apiError(StatusCodes.BAD_REQUEST,"All data Feilds Required")
  }

  const user = await User.create({username,email,password});

  if(!user)
  {
    throw new apiError(StatusCodes.INTERNAL_SERVER_ERROR),"something went wrong while saving user data"
  }

  const createdUser = await  User.findOne({username}).select("-password")

  return res.status(StatusCodes.OK)
         .json(new apiResponse(
            StatusCodes.OK,
            "user registered Successfully",
             createdUser
         ))
}

const loginUser = async(req,res)=>
{
    const {email,password} = req.body
    if(!email || !password)
    {
        throw new apiError(StatusCodes.BAD_REQUEST,"All fields are required")
    }
  const user =  await User.findOne({email})

   if(!user)
   {
     throw new apiError(StatusCodes.UNAUTHORIZED,"Invalid Credentials")
   }

    const isPasswordValid = user.validatePassword(password)

    if(!isPasswordValid)
    {
        throw new apiError(StatusCodes.UNAUTHORIZED,"Invalid Credentials")
    }

    const token = await user.GenerateJWT()
    console.log(token);

    if(!token)
    {
        throw new apiError(StatusCodes.INTERNAL_SERVER_ERROR,"something went wrong while generating tokens")
    }

    return res.status(StatusCodes.OK)
              .json(new apiResponse
  (StatusCodes.OK,"loggedIn Successful", {id:user._id,username:user.username,token:token}))
}

const updateUser = async(req,res)=>
{
   const {body:{username,email},user:{_id:userId}} = req
     if(!username || !email  || !userId)
     {
      throw new apiError(StatusCodes.BAD_REQUEST,"All feilds are required")
     }
    console.log(userId);
     const user = await User.findByIdAndUpdate(
      userId,
      {username,email},
      {new:true}
     )

     if(!user)
     {
       throw new apiError(StatusCodes.BAD_REQUEST,"user with this id doesnot exist")
     }

     return res.status(StatusCodes.OK)
    .json(new apiResponse(StatusCodes.OK,"user updated successfully",{username:user.username,email:user.email}))
    


}

const getAllUsers = async(req,res)=>
{
   const users = await User.find({});

   if(!users)
   {
    throw new apiError(StatusCodes.BAD_REQUEST,   "there is no user in the database")
   }
  
   return res.status(StatusCodes.OK)
     .json(new apiResponse(  StatusCodes.OK,"users fetched successfully",{id:users._id,name:users.username,email:users.email,totalusers:users.length}))
  
}


const deleteUser = async(req,res)=>
{
   const user = await User.findByIdAndDelete(req.user?._id)
   if(!user)
   {
    throw new apiError(StatusCodes.BAD_REQUEST,"user with this id doesnot exists")
   }
   return res.status(StatusCodes.OK)
   .json(new apiResponse(StatusCodes.OK,"User with relatedData deleted successfully",
    {username:user.username,email:user.email}))
}




module.exports = {registerUser,loginUser,updateUser,getAllUsers,deleteUser}