

const express = require('express');
const morgan = require('morgan');
const app = express()

app.use(morgan('dev'))



app.use("/api",(req,res,next)=>{
    console.log(
        req.method,
        req.url,
        new Date().getFullYear()
    );
    next()
})
app.use("/api",(req,res,next)=>{
    console.log("i am new");
    
    next()
})





app.get("/",(req,res)=>{
    res.send("hello i am here")
})

app.get("/api/home",(req,res)=>{
    res.send("hello from about")
})

app.listen(5000,()=>{
    console.log("app is listening at port 5000");
});





