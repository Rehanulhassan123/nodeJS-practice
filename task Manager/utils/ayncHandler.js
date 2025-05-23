


const asyncHandler = (requestHandler) =>{
    return (req,res,next)=>{
     Promise.resolve(requestHandler(req,res,next))
     .catch((error)=>{
        console.log("i am throwing error");
        next(error)})
 
    }
}

module.exports = asyncHandler