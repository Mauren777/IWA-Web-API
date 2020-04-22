var express = require('express'),
    router = express.Router(),
    productsCtrl = require('./controllers/products-controller'); // Load Controller

// Default frontend URLs
router.get('/', function(req, res){
    res.render('index');
});

// Products API
router.get('/v1/products', productsCtrl.getProducts);
router.get('/v1/products/:id', productsCtrl.getProduct);
router.post('/v1/products', productsCtrl.createProduct);
router.post('/v1/products/:id', productsCtrl.updateProduct);
router.delete('/v1/products/:id', productsCtrl.deleteProduct);

module.exports = router;