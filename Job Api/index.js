
const express = require("express")
require("dotenv").config()
const connectDB = require("./db/connect.js")
const jobRouter = require("./routes/jobRoute.js")
const userRouter = require("./routes/userRoute.js")
const notFound = require("./middlewares/notfound.js")
const verifyJWT = require("./middlewares/verfyJWT.js")
const customError = require("./middlewares/customError.js")
// +++++++++++++++ creating an instance app ++++++++++++++++

const app = express()

// ++++++++++++++++ connecting to db and staring the server +++++++++++++

connectDB()
.then(()=>{

  app.listen(process.env.PORT || 3000,(error)=>{
    if(error)
    {
        console.log("Error occured while starting server",error);
        process.exit(1);
    }
  console.log("app is listening on port ",process.env.PORT);
    
    })
    app.on("error",()=>{
    console.log("error occured in app listening");
    process.exit(1)
    })
})
.catch((error)=>{
    console.log("DB connection error occured ",error);
     process.exit(1)
})

app.use(express.json())

app.use("/api/v1/user",userRouter)
app.use("/api/v1/job",verifyJWT,jobRouter)



app.use("*",notFound);
app.use(customError)




