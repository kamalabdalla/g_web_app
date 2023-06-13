const express = require('express');
const Users = require('../models/Users');
const userRout = express.Router();
const asyncHandler = require('express-async-handler');
const generateToken = require('../utill/generateToken');
const authMiddleWare = require('../middlewares/authMiddleware');


// userRout.post('/register', async(req, res)=>{
    //  res.send('register route') 
//     try {
//         const {name, email, password} = req.body;
//         const user = await Users.create({
//             name, email, password
//         });
//         console.log(user);
//         res.send(user);
//     } catch(err) {
//         console.log(err)
//     }
// });

userRout.post('/register', asyncHandler(async (req, res) =>{
    const {name, email, password} = req.body;
    const userExist = await Users.findOne({email: email});
    if(userExist){
        throw new Error('User exist');
    }
    const userCreated = await Users.create({name, email, password});
    res.json({
        _id: userCreated._id,
        name: userCreated.name,
        email: userCreated.password,
        password: userCreated.password,
        token: generateToken(userCreated._id),
    });
    res.send(userCreated);
}))

userRout.post('/login', asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    const user = await Users.findOne({email});
    if (user && (await user.isPasswordMatch(password))) {
        // res.send(user);
        res.status(200);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.password,
            password: user.password,
            token: generateToken(user._id),
        });
    }else{
        res.status(401);
        throw new Error('invalid credetial')
    }
}))

// userRout.post('/login', asyncHandler(async (req, res) =>{
//     const {email, password} = req.body;
//     const user = await Users.findOne({email});
//     if(user){
//         res.status(200);
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.password,
//             password: user.password,
//             // token: generateToken(user._id),
//         });
//     }else{
//         res.status(401);
//         throw new Error('Invalid Credencial')
//     }
// }))

userRout.put('/update', authMiddleWare, asyncHandler(async (req, res, next) =>{
    // res.send('uppdated')
    
    const user = await Users.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password || user.password;
        }
    }
    const updateUser =await user.save();
    res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        token: generateToken(updateUser._id),
    })
}))

userRout.get('/:id', (req, res)=>{
    res.send('by user id')
})
userRout.get('/', authMiddleWare, (req, res)=>{
    // console.log(req.headers)
    res.send(req.Users)
})

module.exports = userRout;