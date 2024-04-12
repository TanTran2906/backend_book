const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nhaXuatBanSchema = new Schema({
    MaNXB: { type: String, required: true, unique: true },
    TenNXB: { type: String, required: true },
    DiaChi: { type: String, required: true }
});

const NhaXuatBan = mongoose.model('NhaXuatBan', nhaXuatBanSchema);

module.exports = NhaXuatBan;
