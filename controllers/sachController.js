const Sach = require('../models/sachModel');
const asyncHandler = require('../middleware/asyncHandler');
const AppError = require('../middleware/appError');

const SachService = require("../services/sach.service");
const MongoDB = require("../utils/mongodb");
const { ObjectId } = require("mongodb");



const findAll = async (req, res, next) => {
    let documents = [];

    try {
        const sachService = new SachService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await sachService.findByName(name);
        } else {
            documents = await sachService.find({});
        }
    } catch (error) {
        return next(new AppError('Sách không tồn tại', 404));
    }
    res.status(200).json(documents);
}


const deleteBook = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.delete(req.params.id); //Trả về undefined khi xóa thành công
        if (document) {
            return next(new AppError('Sách không tồn tại', 404));
        }
        return res.send({ message: "Sách đã được xóa thành công" });
    } catch (error) {
        return next(new AppError(`Không thể xóa sách với id=${req.params.id}`, 500));
    }
}


// exports.findOne = async (req, res, next) => {
//     try {
//         const contactService = new ContactService(MongoDB.client);
//         const document = await contactService.findById(req.params.id);
//         if (!document) {
//             return next(new ApiError(404, "Contact not found"));
//         }
//         return res.send(document);
//     } catch (error) {

//         return next(new ApiError(500, `Error retrieving contact with id=${req.params.id}`))
//     }
// }


const updateBook = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);

        // // Kiểm tra xem MaNXB có trong req.body không
        if (req.body.MaNXB) {
            // Chuyển đổi MaNXB thành ObjectId
            req.body.MaNXB = new ObjectId(req.body.MaNXB);
        }

        const document = await sachService.update(req.params.id, req.body);

        if (document)  //document nhận undefined khi cập nhật thành công
            return next(new AppError("Không tìm thấy sách", 404));
        return res.send({ message: "Sách được cập nhật thành công" });
    } catch (error) {
        return next(new AppError(`Không thể cập nhật sách với id=${req.params.id}`, 500));
    }
}



const createBook = async (req, res, next) => {
    // if (!req.body?.name) {
    //     return next(new ApiError(400, "Name can not be empty"));
    // }
    try {
        // // Kiểm tra xem MaNXB có trong req.body không
        if (req.body.MaNXB) {
            // Chuyển đổi MaNXB thành ObjectId
            req.body.MaNXB = new ObjectId(req.body.MaNXB);
        }
        console.log(req.body)

        const sachService = new SachService(MongoDB.client);
        const document = await sachService.create(req.body);
        if (document)  //document nhận undefined khi cập nhật thành công
            return next(new AppError("Không tạo được sách", 404));
        return res.send({ message: "Sách được tạo thành công" });
    } catch (error) {

        return next(new AppError(`Xuất hiện lỗi trong quá trình tạo sách`, 500));
    }
}

module.exports = {
    findAll,
    deleteBook,
    updateBook,
    createBook
};



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

