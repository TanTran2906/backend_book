const express = require('express');
const router = express.Router();
const NhanVien = require('../models/nhanVienModel');
const bcrypt = require('bcryptjs');

// POST route for employee login
router.post('/login', async (req, res) => {
    const { SoDienThoai, Password } = req.body;

    try {
        // Tìm nhân viên bằng số điện thoại
        const nhanvien = await NhanVien.findOne({ SoDienThoai });

        // Kiểm tra xem nhân viên có tồn tại không
        if (!nhanvien) {
            return res.status(400).json({ message: 'Số điện thoại hoặc mật khẩu không chính xác' });
        }

        // Xác thực mật khẩu
        const isMatch = await bcrypt.compare(Password, nhanvien.Password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Số điện thoại hoặc mật khẩu không chính xác' });
        }

        // Nếu mọi thứ đều hợp lệ, trả về thông tin nhân viên
        res.json(nhanvien);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

module.exports = router;