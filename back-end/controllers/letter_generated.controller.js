const letter_generatedModel = require('../models/letter_generated.model')



const createLettergenerated = async (req, res) => {
    try {
      const { company_name, job_title, job_offer, letter_content } = req.body
      const user_id = req.user.id
      const result = await 
      letter_generatedModel.create(user_id,
  company_name, job_title, job_offer, letter_content)
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }



const getLettergenerated = async (req, res) => {
    try {
      const result = await
      letter_generatedModel.getByUser(req.user.id)
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

const getLettergeneratedbyID = async (req, res) => {
    try {
      const result = await
      letter_generatedModel.getById(req.params.id)
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const getAllLettergenerated = async (req, res) => {
    try {
      const result = await
      letter_generatedModel.getAllLetterGenerated()
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const updateLettergenerated = async (req, res) => {
    try {
      const { company_name, job_title, job_offer, letter_content } = req.body
      const result = await
      letter_generatedModel.updateByID(req.params.id, company_name, job_title, job_offer, letter_content)
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }




const deleteLettergenerated = async (req, res) => {
    try {
      const result = await
      letter_generatedModel.deleteByID(req.params.id)
      if (result.rowCount === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.json({ message: 'Supprimé' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }





    
module.exports = { createLettergenerated, getLettergeneratedbyID, getLettergenerated, getAllLettergenerated, updateLettergenerated, deleteLettergenerated}