// const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'enter your name'],
        trim: true,
        maxlength: 32
    },
    quantity: {
        type: Number,
        required: [true, 'please enter quntity'],
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'please enter price'],
    },
    image: {
        type: String,
        required: [true, 'please enter image']
    }
},
 {
    timestamps: true
 } 
)

module.exports = mongoose.model('Product', productSchema);
 
