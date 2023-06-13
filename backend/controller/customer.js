// const Customer = require('../models/customer');

exports.Ccustomer = async (req, res)=>{
    const {email} = req.body;
    const userExist = await Customer.findOne({email});
    if(userExist){
        return res.status(400).json({
            success: false,
            message: "email already exist"
        })
    }
    try{
        const Ccustomer = await Customer.create(req.body);
        res.status(201).json({
            success: true,
            Ccustomer
        });
    }catch(error){
        console.log('error');
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.customerAll = async (req, res)=>{
    try{
        const customerAll = await Customer.find({});
        res.status(200).json(customerAll);
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}
 

exports.customerID = async (req, res)=>{
    try {
        const {id} = req.params;
        const customerID = await Customer.findById(id);
        res.status(200).json(customerID);
    } catch (error) {
        console.log('error')
        res.status(400).json({
            message: error.message
        })       
    }
}

exports.customerUp = async (req, res)=>{
    try {
        const {id} = req.params;
        const customerUp = await Customer.findByIdAndUpdate(id, req.body);
        if(!customerUp){
            return res.status(400).json({
                message: `can not find any customer with id ${id}`
            });
        }
        const update = await Customer.findById(id);
        res.status(200).json(update);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.customerDel = async(req, res)=>{
    try {
        const {id} = req.params;
        const customerDel = await Customer.findByIdAndDelete(id);
        if(!customerDel){
            return res.status(400).json({
                message: `can not find customer with deleted id ${id}`
            })
        }
        res.status(404).json(customerDel)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


