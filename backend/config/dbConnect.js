const mongoose = require('mongoose');

const dbconnect = () =>{
    mongoose.connect(process.env.DATABASE).
    then(()=>console.log('db connected')).catch(err =>console.log(err));
}

module.exports = dbconnect;