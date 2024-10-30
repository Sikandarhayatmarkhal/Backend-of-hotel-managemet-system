const mongoose=require("mongoose")
const { type } = require("os")
const bcrypt=require('bcrypt')
const personschema =new mongoose.Schema({name:{type:String,required:true},
    age:{type:Number},
work:{type:String,required:true,enum:["chef","manager"]},
email:{type:String,required:true,unique:true},
username:{type:String,required:true,unique:true},
password:{required:true,type:String}
})
personschema.pre("save",async function(next) {
   const person=this
    if (!person.isModified('password')) return next()
        try {
            const salt=await bcrypt.genSalt(10)
            const hashpassword=await bcrypt.hash(person.password,salt)
            person.password=hashpassword
            // console.log(hashpassword)
            return next()

        } catch (error) {
            return next(error)
            
        }
})
personschema.methods.comparepassword=async function (candidatepassword) {try {
    const ismatch=await bcrypt.compare(candidatepassword,this.password)
    // console.log(candidatepassword)
    // console.log(ismatch)
    // console.log(this.password)
    // console.log(ismatch)
    return ismatch;
} catch (error) {
    throw error
}
    
}
const person=mongoose.model('person',personschema)
module.exports=person;