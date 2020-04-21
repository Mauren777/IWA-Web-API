var express = require('express'),
    router = express.Router(),
    productsCtrl = require('./controllers/products-controller'); // Load Controller

// Default frontend URLs
router.get('/', function(req, res){
    res.render('index');
});

// Products API
router.post('/v1/products', productsCtrl.createProduct);
router.get('/v1/products', productsCtrl.getProducts);

module.exports = router;