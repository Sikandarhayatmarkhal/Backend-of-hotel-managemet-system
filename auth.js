const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const person=require('./models/person')
const { compare } = require('bcrypt')

passport.use(new LocalStrategy(async (username,password,done) => { try {
    // console.log("received credientials: ",username,password)

    const user=await person.findOne({username:username})
    
    if (!user){
        console.log("incorrect username")
        return done(null,false,{message:"incorrect username"})
      
    }
    const ispasswordmatch= await user.comparepassword(password)
    console.log(ispasswordmatch)
    if (!ispasswordmatch){
        console.log("data has been send")

        return done(null,user)
        
        console.log(user)
    }else{
        console.log("password  not matched")
        return done(null,false,{message:"password did not match"})
    }
} catch (error) {
    return done(error)
    
}}))

module.exports=passport