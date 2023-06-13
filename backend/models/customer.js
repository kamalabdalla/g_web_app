// const mongoose = require('mongoose');
// const { use } = require('../routes/customer');


const custSchema = new mongoose.Schema({
    customerID: {
        type: Number,
        trim: true,
        require: [true, 'please add a name'],
        maxlength: 32
    },
    customerName: {
        type: String,
        trim: true,
        required: [true, 'Please add a name'],
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please add a valid email']
    },
    phone: {
        type: String,
        trim: true,
        required: [true, 'Please add a name'],
        maxlength: 32
    },
    address: {
        type: String,
        trim: true,
        required: [true, 'Please add an Address'],
        maxlength: 32
    }
});
 

module.exports = mongoose.model('Customer', custSchema);
