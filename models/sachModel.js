const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require('mongoose').Types.ObjectId;

const sachSchema = new Schema({
    TenSach: { type: String, required: true },
    HinhAnh: { type: String },
    DonGia: { type: Number, required: true },
    SoQuyen: { type: Number, required: true },
    NamXuatBan: { type: Number, required: true },
    MaNXB: { type: mongoose.Schema.Types.ObjectId, ref: 'NhaXuatBan', required: true },
    TacGia: { type: String, required: true }
});




const Sach = mongoose.model('Sach', sachSchema);

module.exports = Sach;
