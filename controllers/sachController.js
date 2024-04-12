const Sach = require('../models/sachModel');
const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../middleware/appError');
const TheoDoiMuonSach = require('../models/donMuonModel');

// Lấy danh sách các sách
const getSachList = asyncHandler(async (req, res, next) => {
    const sachList = await Sach.find();
    res.status(200).json(sachList);
});

// Tạo một sách mới
const createSach = asyncHandler(async (req, res, next) => {
    const { TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia } = req.body;

    // Kiểm tra xem sách đã tồn tại chưa
    const existingSach = await Sach.findOne({ TenSach, MaNXB, NamXuatBan });
    if (existingSach) {
        return next(new AppError('Sách đã tồn tại', 400));
    }

    // Kiểm tra xem có tệp hình ảnh được tải lên không
    let HinhAnh = null;
    if (req.file) {
        // Nếu có tệp hình ảnh, lấy đường dẫn đến hình ảnh
        HinhAnh = `/${req.file.path.replace(/\\/g, '/')}`;
    }

    // Tạo sách mới
    const sach = new Sach({ TenSach, HinhAnh, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia });
    await sach.save();

    res.status(201).json(sach);
});


// Cập nhật thông tin của một sách
const updateSach = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia } = req.body;

    // Tìm sách theo mã ID
    const sach = await Sach.findById(id);
    if (!sach) {
        return next(new AppError('Sách không tồn tại', 404));
    }

    // Cập nhật thông tin sách
    sach.TenSach = TenSach || sach.TenSach;
    sach.DonGia = DonGia || sach.DonGia;
    sach.SoQuyen = SoQuyen || sach.SoQuyen;
    sach.NamXuatBan = NamXuatBan || sach.NamXuatBan;
    sach.MaNXB = MaNXB || sach.MaNXB;
    sach.TacGia = TacGia || sach.TacGia;

    // Xử lý hình ảnh nếu có tệp được tải lên
    if (req.file) {
        // Nếu có tệp hình ảnh, cập nhật thuộc tính HinhAnh
        sach.HinhAnh = `/${req.file.path.replace(/\\/g, '/')}`;
    }

    const updatedSach = await sach.save();

    res.status(200).json(updatedSach);
});

// Xóa một sách
const deleteSach = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Kiểm tra xem sách có đang nằm trong đơn mượn nào không
    const isBorrowed = await TheoDoiMuonSach.exists({ MaSach: id });
    if (isBorrowed) {
        return next(new AppError('Sách đang nằm trong đơn mượn sách và không thể xóa.', 400));
    }

    // Tìm sách theo mã ID
    const sach = await Sach.findById(id);
    if (!sach) {
        return next(new AppError('Sách không tồn tại', 404));
    }

    // Xóa sách
    await sach.remove();
    res.status(200).json({ message: 'Sách đã được xóa' });
});

// Lấy thông tin của một sách theo mã ID
const getSachById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Tìm sách theo mã ID
    const sach = await Sach.findById(id);
    if (!sach) {
        return next(new AppError('Sách không tồn tại', 404));
    }

    // Trả về thông tin sách
    res.status(200).json(sach);
});

const findSachByName = asyncHandler(async (req, res, next) => {
    const { name } = req.query; // Lấy tên sách từ query parameters

    // Tìm sách theo tên
    const sachList = await Sach.find({
        TenSach: { $regex: new RegExp(name, 'i') } // Sử dụng biểu thức chính quy để tìm kiếm tên sách không phân biệt chữ hoa chữ thường
    });

    // Nếu không tìm thấy sách, trả về thông báo
    if (sachList.length === 0) {
        return next(new AppError('Không tìm thấy sách nào', 404));
    }

    // Trả về danh sách sách tìm được
    res.status(200).json(sachList);
});


module.exports = {
    getSachList,
    createSach,
    updateSach,
    deleteSach,
    getSachById,
    findSachByName
};


// // // @desc    Delete a cabin
// // // @route   DELETE /api/cabins/:id
// // // @access  Private/Admin
// export const deleteCabin = asyncHandler(async (req, res, next) => {
//     const cabin = await Cabin.findById(req.params.id);

//     if (!cabin) {
//         return next(new AppError('No cabin found with that ID', 404))
//     }

//     // Kiểm tra nếu cabin đang tồn tại trong bất kỳ booking nào
//     const existingBooking = await Booking.findOne({ cabin: cabin._id });

//     if (existingBooking) {
//         // return res.status(400).json({
//         //     message: 'Cannot delete cabin as it is associated with a booking'
//         // });
//         return res.status(400).json(
//             existingBooking
//         );

//     }

//     // Nếu cabin không được liên kết với bất kỳ booking nào, tiến hành xóa
//     await Cabin.deleteOne({ _id: cabin._id });
//     res.status(204).json({
//         message: 'Cabin removed'
//     });
// });

// // @desc    Fetch single cabin
// // @route   GET /api/cabins/:id
// // @access  Public
// export const getCabinById = asyncHandler(async (req, res, next) => {
//     const cabin = await Cabin.findById(req.params.id);

//     if (cabin) {
//         res.status(200).json(
//             cabin
//         );
//     } else {
//         return next(new AppError('No cabin found with that ID', 404))
//     }
// });

// // // @desc    Create a cabin
// // // @route   POST /api/cabins
// // // @access  Private/Admin
// export const createCabin = asyncHandler(async (req, res, next) => {
//     const cabin = new Cabin({
//         name: `Sample name ${[...Array(4)].map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')}`,
//         // user: req.user._id,
//         maxCapacity: 1,
//         regularPrice: 100,
//         discount: 0,
//         image: '/cabins/sample.jpg',
//         description:
//             "Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
//         ratingsAverage: 4.6,
//         ratingQuantity: 1,
//         reviews: [],
//     });

//     const createdCabin = await cabin.save();

//     res.status(201).json(
//         createdCabin
//     )
// });



// // @desc    Update a cabin
// // @route   PUT /api/cabins/:id
// // @access  Private/Admin
// export const updateCabin = asyncHandler(async (req, res, next) => {
//     const { name, maxCapacity, regularPrice, discount, image, description } =
//         req.body;

//     const cabin = await Cabin.findById(req.params.id);

//     if (cabin) {
//         // Chỉ cập nhật các trường khác khi cần
//         if (name) {
//             cabin.name = name;
//         }
//         if (maxCapacity) {
//             cabin.maxCapacity = maxCapacity;
//         }
//         if (regularPrice) {
//             cabin.regularPrice = regularPrice;
//         }
//         if (discount) {
//             cabin.discount = discount;
//         }
//         if (description) {
//             cabin.description = description;
//         }

//         // Nếu có image mới được cung cấp, thì cập nhật image
//         if (image) {
//             cabin.image = `${image.replace(/\\/g, '/')}`;
//         }
//         // cabin.name = name;
//         // cabin.maxCapacity = maxCapacity;
//         // cabin.regularPrice = regularPrice;
//         // cabin.discount = discount;
//         // // Check if a new image is uploaded, if not, use the existing image
//         // if (req.file) {
//         //     cabin.image = `/${req.file.path.replace(/\\/g, '/')}`;
//         // }
//         // // cabin.image = image;
//         // cabin.description = description;

//         const updatedCabin = await cabin.save();
//         res.status(200).json(updatedCabin);
//     } else {
//         return next(new AppError('No cabin found with that ID', 404))
//     }
// });

// // @desc    Get top rated cabins
// // @route   GET /api/cabins/top
// // @access  Public
// export const getTopCabins = asyncHandler(async (req, res, next) => {
//     const cabins = await Cabin.find({}).sort({ ratingsAverage: -1 }).limit(3);

//     res.status(200).json(cabins);
// });

// @desc    Search cabins by name
// @route   GET /api/cabins/search/:name
// @access  Public
// export const searchCabins = asyncHandler(async (req, res) => {
//     const { name } = req.params;

//     // Sử dụng biểu thức chính quy để tìm kiếm các cabins có tên chứa từ khóa
//     const cabins = await Cabin.find({ name: { $regex: new RegExp(name, 'i') } });

//     if (cabins) {
//         res.status(200).json(
//             cabins
//         );
//     } else {
//         return next(new AppError('No cabin found with that name', 404))
//     }
// });

