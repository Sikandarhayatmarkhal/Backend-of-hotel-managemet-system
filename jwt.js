const jwt = require('jsonwebtoken')
require('dotenv').config();
// Use environment variables for better security (recommended)
const JWT_SECRET = process.env.JWT_SECRET || '12345';
console.log(JWT_SECRET)

const jwtmiddleauth=(req,res,next)=>{

    const authorization=req.headers.authorization
    // console.log(authorization)
    if (!authorization) return res.send("token not found")
    const token = authorization.split(" ")[1];
    // console.log(token)
    if (!token){
        res.send("unauthorized no token found")
        console.log(token)
    }
    try {
        const decoded=jwt.verify(token,JWT_SECRET)
        // console.log(decoded)
        req.body=decoded
        console.log("the token is verified and data has been send")

        
        next()
    } catch (error) {
        res.send("invalid token")
        // console.log(token)
        console.log("some error occured",error)
        
    }

}
const generatetoken=(userdata)=>{
    return jwt.sign(userdata,JWT_SECRET,{expiresIn:3000})
}
console.log(generatetoken)
module.exports={jwtmiddleauth,generatetoken}