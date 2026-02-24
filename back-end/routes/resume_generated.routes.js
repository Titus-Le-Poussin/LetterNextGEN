const express = require('express')
const router = express.Router()
const resume_generatedController = require('../controllers/resume_generated.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', authMiddleware, resume_generatedController.createResumeGenerated)
router.get('/all', authMiddleware, resume_generatedController.getAllResumeGenerated)
router.get('/me', authMiddleware, resume_generatedController.getResumeGenerated)
router.get('/:id', authMiddleware, resume_generatedController.getresumegeneratedbyID)
router.put('/:id', authMiddleware, resume_generatedController.updateResumeGenerated)
router.delete('/:id', authMiddleware, resume_generatedController.deleteResumeGenerated)

module.exports = router
