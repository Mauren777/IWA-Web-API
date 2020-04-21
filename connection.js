const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://test:1iBqUtpUTTN8E7Cz@cluster0-rtat4.mongodb.net/shop?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true });

mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});