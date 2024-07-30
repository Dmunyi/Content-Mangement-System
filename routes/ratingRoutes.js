// routes/ratingRoutes.js
const express = require('express');
const { addRating, addReview, getReviews } = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:id/rate', protect, addRating);
router.post('/:id/review', protect, addReview);
router.get('/:id/reviews', getReviews);

module.exports = router;
