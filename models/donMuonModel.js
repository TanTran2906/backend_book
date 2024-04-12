const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const theoDoiMuonSachSchema = new Schema({
    MaDocGia: { type: mongoose.Schema.Types.ObjectId, ref: 'DocGia', required: true },
    MaSach: { type: mongoose.Schema.Types.ObjectId, ref: 'Sach', required: true },
    TrangThai: { type: String, required: true },
    NgayMuon: { type: Date, required: true },
    NgayTra: { type: Date }
});

const TheoDoiMuonSach = mongoose.model('TheoDoiMuonSach', theoDoiMuonSachSchema);

module.exports = TheoDoiMuonSach;
