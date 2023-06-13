// const mongoose = require('mongoose');
// const { use } = require('../routes/user');
// const bcrypt = require('bcryptjs');
// const wjt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
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
    password: {
        type: String,
        trim: true,
        required: [true, 'Please add an passord'],
        minlength: [6, 'password must atleast 8 cheracters'],
        match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 
        'pasword contain upercase lowercase and number']
    },
    role: {
        type: Number,
        default: 0,
    }
},{timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function(yourPassword){
    return await bcrypt.compare(yourPassword, this.password);
}

userSchema.methods.jwtGenerateToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: 3600
    })
}

module.exports = mongoose.model('User', userSchema);


// Minimum eight characters, at least one letter and one number:
// "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"