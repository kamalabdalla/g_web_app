// const User = require('../models/user');

exports.signup = async (req, res, next)=>{
    const {email} = req.body;
    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({
            success: false,
            message: "email already exist"
        })
    }
    try{
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
    }catch(error){
        console.log('error');
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.signin = async (req, res, next)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "email and passwird is required"
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "invelid credential"
            })
        }
        const isMatched = await user.comparePassword(password);
        if(!isMatched){
            return res.status(400).json({
                success: false,
                message: "invelid credential"
            })
        }
        const token = await user.jwtGenerateToken();
     
        generateToken(user, 200, res);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "check your credential"
        })
    }
}

const generateToken = async (user, statusCode, res)=>{
    const token = await user.jwtGenerateToken();
    const options = {
        httpOnly: true,
        expires: new Date(Date.now() = process.env.EXPIRE_TOKEN)
    };
    res.status(statusCode).cookie('token', token, options)
    .json({success: true, token})
}

exports.logout = (req, res, next)=>{
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'logged out'
    })
}

exports.signup = async (req, res)=>{
    try{
        const signup = await User.find({});
        res.status(200).json(signup);
    }catch(error){
        console.log('error');
        res.status(400).json({
            message: error.message
        })
    }
}

 