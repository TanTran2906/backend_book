const express = require('express');
const router = express.Router();
const {
    createTheoDoiMuonSach, deleteTheoDoiMuonSach, getTheoDoiMuonSachById, getTheoDoiMuonSachList, updateTheoDoiMuonSach
} = require('../controllers/donMuonSach');

// Lấy danh sách các sách
router.get('/', getTheoDoiMuonSachList);
router.get('/:id', getTheoDoiMuonSachById);

// Tạo sách mới
router.post('/', createTheoDoiMuonSach);

// Cập nhật thông tin sách
router.put('/:id', updateTheoDoiMuonSach);

// Xóa sách
router.delete('/:id', deleteTheoDoiMuonSach);

module.exports = router;
