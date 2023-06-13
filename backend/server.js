//  const http = require('http')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const dbconnect = require('./config/dbConnect');
dbconnect();
// const Users = require('./models/Users');
const userRout = require('./routes/userRoute');
const handleError = require('./middlewares/handleError');
const bookRouter = require('./routes/bookRoutes');

app.use(express.json());
app.use(handleError.handleError); 

const PORT = process.env.PORT || 5000
// const server = http.createServer(app);

app.use('/api/user', userRout)
app.use('/api/books', bookRouter)

app.listen(PORT, ()=>{
    console.log(`server is run on ${PORT}`)
});
 