// const NhaXuatBanService = require("../services/nhaXuatBan.service");
const MongoDB = require("../utils/mongodb");
const AppError = require('../middleware/appError');
const NhanVienService = require('../services/nhanVien.service')

const login = async (req, res, next) => {
    try {
        const { SoDienThoai, Password } = req.body;
        console.log(req.body)

        // Kiểm tra nếu không có số điện thoại hoặc mật khẩu
        if (!SoDienThoai || !Password) {
            return next(new AppError('Vui lòng cung cấp số điện thoại và mật khẩu', 400));
        }

        const nhanVienService = new NhanVienService(MongoDB.client);

        // Gọi phương thức đăng nhập từ service
        const loggedInUser = await nhanVienService.login(SoDienThoai, Password);

        if (loggedInUser) {
            res.status(200).json(loggedInUser); // Gửi thông tin người dùng về frontend
        } else {
            next(new AppError('Số điện thoại hoặc mật khẩu không đúng', 401));
        }
    } catch (error) {
        console.log(error)
        next(error); // Chuyển lỗi đến middleware xử lý lỗi
    }
}

module.exports = { login };