
const mongoose=require("mongoose")
const mongourl='mongodb://localhost:27017/hotel'
mongoose.connect(mongourl,{ useNewUrlParser: true,useUnifiedTopology:true})
const db=mongoose.connection
db.on('connected',()=>{
    console.log("db is connected")

})
db.on('disconnected',()=>{
    console.log("the db connection is lost")
})
db.on('error',(err)=>{
    console.error("the db has some error ",err)
})
module.exports=db;