const mongoose =require('mongoose');

const bookSchema = new mongoose.Schema({
    category:{
        type: String,
        require: [true, 'book category id required'],
    },
    author: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true,
    },
},
{
    timestamps: true
});
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;


