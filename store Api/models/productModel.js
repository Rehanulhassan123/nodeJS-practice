
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"product name is required"]

        },
        price:{
            type:Number,
            required:[true,"product price is required"]
        },
        featured:{
            type:Boolean,
            default:false
        },
        rating:{
            type:Number,
            default:4.5
        },
        company:{
            type:String,
            enum:["ikea","liddy","marcos","caressa"]
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }
    }
)

module.exports = mongoose.model("product",productSchema)