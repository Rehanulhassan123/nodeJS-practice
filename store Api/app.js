const express = require("express")
const productRouter = require("./routes/productroute")
const ErrorHandler = require("./middlewares/ErrorHandler.js")
const connectDB  = require("./db/connectdb.js")
require("dotenv").config()

const app = express()


connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 3000,()=>{
        console.log(`app is listening on port ${process.env.PORT}`);
    })
})

/// adding middleware for routes 

app.use(express.json())

app.use("/api/v1/products",productRouter)

app.use(ErrorHandler)

