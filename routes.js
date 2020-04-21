var express = require('express'),
    router = express.Router(),
    productsCtrl = require('./products-controller'); // Load Controller

// Default get request
router.get('/', function(req, res){
    return res.send('Hello World');
});

router.get('/v1/products', productsCtrl.getProducts);

module.exports = router;