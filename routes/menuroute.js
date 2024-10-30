const express =require('express')
const router=express.Router()
const menu=require('../models/menuitems')
router.post('/menu',async (req,res) => {try {
    const data=req.body
    const item1=new menu(data)
    await item1.save()
    res.status(200).json("the item has been added in menu list")

} catch (error) {
    console.log("problem in creating the item in menu",error)
    
}
    
})
router.get('/menu',async (req,res) => {try {
    const menuitems=await menu.find()
    res.send(menuitems)
} catch (error) {
    console.log("the error occured while fetching the menu items from db")
}
    
})

router.get('/menu/:name',async (req,res) => {try {
    const name=req.params.name
    const required=await menu.find({name:name}) //find returns all 
    if (required.length === 0) {
        // If no data is found, send a 404 Not Found response
        return res.status(404).send({ message: "No data found for the provided name" });
      }
    res.send(required)
    console.log("the data has been fetched successfully")
} catch (error) {
    console.log("not find",error)
}
    
})
module.exports=router