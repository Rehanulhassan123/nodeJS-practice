
const express = require("express")
require("dotenv").config()
const taskRouter = require('./routes/taskroute.js')





const app = express()
app.use(express.json())
app.use(express.static("./public"))

const {connectDB} = require("./db/database.js")
 connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{console.log(`app is listening on port ${process.env.PORT} `);})
    app.on("error",(err)=>{console.log("something went wrong in app listening",err);})
})
.catch(()=>{console.log("something went wrong in db connection ");})

/// adding a middleware for task rouutes 



app.use("/api/v1/tasks",taskRouter)
