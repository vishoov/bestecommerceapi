const mongoose = require("mongoose");

// Id:string,
// userID:string,
// Items:[{
// 	productID:string,
// 	Quantity:number,
// 	Price:number
// }]
// 	totalAmount:Number,
// 	shippingAddress:String,
// 	Status:string,



const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  Products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, "Quantity must be at least 1"]
    }
  }],
  totalAmount: {
    type: Number,
    default: 0,
    required: true
  },
  shippingAdress:{
    type:String,
    required:true,
    trim:true
  },
  status:{
    type:String,
    default:"Pending",
    enum:["Pending", "Shipped", "Out for Delivery", 'Delivered']

  }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;