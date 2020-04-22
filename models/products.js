var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({ 
    title: String,
    description: String,
    image: String,
    price: Number 
});

module.exports = mongoose.model('Product', productSchema);