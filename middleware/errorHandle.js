const AppError = require('./appError');
// Middleware xử lý lỗi tập trung
exports.errorHandler = (err, req, res, next) => {
    // Đặt trạng thái HTTP và thông báo lỗi
    const statusCode = err.statusCode || 500;
    const status = statusCode < 500 ? 'fail' : 'error';

    // Trong môi trường phát triển, trả về chi tiết lỗi
    if (process.env.NODE_ENV === 'development') {
        return res.status(statusCode).json({
            status: status,
            message: err.message,
            stack: err.stack,
            error: err,
        });
    }

    // Trong môi trường sản xuất, trả về thông báo lỗi chung chung
    res.status(statusCode).json({
        status: status,
        message: err.isOperational ? err.message : 'An unexpected error occurred.',
    });
};