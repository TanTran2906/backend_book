const express = require('express');
const router = express.Router();
const {
    findAll, createPublisher, deletePublisher, updatePublisher
} = require('../controllers/nhaXuatBanController');

// Lấy danh sách các nhà xuất bản
router.route("/")
    .get(findAll)
    .post(createPublisher)

router.route("/:id")
    .delete(deletePublisher)
    .put(updatePublisher)
module.exports = router;
