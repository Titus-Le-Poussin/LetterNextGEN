const promptModel = require('../models/prompt.model')



const createPrompt = async (req, res) => {
    try {
      const { name, content } = req.body
      const user_id = req.user.id
      const result = await 
      promptModel.create(user_id,
  name, content)
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }



const getPromptByUser = async (req, res) => {
    try {
      const result = await
      promptModel.getByUser(req.user.id)
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

const getPromptByID = async (req, res) => {
    try {
      const result = await
      promptModel.getById(req.params.id)
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const getAllPrompts = async (req, res) => {
    try {
      const result = await
      promptModel.getAllPrompt()
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const updatePrompt = async (req, res) => {
    try {
      const { name, content } = req.body
      const result = await
      promptModel.updateByID(req.params.id, name, content)
      if (result.rows.length === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }




const deletePrompt = async (req, res) => {
    try {
      const result = await
      promptModel.deleteByID(req.params.id)
      if (result.rowCount === 0) return res.status(404).json({ error: 'Non trouvé' })
      res.json({ message: 'Supprimé' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }





    
module.exports = { createPrompt, getPromptByUser, getPromptByID, getAllPrompts, updatePrompt, deletePrompt}