const router = require("express").Router();
const Product= require("../model/product.model")



// Create product /createproduct
router.post("/createProduct", async (req, res)=>{
    try{
        const product = req.body;

        const newProduct = await new Product(product);

        await newProduct.save()

        res.status(200).json({message:"Product Created Successfullty", newProduct})
    }
    catch(err){
        res.status(400).send("There is some error in creating the product")
    }
})

//get all products
// Fetch Product /product
router.get("/products", async (req, res)=>{
    try{
        const id = req.params.id;

        const product = await Product.find();

        if(!product){
            res.status(400).send("Product not found")
        }

        res.status(200).json({product})
    }
    catch(err){
        res.send("Error in fetching product")
    }
})




// Fetch Product /product
router.get("/product/:id", async (req, res)=>{
    try{
        const _id = req.params.id;

        const product = await Product.findById({_id});

        if(!product){
            res.status(400).send("Product not found")
        }

        res.status(200).json({product})
    }
    catch(err){
        res.send(err.message)
    }
})

// Update Product /updateProduct
router.put("/product/:id", async (req, res)=>{
    try{
        const _id = req.params.id;

        const product = await Product.findById({_id});

        if(!product){
            res.status(400).send("Product Not Found")
        }

        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id, req.body, { new:true }


        )

        res.status(200).json({message:"Product updated successfuly", updateProduct})
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

// Delete Product /deleteProduct

router.delete("/product/:id", async (req, res)=>{
    try{

        const _id= req.params.id;
        const product = await Product.findByIdAndDelete({_id});

        if(!product){
            res.status(400).send("Product Doesnt Exist")
        }

        res.status(200).json({message:"Product deleted successfully", product})
        
    }
    catch(err){
        res.send("Error")
    }
})

// Search /searchProduct
router.get("/search", async (req, res)=>{
    try{
        const name = req.query.name;

        const product = await Product.find({name});

        if(!product){
            res.status(400).send("Product not foun")
        }


        res.status(200).json({message:"Product found", product})
    }
    catch(err){
        res.send("Error")
    }
})



module.exports = router;