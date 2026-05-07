const express = require('express')
const router = express.Router()
const c = require('../controllers/portfolio.controller')
const auth = require('../middleware/auth.middleware')

router.get('/projects', c.getProjects)
router.get('/experiences', c.getExperiences)
router.get('/about', c.getAbout)
router.get('/skills', c.getSkills)

router.get('/projects/all', auth, c.getProjectsAdmin)
router.post('/projects', auth, c.createProject)
router.put('/projects/:id', auth, c.updateProject)
router.delete('/projects/:id', auth, c.deleteProject)

router.post('/experiences', auth, c.createExperience)
router.put('/experiences/:id', auth, c.updateExperience)
router.delete('/experiences/:id', auth, c.deleteExperience)

router.put('/about', auth, c.updateAbout)

module.exports = router
