const TheoDoiMuonSach = require('../models/theoDoiMuonSachModel');
const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../middleware/appError');

// Lấy danh sách theo dõi mượn sách
const getTheoDoiMuonSachList = asyncHandler(async (req, res, next) => {
    const theoDoiMuonSachList = await TheoDoiMuonSach.find();
    res.status(200).json(theoDoiMuonSachList);
});

// Thêm một theo dõi mượn sách mới
const createTheoDoiMuonSach = asyncHandler(async (req, res, next) => {
    const { MaDocGia, MaSach, TrangThai, NgayMuon, NgayTra } = req.body;

    // Kiểm tra xem có tồn tại theo dõi mượn sách với MaDocGia và MaSach chưa
    const existingTheoDoiMuonSach = await TheoDoiMuonSach.findOne({ MaDocGia, MaSach });
    if (existingTheoDoiMuonSach) {
        return next(new AppError('Theo dõi mượn sách đã tồn tại', 400));
    }

    // Thêm theo dõi mượn sách mới
    const theoDoiMuonSach = new TheoDoiMuonSach({ MaDocGia, MaSach, TrangThai, NgayMuon, NgayTra });
    await theoDoiMuonSach.save();

    res.status(201).json(theoDoiMuonSach);
});

// Cập nhật thông tin theo dõi mượn sách
const updateTheoDoiMuonSach = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { TrangThai, NgayMuon, NgayTra } = req.body;

    // Tìm và cập nhật theo dõi mượn sách theo mã ID
    const theoDoiMuonSach = await TheoDoiMuonSach.findById(id);
    if (!theoDoiMuonSach) {
        return next(new AppError('Theo dõi mượn sách không tồn tại', 404));
    }

    // Cập nhật thông tin theo dõi mượn sách
    theoDoiMuonSach.TrangThai = TrangThai || theoDoiMuonSach.TrangThai;
    theoDoiMuonSach.NgayMuon = NgayMuon || theoDoiMuonSach.NgayMuon;
    theoDoiMuonSach.NgayTra = NgayTra || theoDoiMuonSach.NgayTra;

    const updatedTheoDoiMuonSach = await theoDoiMuonSach.save();

    res.status(200).json(updatedTheoDoiMuonSach);
});

// Xóa một theo dõi mượn sách
const deleteTheoDoiMuonSach = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Tìm và xóa theo dõi mượn sách theo mã ID
    const theoDoiMuonSach = await TheoDoiMuonSach.findById(id);
    if (!theoDoiMuonSach) {
        return next(new AppError('Theo dõi mượn sách không tồn tại', 404));
    }

    await theoDoiMuonSach.remove();
    res.status(200).json({ message: 'Theo dõi mượn sách đã được xóa' });
});

// Lấy thông tin của một theo dõi mượn sách theo mã ID
const getTheoDoiMuonSachById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Tìm theo dõi mượn sách theo mã ID
    const theoDoiMuonSach = await TheoDoiMuonSach.findById(id);
    if (!theoDoiMuonSach) {
        return next(new AppError('Theo dõi mượn sách không tồn tại', 404));
    }

    // Trả về thông tin theo dõi mượn sách
    res.status(200).json(theoDoiMuonSach);
});

module.exports = {
    getTheoDoiMuonSachList,
    createTheoDoiMuonSach,
    updateTheoDoiMuonSach,
    deleteTheoDoiMuonSach,
    getTheoDoiMuonSachById
};
