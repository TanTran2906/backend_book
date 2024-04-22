const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(error => {
        console.error('Async error caught:', error);
        next(error); // Chuyển lỗi đến middleware xử lý lỗi
    });

module.exports = asyncHandler;
