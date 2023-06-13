const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const authMiddleWare = require('../middlewares/authMiddleware');

const bookRouter = express.Router();

bookRouter.post('/', expressAsyncHandler(async(req, res)=>{
    const book = await Book.create(req.body);
    if(book){
        res.status(200);
        res.json(book);
    }else{
        res.status(500);
        throw new Error('book created failed')
    }
}))


bookRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const book = await Book.find({});
    if(book){
        res.status(200);
        res.json(book);
    }else{
        res.status(500);
        throw new Error('there are no book')
    }
}))

bookRouter.put('/:id', authMiddleWare, expressAsyncHandler(async (req, res)=>{
    // res.send(req.params.id);
    const book = await Book.findById(req.params.id);
    if(book){
        const updateBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        res.status(200);
        res.json(updateBook);
    }else{
        res.status(500);
        throw new Error('Update fail')
    }
}))

bookRouter.delete('/:id', expressAsyncHandler(async(req, res)=>{
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send(book);
    } catch (error) {
        res.json(error)
    }
}))
module.exports = bookRouter;