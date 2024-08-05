const {Schema,model}=require('mongoose')



const platesSchema=new Schema({
title:{type:String,required:[true,"title is required"]},
price:{type:Number,required:true},
ingredients:String,
image:String,
category:{type:String,required:true,enum:{values:["Pasta,Pizza,Salad"],message:"you should shoose between Pasta,Pizza,Salad  "}}
})
const plateModel=new model('plate',platesSchema)

module.exports=plateModel