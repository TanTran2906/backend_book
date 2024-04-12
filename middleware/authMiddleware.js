const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../middleware/appError');
const jwt = require('jsonwebtoken')
const DocGia = require('../models/docGiaModel')


// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read JWT from the 'jwt' cookie (.jwt vì res.cookie('jwt',...))
    token = req.cookies.jwt;

    if (token) {
        try {
            //Giải mã
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Thiết lập thông tin người dùng đã xác thực
            req.user = await DocGia.findById(decoded.userId).select("-Password");

            next();
        } catch (error) {
            console.error(error);
            return next(new AppError("Không xác thực, token lỗi", 401))
        }
    } else {
        return next(new AppError("Không xác thực, token lỗi", 401))
    }
});

// User must be an admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return next(new AppError("Không xác thực với vai trò là admin", 401))
    }
};

module.exports = { protect, admin };
