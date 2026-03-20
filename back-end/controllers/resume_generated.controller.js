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
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

const getresumegeneratedbyID = async (req, res) => {
    try {
      const result = await
      resume_GeneratedModel.getById(req.params.id)
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
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
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }




const deleteResumeGenerated = async (req, res) => {
    try {
      const result = await
      resume_GeneratedModel.deleteByID(req.params.id)
      if (result.rowCount === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.json({ message: 'Supprimé' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }





    
module.exports = { createResumeGenerated, getresumegeneratedbyID, getResumeGenerated, getAllResumeGenerated, updateResumeGenerated, deleteResumeGenerated}