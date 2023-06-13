const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// verify pssd
userSchema.methods.isPasswordMatch = async function (enterdPassword){
    return await bcrypt.compare(enterdPassword, this.password);
}

const Users = mongoose.model('Users', userSchema);
module.exports = Users;