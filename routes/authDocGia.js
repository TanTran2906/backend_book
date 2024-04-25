const express = require('express');
const router = express.Router();
const { loginDocGia } = require('../controllers/docGiaController');

router.route("/login").post(loginDocGia);

module.exports = router;
