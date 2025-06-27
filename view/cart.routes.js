// Add to cart
// Delete From Cart
// Fetch Cart

const Cart = require("../model/cart.model");


const router = require("express").Router();

// POST /cart/add
router.post('/cart/add', async (req, res) => {
  const { userId, productId, price, quantity = 1 } = req.body;
  
//whenever we add a product to cart
//1. if the cart already exists or it doesnt 
//2. if the cart exists and product also is there in the cart 

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart if none exists
      cart = new Cart({ 
        userId, 
        Products: [{ productId, price, quantity }],
        totalAmount: price * quantity
      });
    } else {
      // Check if product exists in cart
      const itemIndex = cart.Products.findIndex(item => 
        item.productId.equals(productId)
      );

      if (itemIndex > -1) {
        // Update existing item quantity
        cart.Products[itemIndex].quantity += quantity;
      } else {
        // Add new product
        cart.Products.push({ productId, price, quantity });
      }
      
      // Recalculate total
      cart.totalAmount = cart.Products.reduce(
        (sum, item) => sum + (item.price * item.quantity), 
        0
      );
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/deletefromcart/:userId/:productId", async (req, res)=>{
    try{
        const { userId, productId } = req.params;

        if(!userId || !productId){
            res.send("User ID or Product Id is missing")
        }

        const cart = await Cart.find({userId});

        if(!cart){
            res.send("The cart does not exist")
        }

        const product = cart.products.findIndex(p=> p.productId.toString() === productId.toString());


        if(p===-1){
            res.status(400).send("Product not found")
        }

        //splice 
        //[1, 2, 3]
        //starting index, to the index till which we want to remove the products

        //removed the product here
        cart.products.splice(p, 1);

        //update the amount
        cart.totalAmount -= cart.products[p].price*cart.products[p].quantity;

        const updatedCart = await cart.save();

        res.status(200).json({
            message:"The product is deleted",
            updatedCart
        })



    }
    catch(err){
        res.status(400).send(err.message)
    }
})


router.get("/fetchCart/:userId", async (req, res)=>{
    try{
        const userId = req.params.userId;

        const cart = await Cart.find({userId});

        if(!cart){
            res.send("Cart not found")
        }

        res.status(200).json({
            cart
        })
    }
    catch(err){
        res.send(err.message)
    }
})

module.exports = router;