// const Product = require('../models/product');

exports.product = async (req, res, next)=>{
    const {price} = req.body;
    const productExist = await Product.findOne({price});
    if(productExist){
        return res.status(400).json({
            success: false,
            message: "product already exist"
        })
    }
    try{
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        });
    }catch(error){
        console.log('error');
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.product = async (req, res)=>{
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }catch(error){
        console.log('error');
        res.status(400).json({
            message: error.message
        })
    }
}
