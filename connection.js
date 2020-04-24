const mongoose = require('mongoose');
// Connect to MongoDB Atlas. User and Password are Heroku config Values
mongoose.connect('mongodb+srv://'+process.env.MONGODB_USERNAME+':'+process.env.MONGODB_PASSWORD+'@cluster0-rtat4.mongodb.net/shop?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true });

mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});