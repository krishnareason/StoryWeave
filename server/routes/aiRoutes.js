const express = require('express');
const router = express.Router();
const { suggestTitle, generateSummary, generateTags } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/suggest-title', protect, suggestTitle);
router.post('/summarize', protect, generateSummary);
router.post('/seo-tags', protect, generateTags);

module.exports = router;