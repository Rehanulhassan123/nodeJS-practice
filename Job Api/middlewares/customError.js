
const {StatusCodes} = require("http-status-codes")

const customError = async(error,req,res,next)=>{

 const ErrorObject = {
  statusCode:error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
         message: error.message || "something went wrong"
    }
    /// hadling mongoose duplication error 
    if(error.code && error.code === 11000)
    {
     ErrorObject.message = `Duplicate values entered for  ${Object.keys(error.keyValue)} `
     ErrorObject.statusCode = StatusCodes.BAD_REQUEST
    }

    /// handling cast error from mongoose 

    if(error.name&& error.name === "CastError")
    {
        ErrorObject.message = `No item found with ${error.value} `
        ErrorObject.statusCode = StatusCodes.BAD_REQUEST
    }

 return res.status(ErrorObject.statusCode)
     .json(ErrorObject)
}


module.exports = customError