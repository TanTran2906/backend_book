const NhaXuatBanService = require("../services/nhaXuatBan.service");
const MongoDB = require("../utils/mongodb");
const AppError = require('../middleware/appError');

const findAll = async (req, res, next) => {
    let documents = [];

    try {
        const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
        documents = await nhaXuatBanService.find({});
    } catch (error) {
        return next(new AppError('Không tìm thấy nhà xuất bản', 404));
    }
    res.status(200).json(documents);
}

const deleteNhaXuatBan = async (req, res, next) => {
    try {
        const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
        const document = await nhaXuatBanService.delete(req.params.id);
        if (document) {
            return next(new AppError('Nhà xuất bản không tồn tại', 404));
        }
        return res.send({ message: "Nhà xuất bản đã được xóa thành công" });
    } catch (error) {
        return next(new AppError(`Không thể xóa nhà xuất bản với id=${req.params.id}`, 500));
    }
}

const updateNhaXuatBan = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new AppError("Dữ liệu cần cập nhật rỗng!", 400));
    }

    try {
        const nhaXuatBanService = new NhaXuatBanService(MongoDB.client);
        const document = await nhaXuatBanService.update(req.params.id, req.body);
        if (document) {
            return next(new AppError("Không tìm thấy nhà xuất bản", 404));
        }
        return res.send({ message: "Nhà xuất bản được cập nhật thành công" });
    } catch (error) {
        return next(new AppError(`Không thể cập nhật nhà xuất bản với id=${req.params.id}`, 500));
    }
}

module.exports = {
    findAll,
    deleteNhaXuatBan,
    updateNhaXuatBan
};
