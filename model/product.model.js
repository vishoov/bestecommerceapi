const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
// 	Name:string,
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:1000
    },
// description:string,
//seller?
    seller:{
        //connect the user data into this 
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false,
        default:null
    },
    costprice:{
        type:Number,
        required:true,
        min:0
    },
    saleprice:{
        type:Number,
        required:false,
        min:0
    },
// Costprice:number,
// saleprice:number,
    category:{
        type:String,
        required:false,
        trim:true
    },
    stock:{
        type:Number,
        default:0,
        required:true,
        min:0
    },
    image:{
        type:String,
        required:false,
        trim:true
    }

// Category:string,
// Stock:number,
// image:[String] -> cdn links front end 
// createdAt:date
}, { timestamps:true }
)


const Product = mongoose.model("Product", productSchema);


module.exports = Product;