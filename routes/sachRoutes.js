const express = require('express');
const router = express.Router();
const {
    findAll, deleteBook, updateBook, createBook
} = require('../controllers/sachController');

// Lấy danh sách các sách
router.route("/")
    .get(findAll)
    .post(createBook)

// // router.get('/', getSachList);
// router.get('/:id', getSachById);

// // Tạo sách mới
// router.post('/', createSach);

// // Cập nhật thông tin sách
// router.put('/:id', updateSach);

// Xóa sách
router.route("/:id")
    .delete(deleteBook)
    .put(updateBook)

// router.get('/search', findSachByName);

module.exports = router;
