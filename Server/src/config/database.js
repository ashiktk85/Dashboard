const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        mongoose.connect('mongodb://localhost:27017/Dashboard')
        console.log('Database connected');
        
    } catch (error) {
        console.log("Error in connecting Database", error);
        
    }
}

module.exports = {
    connectDB
} 