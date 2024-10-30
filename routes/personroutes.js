const express =require('express')
const router=express.Router()
const person=require('../models/person')
const {jwtmiddleauth,generatetoken}=require('../jwt');
const { json } = require('body-parser');
require('dotenv').config();

router.post('/signup',async (req,res) => {try {
    const data=req.body
    const newperson=new person(data)
    
    const response =await newperson.save()

    const payload=
    {id:response.id,
    username:response.username}
    console.log(JSON.stringify(payload))

    const token=generatetoken(payload)
    console.log(token)

    console.log("data has been added successfully")
    // res.send("the person data has been saved")}
    res.status(200).json({response:response,token:token})
}
    
    catch (error) {console.log("error occured while saving newperson",error)
        res.send("either the duplicate email or some validation failed")
    }
})


router.get('/',jwtmiddleauth,async (req,res) => {try {
    const data=await person.find()
    res.send(data)
} catch (error) {
    console.log("error occured while fetching the data")
}
})


router.get('/profile',jwtmiddleauth,async (req,res) => {
    try {
        
        const userdata = req.body
        // console.log("the user data is "+userdata)
        const userid = userdata.id
        // console.log(userid)

        const user=await person.findById(userid)
        
        res.status(200).json({user})
        
    } catch (error) {
        console.log("the error occured while finding the user from database")
        res.status(500).json("internal server error")
        
    }
    
})


router.get('/:worktype',jwtmiddleauth,async (req,res) => {try {
    const worktype=req.params.worktype
    const required=await person.find({work:worktype}) //from all it returns only one
    if (required.length === 0) {
        // If no data is found, send a 404 Not Found response
        return res.status(404).send({ message: "No data found for the provided name" });
      }
    res.send(required)
} catch (error) {
    console.log("the no data found while fetching")
    res.status(404).json("no data available in database")
}
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await person.findOne({ username: username });
        
        if (!user || !(await user.comparepassword(password))) {
            // If user is not found or password is incorrect
            return res.json("Either the user does not exist or the password is incorrect");
        } else {
            // If credentials are valid, generate the token
            const payload = { id: user.id, username: user.username };
            const token = generatetoken(payload);
            
            console.log("The data has been sent successfully");
            return res.json({ token }); // Send the token in JSON format
        }

    } catch (error) {
        console.log(error);
        res.status(500).json("Server side error");
    }
});




router.put('/:id',async (req,res) => {try {
    const person_id=req.params.id
    const updatedata=req.body
    const response=await person.findByIdAndUpdate(person_id,updatedata,{new:true,runValidators:true})
    res.send(response)
    if (!response){
        console.log("the updation cant be done ")
    }
} catch (error) {
    console.log("the id you providing is not matching in our database") //can log the error which says the same as written 
    res.status(404).json("no such id found")
}
    
})

router.delete('/:id',async (req,res) => {try {
    const person_id=req.params.id
    const deleteperson =await person.findByIdAndDelete(person_id)
    res.send("the required data has been removed from database")
    console.log("deleted")
} catch (error) {
    console.log("no such record find or the id is not correct")
    res.send("no such id exist in our database or already deleted by you")
}
    
})

module.exports=router
