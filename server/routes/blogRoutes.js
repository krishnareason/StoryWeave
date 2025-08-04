const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createBlog).get(getAllBlogs);
router.route('/:id').get(getBlogById).put(protect, updateBlog).delete(protect, deleteBlog);

module.exports = router;