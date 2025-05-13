
const CustomAPIError = require("../errors/custom-error.js")
require('express-async-errors')

const jwt = require("jsonwebtoken")

const login = async(req,res)=>{

const {username, password} = req.body
 
if(!username || !password)
{
    throw new CustomAPIError("username or password is missing",401);
}
const id = new Date().getMilliseconds()

try{
    const token = jwt.sign(
       {id,username},
       process.env.JWT_SECRET,
       {expiresIn:'30d'}
    )
    return res.status(200)
              .json({msg:"user created successfully",token})
       
   } catch (error) {
       throw error
   }
 


}
const dashboard = async(req,res)=>{

    const authHeader = req.headers.authorization
     console.log("hello world");
     console.log(authHeader);
    if(!authHeader || !authHeader.startsWith("Bearer"))
    {
        throw new CustomAPIError("not token provided",401)
    }
    console.log("hello world");
   const token = authHeader.split(" ")[1]
    try {
      
        const decoded =  jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);
        const {id,username} = decoded

        req.user = {id,username}
        
    } catch (error) {
        throw new CustomAPIError("not authirized",401)
    }

    const randomno = Math.floor(Math.random()*100)

    return res.status(200)
            .json({msg:`hello ${req.user.username} your luckey number is ${randomno}`})


}

module.exports = {
    login,dashboard
}