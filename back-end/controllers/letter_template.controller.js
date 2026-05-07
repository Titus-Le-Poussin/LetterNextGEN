const letter_templateModel = require('../models/letter_template.model')



const createLetterTemplate = async (req, res) => {
    try {
      const { name, content } = req.body
      const user_id = req.user.id
      const result = await 
      letter_templateModel.create(user_id,
  name, content)
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }



const getLetterTemplate = async (req, res) => {
    try {
      const result = await
      letter_templateModel.getByUser(req.user.id)
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

const getByIDLetterTemplate = async (req, res) => {
    try {
      const result = await
      letter_templateModel.getById(req.params.id)
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const getAllLetterTemplate = async (req, res) => {
    try {
      const result = await
      letter_templateModel.getAllLetterTemplate()
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const updateLetterTemplate = async (req, res) => {
    try {
      const { name, content } = req.body
      const result = await
      letter_templateModel.updateByID(req.params.id, name, content)
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }




const deleteLetterTemplate = async (req, res) => {
    try {
      const result = await
      letter_templateModel.deleteByID(req.params.id)
      if (result.rowCount === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.json({ message: 'Supprimé' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }





    
module.exports = { createLetterTemplate, getLetterTemplate, getByIDLetterTemplate, getAllLetterTemplate, updateLetterTemplate, deleteLetterTemplate}