
const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
    {
    company:{
        type:String,
        required:[true,"Company is required"],
        maxLength:50
    },
    position:{
        type:String,
        required:[true,"job position is required"],
        maxLength:70
    },
    status:{
        type:String,
        enum:["interview","Pending","Declined"],
        default:"pending"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:[true,"please provide User who created job"]
    }
    },
    {timestamps:true}
)

module.exports = mongoose.model("job",jobSchema)