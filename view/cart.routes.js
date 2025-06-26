// Add to cart
// Delete From Cart
// Fetch Cart

const Cart = require("../model/cart.model");


const router = require("express").Router();

// POST /cart/add
router.post('/cart/add', async (req, res) => {
  const { userId, productId, price, quantity = 1 } = req.body;
  
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


module.exports = router;