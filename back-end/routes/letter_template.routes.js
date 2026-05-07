const express = require('express')
const router = express.Router()
const letter_templateController = require('../controllers/letter_template.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', authMiddleware, letter_templateController.createLetterTemplate)
router.get('/all', authMiddleware, letter_templateController.getAllLetterTemplate)
router.get('/me', authMiddleware, letter_templateController.getLetterTemplate)
router.get('/:id', authMiddleware, letter_templateController.getByIDLetterTemplate)
router.put('/:id', authMiddleware, letter_templateController.updateLetterTemplate)
router.delete('/:id', authMiddleware, letter_templateController.deleteLetterTemplate)

module.exports = router
