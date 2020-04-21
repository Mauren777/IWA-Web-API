var express = require('express'),
    router = express.Router(),
    productsCtrl = require('./contollers/products-controller'); // Load Controller

// Default get request
router.get('/', function(req, res){
    return res.send('Hello World');
});

router.post('/v1/products', productsCtrl.createProduct);

router.get('/v1/products', productsCtrl.getProducts);

module.exports = router;