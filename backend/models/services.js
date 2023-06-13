// const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
        serviceID: {
            type: Number,
            trim: true,
            require: [true, 'please enter your id'],
            maxlength: 32
        },
        serviceType:{
            type: String,
            trim: true,
            require: [true, 'please enter your service'],
            maxlength: 32
        },
        servicePrice: {
            type: Number,
            require: [true, 'please enter price'],
            maxlength: 32,
            default: 0
        }
});


module.exports = mongoose.model('Service', serviceSchema)