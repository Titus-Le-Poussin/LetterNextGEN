const express = require('express')
const router = express.Router()
const skillsController = require('../controllers/skills.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/', authMiddleware, skillsController.createSkills)
router.get('/all', authMiddleware, skillsController.getAllSkills)
router.get('/me', authMiddleware, skillsController.getSkills)
router.get('/category/:category_name', authMiddleware, skillsController.getSkillsByCategory)
router.get('/:id', authMiddleware, skillsController.getSkillsByID)
router.put('/:id', authMiddleware, skillsController.updateSkills)
router.delete('/:id', authMiddleware, skillsController.deleteSkills)

module.exports = router