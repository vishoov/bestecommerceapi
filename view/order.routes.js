const router = require("express").Router();
const Order = require("../model/order.model");
const Product = require("../model/product.model");

// Place Order
router.post("/placeOrder", async (req, res)=>{
    try{
        const orderData = req.body;
        
        await Order.create(orderData);

        res.status(200).json({message: "Order placed successfully", orderData});

        
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

// Cancel Order
router.delete("/cancelOrder/:orderId", async (req, res)=>{
    try{
        const orderId = req.params.orderId;

        const deletedOrder = await Order.findByIdAndDelete(orderId);

        res.status(200).json({
            message: "Order cancelled successfully",
            deletedOrder
        })
    }
    catch(err){
        res.status(400).send("Error in cancelling order")
    }
})

// Track
//order schema -> status
router.get("/trackOrder/:orderId", async (req, res)=>{
    try{
        const orderId = req.params.orderId;

        const order = await Order.findById(orderId);

        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        
        const productName= await Product.findById(order.Products[0].productId).then(product => product.name);
        const trackingInfo = {
            status: order.status,
            products: order.Products.map(product => ({
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
                productName: productName 
            })),
            totalAmount: order.totalAmount,
        };

        res.status(200).json({
            message: "Order tracking information",
            trackingInfo
        });
  }
    catch(err){
        res.status(400).send(err.message)
    }
})


// Update Order Status
router.put("/updateOrder/:orderId", async (req, res)=>{
    try{
        const orderId = req.params.orderId;

        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                status:status
            },
            {
                new: true,
                runValidators: true
                //this will run the validators on the updated data
            }
        )

        if(!updatedOrder){
            return res.status(404).json({message: "Order not found"});
        }

        res.status(200).json({
            message: "Order status updated successfully",
            updatedOrder
        })
    }
    catch(err){
        res.status(400).send("Error in updating order status")
    }
})



module.exports = router;