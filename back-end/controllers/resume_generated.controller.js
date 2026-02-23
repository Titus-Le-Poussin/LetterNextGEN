const resume_GeneratedModel = require('../models/resume_generated.model')



const createResumeGenerated = async (req, res) => {
    try {
      const { company_name, job_title, job_offer, skills } = req.body
      const user_id = req.user.id
      const result = await
      resume_GeneratedModel.create(user_id,
  company_name, job_title, job_offer, skills)
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }



const getResumeGenerated = async (req, res) => {
    try {
      const result = await
      resume_GeneratedModel.getByUser(req.user.id)
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const getAllResumeGenerated = async (req, res) => {
    try {
      const result = await
      resume_GeneratedModel.getAllResumeGenerated()
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const updateResumeGenerated = async (req, res) => {
    try {
      const { company_name, job_title, job_offer, skills } = req.body
      const result = await 
      resume_GeneratedModel.updateByID(req.params.id, company_name, job_title, job_offer, skills)
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }




const deleteResumeGenerated = async (req, res) => {
    try {
      const result = await
      resume_GeneratedModel
      .deleteByID(req.params.id)
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }





    
module.exports = { createResumeGenerated, getResumeGenerated, getAllResumeGenerated, updateResumeGenerated, deleteResumeGenerated}