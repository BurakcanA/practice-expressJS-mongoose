const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['vegetable','fruit','dairy']
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'farm'
    }
    // Two way Relationship with farm Model
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product