const express = require('express');
const router = express.Router();
const {
    getNhaXuatBan,
    createNhaXuatBan,
    updateNhaXuatBan,
    deleteNhaXuatBan,
    getNhaXuatBanById
} = require('../controllers/nhaXuatBanController');

// Lấy danh sách các nhà xuất bản
router.get('/', getNhaXuatBan);
router.get('/:id', getNhaXuatBanById);

// Tạo nhà xuất bản mới
router.post('/', createNhaXuatBan);

// Cập nhật thông tin nhà xuất bản
router.put('/:id', updateNhaXuatBan);

// Xóa nhà xuất bản
router.delete('/:id', deleteNhaXuatBan);

module.exports = router;
