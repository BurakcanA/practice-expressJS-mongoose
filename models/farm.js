const mongoose = require('mongoose')
const { Schema } = mongoose

const farmSchena = new Schema({
    name: {
        type: String,
        required: [true, 'Farm name is required']
    },
    city: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    // Two way Relationship with product Model
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Farm = mongoose.model('Farm', farmSchena)
module.exports = Farm
