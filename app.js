
const path = require('path')
const express = require('express')
// const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const dotenv = require('dotenv')
const AppError = require('./middleware/appError.js')
// const { errorHandler } = require('./middleware/errorMiddleware.js')
const booksRouter = require('./routes/bookRoutes')
// dotenv.config()

const app = express()

//Development logging
// if (process.env.NODE_ENV === "development")
//     app.use(morgan('dev'))

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

//Cookie parser middleware
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API is running...')
})



/*============================== ROUTES ================================*/
app.use('/api/books', booksRouter);

// app.use('/api/upload', uploadRoutes);

// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


/*============================== HANDLE ERROR ================================*/

// //Handling error route
// app.all('*', (req, res, next) => {
//     //Truyền đến middleware xử lý lỗi cuối cùng, bỏ qua mọi middleware còn lại
//     next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
// })

// // //Bắt lỗi mã đồng bộ --> khi một ngoại lệ không được xử lý
// process.on('uncaughtException', err => {
//     console.log('UNHANDLED EXCEPTION 🔥 Shutting down...');
//     console.log(err.name, err.message);
//     process.exit(1)
// })

// // //Handling all error
// app.use(errorHandler)

// // const server = app.listen(port, () => console.log(`Server running on port ${port}`))
// // //-	Lỗi thường liên quan đến kết nối DB (ví dụ như mật khẩu DB bị sai hoặc bị thay đổi,….)
// process.on('unhandledRejection', err => {
//     console.log('UNHANDLED REJECTION 🔥 Shutting down...');
//     console.log(err.name, err.message);
//     server.close(() => {
//         process.exit(1)
//     })
// })

// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào
    // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
    return next(new AppError("Resource not found", 404));
});
// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app