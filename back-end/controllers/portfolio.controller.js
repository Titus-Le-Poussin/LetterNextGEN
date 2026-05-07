const portfolioModel = require('../models/portfolio.model')

const getProjects = async (req, res) => {
  try {
    const result = await portfolioModel.getAllProjects()
    res.json(result.rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
}

const getProjectsAdmin = async (req, res) => {
  try {
    const result = await portfolioModel.getAllProjectsAdmin()
    res.json(result.rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
}

const createProject = async (req, res) => {
  try {
    const { title, short_desc, description, tech_stack, media_url, media_type, github_url, demo_url, order_index } = req.body
    const result = await portfolioModel.createProject(title, short_desc, description, tech_stack, media_url, media_type, github_url, demo_url, order_index)
    res.status(201).json(result.rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
}

const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const { title, short_desc, description, tech_stack, media_url, media_type, github_url, demo_url, order_index, visible } = req.body
    const result = await portfolioModel.updateProject(id, title, short_desc, description, tech_stack, media_url, media_type, github_url, demo_url, order_index, visible)
    if (result.rows.length === 0) return res.status(404).json({ error: 'Projet introuvable' })
    res.json(result.rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
}

const deleteProject = async (req, res) => {
  try {
    await portfolioModel.deleteProject(req.params.id)
    res.json({ message: 'Projet supprimé' })
  } catch (e) { res.status(500).json({ error: e.message }) }
}

const getExperiences = async (req, res) => {
  try {
    const result = await portfolioModel.getAllExperiences()
    res.json(result.rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
}

const createExperience = async (req, res) => {
  try {
    const { company, role, period, description, tech_stack, is_current, order_index } = req.body
    const result = await portfolioModel.createExperience(company, role, period, description, tech_stack, is_current, order_index)
    res.status(201).json(result.rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
}

const updateExperience = async (req, res) => {
  try {
    const { id } = req.params
    const { company, role, period, description, tech_stack, is_current, order_index } = req.body
    const result = await portfolioModel.updateExperience(id, company, role, period, description, tech_stack, is_current, order_index)
    if (result.rows.length === 0) return res.status(404).json({ error: 'Expérience introuvable' })
    res.json(result.rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
}

const deleteExperience = async (req, res) => {
  try {
    await portfolioModel.deleteExperience(req.params.id)
    res.json({ message: 'Expérience supprimée' })
  } catch (e) { res.status(500).json({ error: e.message }) }
}

const getAbout = async (req, res) => {
  try {
    const result = await portfolioModel.getAbout()
    res.json(result.rows[0] || {})
  } catch (e) { res.status(500).json({ error: e.message }) }
}

const updateAbout = async (req, res) => {
  try {
    const { bio, title, phone, email, age, languages } = req.body
    const result = await portfolioModel.updateAbout(bio, title, phone, email, age, languages)
    res.json(result.rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
}

const getSkills = async (req, res) => {
  try {
    const result = await portfolioModel.getPublicSkills()
    const grouped = {}
    result.rows.forEach(row => {
      if (!grouped[row.category_name]) grouped[row.category_name] = []
      grouped[row.category_name].push(row.skill_name)
    })
    res.json(grouped)
  } catch (e) { res.status(500).json({ error: e.message }) }
}

module.exports = {
  getProjects, getProjectsAdmin, createProject, updateProject, deleteProject,
  getExperiences, createExperience, updateExperience, deleteExperience,
  getAbout, updateAbout, getSkills
}
