const express = require('express')
const router = express.Router()
const promptController = require('../controllers/prompts.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', authMiddleware, promptController.createPrompt)
router.get('/all', authMiddleware, promptController.getAllPrompts)
router.get('/me', authMiddleware, promptController.getPromptByUser)
router.get('/:id', authMiddleware, promptController.getPromptByID)
router.put('/:id', authMiddleware, promptController.updatePrompt)
router.delete('/:id', authMiddleware, promptController.deletePrompt)

module.exports = router
