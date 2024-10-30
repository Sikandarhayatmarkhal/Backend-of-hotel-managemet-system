const express=require("express")
const app=express()
const db=require('./db');
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next()
}
app.use(logRequest)
const passport=require('./auth')
const localauthmiddleware=passport.authenticate('local',{session:false})
app.use(passport.initialize())

const bodyparser=require("body-parser")
app.use(bodyparser.json())
const personroute=require('./routes/personroutes')
const menuroute=require('./routes/menuroute');
const { jwtmiddleauth } = require("./jwt");

app.use('/person',personroute)

app.listen(3000,function(){
    console.log("the port is listening at 3000")
    
})
app.use('/',menuroute)
app.get('/',async (req,res) => {
res.send("the hotel website is working ")    
})

