const mongoose=require("mongoose")
const { type } = require("os")
const menuschema= new mongoose.Schema({
    name:{type:String,
    required:true},
    price:{type:String,required:true},
    rating:{type:String}
})
const menu=mongoose.model('menu',menuschema)
module.exports=menu;