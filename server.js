const express=require('express')
require('dotenv').config()
const mongoose=require('mongoose')
const asyncHandler = require('./utils/async')
const { homePlates, getAllPlates, getSingelPlate, getCart, createOrder } = require('./contorllers/cotrollers')



const app=express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
//connect to db
mongoose.connect(process.env.DB_URI,{dbName:"resto"})


app.get('/',asyncHandler(homePlates)) 

app.get('/plates',asyncHandler(getAllPlates))
app.get('/plates/:id',asyncHandler(getSingelPlate))

app.get('/cart',asyncHandler(getCart)) 

app.post('/order',asyncHandler(createOrder))


app.all('*',(req,res)=>{
    res.send('404')
})

app.use((error,req,res,next)=>{
    console.log(error.message)
    res.render("error",{error:error.message})
})
app.listen(process.env.PORT,()=>console.log(`server running on port ${process.env.PORT}`))  