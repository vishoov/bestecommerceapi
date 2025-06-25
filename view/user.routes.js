const express= require("express")
const router = express().router;
const User = require("../model/user.model")



router.post("/signup", async (req, res)=>{
    try{
        const user = req.body;

        //data base function to add user
        const newuser = await User.create(user);
        
        res.json({message:`user created with details`, newuser})
    }
    catch(err){
        res.status(400).send("Error in signing up")
    }
})

router.post("/login", async (req, res)=>{
    try{
        const {email, password}= req.body;

        //database logic
        const user = await User.findOne({email:email});


        if(!user){
            res.status(400).send("User not found")
        }

        const passwordcorrect = await user.comparePassword(password);

        if(!passwordcorrect){
            res.status(400).send("User password incorrect")
        }

        res.json({message:"User logged in", user})
    }
    catch(err){
        res.send("Error")
    }
})



router.get("/logout", (req, res)=>{
    try{
        res.send("User Logged Out")
    }
    catch(err){
        res.send("Error")
    }
})


router.put("/changepassword", async (req, res)=>{
    try{
        const {email, password, newpassword} = req.body;

    const user = await User.findOne({email:email})


        if(!user){
            res.send("User not found")
        }

        if(!await user.comparePassword(password)){
            res.send("Password incorrect")
        }




    res.send({message:"password changed"})


    }
    catch(err){
        res.send("error")
    }
})


router.get("/profile/:email", async (req, res)=>{
    try{
        const email = req.params.email;

        const user = await User.findOne({email:email})

        res.send({user})
    }
    catch(err){
        res.send("error")
    }
})


module.exports= router;
