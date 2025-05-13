
const notFound = async(req,res,next)=>{
 return res.status(404)
        .send("route doesnot exist")
}

module.exports = notFound