const AppError = require('./appError');
// Middleware xử lý 404 Not Found
exports.notFound = (req, res, next) => {
    const error = new AppError(`Resource not found: ${req.originalUrl}`, 404);
    next(error);
};