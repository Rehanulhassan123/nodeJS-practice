const apiErrors = require("../utils/apiError.js")

const ErrorHandler = async(err,req,res,next)=>{
    console.log(err);
    if(err instanceof apiErrors)
    {
        return res.status(err.statusCode)
        .json({statusCode:err.statusCode,msg:err.message,success:err.success})
    }

 return res.status(500).json({ msg: err.message })

}

module.exports = ErrorHandler