const express = require("express");
const app = express();
const userRoutes = require("./view/user.routes");
const mongoose = require("mongoose")
const cartRoutes = require("./view/cart.routes")
const dotenv = require("dotenv")
const productRoutes = require("./view/product.routes")
const OrderRoutes = require("./view/order.routes");
dotenv.config();


const mongouri = process.env.MONGO


mongoose.connect(mongouri)
.then(()=>{
    console.log("Database connection established")
})
.catch((err)=>{
    console.log(err.message)
})




app.use(express.json())


const loggermiddleware = (req, res, next) =>{
    try{
        const time = new Date().toLocaleString();
        const method = req.method;
        const route = req.url;
        // console.log(req)
        console.log(`Request recieved at ${route}, with method ${method}, at ${time}`)
        next();
    }
    catch(err){
        res.status(400).send("There is some error");
    }
}
app.use(loggermiddleware)

app.use("/api/v1/", userRoutes)
app.use("/api/v1/", productRoutes)
app.use("/api/v1/", cartRoutes)
app.use("/api/v1/", OrderRoutes)

app.get("/", (req, res)=>{
    try{
        res.sendFile(__dirname + "/index.html")
    }
    catch(err){
        res.status(400).send("Facing some errors :(")
    }
})

const PORT = 3000
app.listen(PORT, ()=>{
    try{
        console.log(`The server is running on port ${PORT}`)
    }
    catch(err){
        console.log(err.message)
    }
})