const NhaXuatBan = require('../models/nhaXuatBanModel');
const asyncHandler = require('../middleware/asyncHandler.js')
const AppError = require('../middleware/appError.js')


// Lấy danh sách các nhà xuất bản
const getNhaXuatBan = asyncHandler(async (req, res, next) => {
    const nhaXuatBanList = await NhaXuatBan.find();
    res.status(200).json(nhaXuatBanList);
});


/// Tạo một nhà xuất bản mới
const createNhaXuatBan = asyncHandler(async (req, res, next) => {
    const { TenNXB, DiaChi } = req.body;

    // Kiểm tra xem tên nhà xuất bản có tồn tại không
    const existingNhaXuatBan = await NhaXuatBan.findOne({ TenNXB });
    if (existingNhaXuatBan) {

        return next(new AppError('Nhà xuất bản đã tồn tại', 400))
    }

    // Tạo nhà xuất bản mới
    const nhaXuatBan = new NhaXuatBan({ TenNXB, DiaChi });
    await nhaXuatBan.save();

    res.status(201).json(nhaXuatBan);
});

// Cập nhật thông tin của một nhà xuất bản
const updateNhaXuatBan = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { TenNXB, DiaChi } = req.body;

    // Tìm và cập nhật nhà xuất bản theo mã ID
    const nhaXuatBan = await NhaXuatBan.findById(id);
    if (!nhaXuatBan) {
        return next(new AppError('Nhà xuất bản không tồn tại', 404))

    }

    // Cập nhật thông tin nhà xuất bản
    nhaXuatBan.TenNXB = TenNXB || nhaXuatBan.TenNXB;
    nhaXuatBan.DiaChi = DiaChi || nhaXuatBan.DiaChi;
    const updatedNhaXuatBan = await nhaXuatBan.save();

    res.status(200).json(updatedNhaXuatBan);
});

// Xóa một nhà xuất bản
const deleteNhaXuatBan = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Tìm và xóa nhà xuất bản theo mã ID
    const nhaXuatBan = await NhaXuatBan.findById(id);
    if (!nhaXuatBan) {
        return next(new AppError('Nhà xuất bản không tồn tại', 404))
    }

    await nhaXuatBan.remove();
    res.status(200).json({ message: 'Nhà xuất bản đã được xóa' });
});

// Lấy thông tin của một nhà xuất bản theo mã
const getNhaXuatBanById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Tìm nhà xuất bản theo mã ID
    const nhaXuatBan = await NhaXuatBan.findById(id);
    if (!nhaXuatBan) {
        return next(new AppError('Nhà xuất bản không tồn tại', 404))
    }

    // Trả về thông tin nhà xuất bản
    res.status(200).json(nhaXuatBan);
});

const findNhaXuatBanByName = asyncHandler(async (req, res, next) => {
    const { name } = req.query; // Lấy tên nhà xuất bản từ query parameters

    // Tìm nhà xuất bản theo tên
    const nhaXuatBanList = await NhaXuatBan.find({
        TenNXB: { $regex: new RegExp(name, 'i') } // Sử dụng biểu thức chính quy để tìm kiếm tên nhà xuất bản không phân biệt chữ hoa chữ thường
    });

    // Nếu không tìm thấy nhà xuất bản, trả về thông báo
    if (nhaXuatBanList.length === 0) {
        return next(new AppError('Không tìm thấy nhà xuất bản nào', 404));
    }

    // Trả về danh sách nhà xuất bản tìm được
    res.status(200).json(nhaXuatBanList);
});


module.exports = {
    getNhaXuatBan,
    createNhaXuatBan,
    updateNhaXuatBan,
    deleteNhaXuatBan,
    getNhaXuatBanById,
    findNhaXuatBanByName
};
