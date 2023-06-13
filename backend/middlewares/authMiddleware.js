const asyncHandler = require('express-async-handler');
const Users = require('../models/Users');
const jwt = require('jsonwebtoken')

const authMiddleWare = asyncHandler (async (req, res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.
        startsWith('Mern')){
            try {
                token = req.headers.authorization.split(' ')[1];
                const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
                const user = await Users.findById(decode.id);
                req.body = user;
                next();
            } catch (error) {
                res.status(401);
                throw new Error('Not authorised, Invalid TOken')
            }
        }
})
module.exports = authMiddleWare;