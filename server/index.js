const express = require("express");
const cors =require('cors')
const {connect}=require('mongoose')
require('dotenv').config()
const upload=require('express-fileupload')
const{notFound,errorHandler}=require("./middleware/errorMiddleware")
const Routes=require("./routes/Routes")


const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(upload())


app.use("/api",Routes)

app.use(notFound)
app.use(errorHandler)




connect(process.env.MONGO_URI).then(app.listen(process.env.PORT||5000,"0.0.0.0",()=>{
    console.log(`server running on http://localhost:${process.env.PORT||5000}`)
})).catch(error=>{
    console.log(error)
})
