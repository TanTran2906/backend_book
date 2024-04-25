const express = require('express');
const router = express.Router();
const { login } = require('../controllers/nhanVienController')



// Lấy danh sách các nhà xuất bản
router.route("/login")
    .post(login)


module.exports = router;