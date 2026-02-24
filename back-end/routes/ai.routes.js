const express = require('express')
const router = express.Router()
const aiController = require('../controllers/ai.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/analyzeResume', authMiddleware, aiController.analyzeResume)
router.post('/analyzeLetter', authMiddleware, aiController.analyzeLetter)

module.exports = router
