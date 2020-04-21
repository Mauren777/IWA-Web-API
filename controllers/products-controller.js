var Product = require('../models/products');

exports.createProduct = function(req, res) { 
    var newproduct = new Product(req.body);
    newproduct.save(function (err, product) { 
        if (err) { 
            res.status (400).json(err);
        }
        res.json(product); 
    });
};

exports.getProducts = function(req,res){
  Product.find({}, function (err, products) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.json(products);
  }); 
};