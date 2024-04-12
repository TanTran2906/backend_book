const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docGiaSchema = new Schema({
    MaDocGia: { type: String, required: true, unique: true },
    HoLot: { type: String, required: true },
    Ten: { type: String, required: true },
    NgaySinh: { type: Date, required: true },
    Phai: { type: String, required: true },
    DiaChi: { type: String, required: true },
    DienThoai: { type: String, required: true },
    Password: { type: String, required: true }
});

const DocGia = mongoose.model('DocGia', docGiaSchema);

module.exports = DocGia;