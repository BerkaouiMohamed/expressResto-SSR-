const express=require('express')
require('dotenv').config()
const {join}=require('path')
const mongoose=require('mongoose')
const plateModel = require('./models/plateModel')



const app=express()
app.set("view engine","ejs")

//connect to db
mongoose.connect(process.env.DB_URI,{dbName:"resto"})



app.get('/',async(req,res)=>{ 

    const salad= await plateModel.find({category:"Salad"}).limit(3)
    const pizza= await plateModel.find({category:"Pizza"}).limit(3)
    const pasta= await plateModel.find({category:"Pasta"}).limit(3)

    res.render('home',{salad,pizza,pasta}) 
}) 


app.get('/plates',async function(req,res){
    var queries={plate:req.query.plate||"" ,category:req.query.category||""}
    const plates= await plateModel.find({title: {$regex:queries.plate,$options: 'i'},category: {$regex:queries.category,$options: 'i'}})
    res.render('products',{plates})

})
app.get('/plates/:id',async function(req,res){

    const plate= await plateModel.findById(req.params.id)
    res.render('plate',{plate})

})
app.get('/cart',express.urlencoded({extended:true}),async function(req,res){


    const plates= await plateModel.find()
    res.render('cart',{plates})

})


app.listen(process.env.PORT,()=>console.log(`server running on port ${process.env.PORT}`)) 