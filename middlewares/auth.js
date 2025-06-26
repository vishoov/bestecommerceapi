//api authentication


//once you login or signup there is a token generated -> access different protected routes 

const jwt = require("jsonwebtoken");


const generateToken = (user)=>{
    try{
        const token = jwt.sign(
            //payload
            {
                email: user.email
            },
            //secret key
            process.env.JWT_SECRET,
            {
                expiresIn:10*1000*60*60*60*24   //10 days
            }

            //options 
        )


        return token;
    }
    catch(err){
        console.log("error in generating token")
    }
}

//this is the middleware that we extract the token from the request header
//and then will verify it using jwt

const authenticate = (req, res, next) =>{
    try{
        // const token = req.headers.authorization.replace("Bearer ", "");
        const token = req.headers.authorization.split(" ")[1];

        if(!token){
            res.status(400).json({message:"Please authenticate yourself"})
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            res.status(400).json({message:"The token could not be verified"})
        }

        next();
    }   
    catch(err){
        res.send(err.message)
    }
} 



module.exports = {
    generateToken,
    authenticate
}