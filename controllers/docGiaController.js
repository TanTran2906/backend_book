const DocGia = require('../models/docGiaModel.js');
const asyncHandler = require('../middleware/asyncHandler.js')
const AppError = require('../middleware/appError.js')
const generateToken = require('../utils/generateToken.js')
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { DienThoai, Password } = req.body;

    const user = await DocGia.findOne({ DienThoai });

    if (user && (await user.matchPassword(Password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Set JWT as an HTTP-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
        });


        res.json({
            _id: user._id,
            dienthoai: user.DienThoai,
            ten: user.Ten,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Số điện thoại hoặc mật khẩu không hợp lệ');
    }
});

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Đăng xuất thành công' });
};



// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {
        HoLot,
        Ten,
        NgaySinh,
        Phai,
        DiaChi,
        DienThoai,
        Password, } = req.body;

    const userExists = await DocGia.findOne({ DienThoai });

    if (userExists) {
        res.status(400);
        throw new Error('Tài khoản đã tồn tại');
    }

    const user = await DocGia.create({
        HoLot,
        Ten,
        NgaySinh,
        Phai,
        DiaChi,
        DienThoai,
        Password,
        isAdmin: false, // Mặc định không phải là admin
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            dienthoai: user.DienThoai,
            ten: user.Ten,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Tài khoản không hợp lệ');
    }
});


module.exports = {
    authUser, registerUser, logoutUser
};



