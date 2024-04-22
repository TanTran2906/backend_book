const mongoose = require('mongoose');

// Đường dẫn tới cơ sở dữ liệu MongoDB
const MONGO_URI = 'mongodb://127.0.0.1:27017/QL_Sach' || process.env.MONGODB_URI;

// Hàm để kết nối với MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;