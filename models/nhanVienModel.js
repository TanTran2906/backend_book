const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nhanVienSchema = new Schema({
    MSNV: { type: String, required: true, unique: true },
    HoTenNV: { type: String, required: true },
    Password: { type: String, required: true },
    Chucvu: { type: String, required: true },
    Diachi: { type: String, required: true },
    SoDienThoai: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: true }
});

const NhanVien = mongoose.model('NhanVien', nhanVienSchema);

module.exports = NhanVien;
