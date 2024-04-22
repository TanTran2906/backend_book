const express = require('express');
const router = express.Router();
const {
    createSach, deleteSach, getSachById, getSachList, updateSach, findSachByName, findAll
} = require('../controllers/sachController');

// Lấy danh sách các sách
router.route("/")
    .get(findAll)

// router.get('/', getSachList);
router.get('/:id', getSachById);

// Tạo sách mới
router.post('/', createSach);

// Cập nhật thông tin sách
router.put('/:id', updateSach);

// Xóa sách
router.delete('/:id', deleteSach);

router.get('/search', findSachByName);

module.exports = router;
