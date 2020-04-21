var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({ 
    title: String,
    description: String,
    price: Number 
});

module.exports = mongoose.model('Product', productSchema);