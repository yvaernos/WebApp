const express = require('express')
const router = express.Router()
const Product = require('../models/product')

//Render
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message:'GET requests' 
    })    
})

//Getting all
router.get('/', async(req, res)=>{
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
    
})

//Getting one
router.get('/:id',  getProduct, (req, res)=>{
    res.json(res.product)
})

//Creating One
router.post('/', async(req, res)=>{
    const product = new Product({
        sku: req.body.sku,
        productName: req.body.productName,
        modelNumber: req.body.modelNumber,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        brand: req.body.brand,
        inventoryCount: req.body.inventoryCount,
        dimensions: req.body.dimensions,
        weight: req.body.weight
    })
    try{
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    }catch(err){
        res.status(400).json({ message: err.message})
    }
})

//Updating One
router.patch('/:id', getProduct, async (req, res)=>{
    if(req.body.sku != null){
        res.product.sku = req.body.sku
    }
    if(req.body.productName != null){
        res.product.productName = req.body.productName
    }
    if(req.body.modelNumber != null){
        res.product.modelNumber = req.body.modelNumber
    }
    if(req.body.price != null){
        res.product.price = req.body.price
    }
    if(req.body.description != null){
        res.product.description = req.body.description
    }
    if(req.body.category != null){
        res.product.category = req.body.category
    }
    if(req.body.brand != null){
        res.product.brand = req.body.brand
    }
    if(req.body.inventoryCount != null){
        res.product.inventoryCount = req.body.inventoryCount
    }
    if(req.body.dimensions != null){
        res.product.dimensions = req.body.dimensions
    }
    if(req.body.weight != null){
        res.product.weight = req.body.weight
    }
    try {
        const updtatedProduct = await res.product.save()
        res.json(updtatedProduct)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Deleting One
router.delete('/:id', getProduct, async (req, res)=>{
    try {
        await res.product.remove()
        res.json({ message: 'Product Deleted'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

async function getProduct(req, res, next){
    let product
    try {
        product =  await Product.findById(req.params.id)
        if(product==null ){
            return res.status(404).json({message: 'Cannot find product'})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message})
    }

    res.product = product
    next()

}

module.exports = router