const resume_templateModel = require('../models/resume_template.model')



const createResumeTemplate = async (req, res) => {
    try {
      const { name, content } = req.body
      const user_id = req.user.id
      const result = await 
      resume_templateModel.create(user_id,
  name, content)
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }



const getResumeTemplate = async (req, res) => {
    try {
      const result = await
      resume_templateModel.getByUser(req.user.id)
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const getAllResumeTemplate = async (req, res) => {
    try {
      const result = await
      resume_templateModel.getAllResumeTemplate()
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const updateResumeTemplate = async (req, res) => {
    try {
      const { name, content } = req.body
      const result = await 
      resume_templateModel.updateByID(req.params.id, name, content)
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }




const deleteResumeTemplate = async (req, res) => {
    try {
      const result = await
      resume_templateModel.deleteByID(req.params.id)
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }





    
module.exports = { createResumeTemplate, getResumeTemplate, getAllResumeTemplate, updateResumeTemplate, deleteResumeTemplate}