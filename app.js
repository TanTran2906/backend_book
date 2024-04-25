
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const AppError = require('./middleware/appError.js')
const { errorHandler } = require('./middleware/errorHandle.js')
const { notFound } = require('./middleware/notFound.js')
const sachRouter = require('./routes/sachRoutes.js')
const connectDB = require('./config/db.js'); // Đường dẫn tới tệp cấu hình DB
const nhaXuatBanRouter = require('./routes/nhaXuatBanRoutes');
const uploadRoutes = require('./routes/uploadRoutes.js');
const docGiaRoutes = require('./routes/docGiaRoutes.js');
const cloudinary = require('./config/cloudinary.js')
const authAdmin = require('./routes/authAdmin.js')
const authDocGia = require('./routes/authDocGia.js')


dotenv.config()

const app = express()

//Development logging
if (process.env.NODE_ENV === "development")
    app.use(morgan('dev'))

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

//Cookie parser middleware
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API is running...')
})

// Kết nối với MongoDB trước khi khởi động ứng dụng
// connectDB();

/*============================== ROUTES ================================*/
app.use('/api/sach', sachRouter);
app.use('/api/nhaxuatban', nhaXuatBanRouter);
// app.use('/api/theodoidonmuon', nhaXuatBanRouter);
// app.use('/api/docgia', docGiaRoutes);
app.use('/api/admin', authAdmin);
app.use('/api/docgia', authDocGia);
// app.use('/api/upload', uploadRoutes);

// const uploadsDirectory = path.join(__dirname, '/uploads');
// app.use('/uploads', express.static(uploadsDirectory));
// Cấu hình multer storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'some-folder-name',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => `image_${Date.now()}`,
    },
});
const parser = multer({ storage: storage });

// Xử lý yêu cầu gửi hình ảnh
app.post('/upload', parser.fields([{ name: "img", maxCount: 1 }]), function (req, res) {
    const link_img = req.files['img'][0];
    res.send(link_img)
});

// Middleware xử lý yêu cầu OPTIONS
app.options('/upload', (req, res) => {
    res.sendStatus(200);
});

// Các middleware xử lý yêu cầu POST và OPTIONS khác có thể được thêm ở đây

// Khởi tạo middleware xử lý các yêu cầu POST sau yêu cầu OPTIONS
app.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/upload') {
        next();
    } else {
        next();
    }
});



/*============================== HANDLE ERROR ================================*/

// 404 Not Found handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

module.exports = app