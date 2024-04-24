const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nhanVienSchema = new Schema({
    HoTenNV: { type: String, required: true },
    Password: { type: String, required: true },
    Chucvu: { type: String, required: true },
    Diachi: { type: String, required: true },
    SoDienThoai: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: true }
});

// Xác thực mật khẩu
nhanVienSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);
};

// Middleware để hash mật khẩu trước khi lưu vào cơ sở dữ liệu
nhanVienSchema.pre('save', async function (next) {
    if (!this.isModified('Password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
});

const NhanVien = mongoose.model('NhanVien', nhanVienSchema);

module.exports = NhanVien;
