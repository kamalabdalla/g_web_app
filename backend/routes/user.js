// const express = require('express')
// const router = express.Router();
// const {signup, signin, logout} = require('../controller/user');
// const {Ccustomer, customerAll, customerID, customerUp, customerDel} = require('../controller/customer');
// const {services} = require('../controller/services');
// const {product} = require('../controller/product');


router.post('/signup', signup);
router.get('/signup', signup);
router.post('/signin', signin);
router.get('/logout', logout);

router.post('/Ccustomer', Ccustomer);
router.get('/customerAll', customerAll);
router.get('/customerID/:id', customerID);
router.put('/customerUp/:id', customerUp);
router.delete('/customerDel/:id', customerDel)


router.post('/services', services);
router.get('/services', services);
router.get('/services/:id', services);

router.post('/product', product);
router.get('/product', product);


// module.exports = router;