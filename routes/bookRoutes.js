const express = require('express')
const books = require('../controllers/bookController')

const router = express.Router();
// import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(books.getBooks)



// router.route('/search/:name').get(searchCabins);

// router.route('/:id/reviews').post(protect, createCabinReview)
// router.route('/').get(getCabins).post(protect, admin, createCabin);
// router.route('/:id').get(getCabinById).delete(protect, admin, deleteCabin).put(protect, admin, updateCabin)




module.exports = router;
