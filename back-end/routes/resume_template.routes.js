const express = require('express')
const router = express.Router()
const resume_templateController = require('../controllers/resume_template.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', authMiddleware, resume_templateController.createResumeTemplate)
router.get('/all', authMiddleware, resume_templateController.getAllResumeTemplate)
router.get('/me', authMiddleware, resume_templateController.getResumeTemplate)
router.get('/:id', authMiddleware, resume_templateController.getResumeTemplatebyID)
router.put('/:id', authMiddleware, resume_templateController.updateResumeTemplate)
router.delete('/:id', authMiddleware, resume_templateController.deleteResumeTemplate)

module.exports = router
