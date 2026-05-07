const express = require('express')
const router = express.Router()
const letter_generatedController = require('../controllers/letter_generated.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', authMiddleware, letter_generatedController.createLettergenerated)
router.get('/all', authMiddleware, letter_generatedController.getAllLettergenerated)
router.get('/me', authMiddleware, letter_generatedController.getLettergenerated)
router.get('/:id', authMiddleware, letter_generatedController.getLettergeneratedbyID)
router.put('/:id', authMiddleware, letter_generatedController.updateLettergenerated)
router.delete('/:id', authMiddleware, letter_generatedController.deleteLettergenerated)

module.exports = router
