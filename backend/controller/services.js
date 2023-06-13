// const Service = require('../models/services');

// exports.services = async (req, res, next)=> {
//     const {serviceType} = req.body;
//     const serviceExist = await Service.findOne({serviceType});
//     if(serviceExist){
//         return res.status(400).json({
//             success: false,
//             message: 'Already exist'
//         })
//     }
//     try {
//         const service = await Service.create(req.body);
//         res.status(201).json({
//             success: true,
//             service
//         })
//     } catch(error){
//         console.log('error')
//         res.status(400).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

exports.services = async (req, res)=>{
    try {
        const services = await Service.find({});
        res.status(200).json(services);
    } catch (error) {
        console.log('error')
        res.status(400).json({
            message: error.message
        })
    }
}

// exports.services = async (req, res)=>{
//     try {
//         const {id} = req.params;
//         const service = await Service.findById(id);
//         res.status(200).json(service);
//     } catch (error) {
//         console.log('error');
//         res.status(400).json({
//             message: error.message
//         })
//     }
// }