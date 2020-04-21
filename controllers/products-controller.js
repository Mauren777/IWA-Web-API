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

exports.getProduct = function(req, res) {
  Product.findOne({_id: req.params.id}, function (err, product) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(product);
  }); 
};

exports.updateProduct = function(req, res) {
  Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},function (err, product) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(product);
  }); 
};

exports.deleteProduct = function(req, res) {
  Product.findByIdAndRemove(req.params.id, function (err, product) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(product);
  }); 
}