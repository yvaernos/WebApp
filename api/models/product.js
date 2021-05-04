const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({ 
    sku:{
        type: Number,
        required: true,
        unique: true
    },
    productName:{
        type: String,
        required: true
    },
    modelNumber:{
        type: Number,
        required: false,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: false
    },
    brand:{
        type: String,
        required: false
    },
    inventoryCount:{
        type: Number,
        required: false
    },
    dimensions:{
        type: String,
        required: false
    },
    weight:{
        type: Number,
        required: false
    }
})

module.exports = mongoose.model('Product', productSchema )