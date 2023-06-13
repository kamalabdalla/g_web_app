const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        trim: true,
        require: [true, "please enter id"],
        maxlength: 32
    },
    customerID: {
        type: String,
        trim: true,
        require: [true, 'please enter your id'],
        maxlength: 32
    },
    staffID: {
        type: String,
        trim: true,
        require: [true, 'please enter your id'],
        maxlength: 32
    },
    serviceID: {
        type: String,
        trim: true,
        require: [true, 'please enter your services id'],
        maxlength: 32
    },
    orderDate: {
        type: Date,
        trim: true,
        require: [true, 'please enter your order date'],
        maxlength: 32
    },
    totalOrdr: {
        type: Number,
        trim: true,
        require: [true, 'please enter your id'],
        maxlength: 32
    }

})