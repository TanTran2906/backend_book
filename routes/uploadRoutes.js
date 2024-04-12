const path = require('path')
const express = require('express')
const multer = require('multer')
const AppError = require('../middleware/appError.js')
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only image.', 400), false);
    }
}

const upload = multer({
    storage,
    //Kiểm tra file có đúng định dạng không?
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Endpoint to handle image upload
router.post('/', upload.single('image'), (req, res, next) => {
    try {
        if (!req.file) {
            throw new AppError('No image file uploaded', 400);
        }
        // If there is a file, return success response
        const filePath = req.file.path.replace(/\\/g, '/');
        res.status(201).json({
            message: 'Image uploaded successfully',
            imagePath: `/${filePath}`
        });
    } catch (err) {
        next(err);
    }
});

// router.post('/', upload.single('image'), (req, res) => {
//     if (req.file) {
//         // Nếu có tệp hình ảnh được tải lên, thực hiện xử lý ảnh
//         res.send({
//             message: 'Image uploaded successfully',
//             image: `/${req.file.path.replace(/\\/g, '/')}`,
//         });
//     }
//     else {
//         // Nếu không có tệp hình ảnh, trả về thông báo lỗi
//         res.status(400).json({ message: 'No image file uploaded' });
//     }

// });

module.exports = router;
