const SkillsModel = require('../models/skills.model')



const createSkills = async (req, res) => {
    try {
      const { skill_name, category_name } = req.body
      const user_id = req.user.id
      const result = await 
      SkillsModel.create(user_id,
  skill_name, category_name)
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }



const getSkills = async (req, res) => {
    try {
      const result = await
      SkillsModel.getByUser(req.user.id)
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

const getByCategory = async (req, res) => {
    try {
      const result = await
      SkillsModel.getByCategory(req.params.category_name)
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const getAllSkills = async (req, res) => {
    try {
      const result = await
      SkillsModel.getAllSkills()
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }




const updateSkills = async (req, res) => {
    try {
      const { skill_name, category_name } = req.body
      const result = await 
      SkillsModel.updateByID(req.params.id, skill_name, category_name)
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }




const deleteSkills = async (req, res) => {
    try {
      const result = await
      SkillsModel.deleteByID(req.params.id)
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }





    
module.exports = { createSkills, getSkills, getByCategory, getAllSkills, updateSkills, deleteSkills}