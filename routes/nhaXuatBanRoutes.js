const express = require('express');
const router = express.Router();
const {
    findAll, updateNhaXuatBan, deleteNhaXuatBan
} = require('../controllers/nhaXuatBanController');

// Lấy danh sách các nhà xuất bản
router.route("/")
    .get(findAll)

router.route("/:id")
    .delete(updateNhaXuatBan)
    .put(deleteNhaXuatBan)
module.exports = router;
