const userModel = require('../models/user.model')
  const bcrypt = require('bcrypt')                     
  const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
      const { username, email, password } = req.body
      const hashedPassword = await
  bcrypt.hash(password, 10)
      const result = await userModel.create(username,
  email, hashedPassword)
      res.status(201).json(result.rows[0])  
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

const login = async (req, res) => {
    try {
      const { email, password } = req.body
      const result = await userModel.getByEmail(email)

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Email incorrect' })
      }

      const user = result.rows[0]
      const validPassword = await
  bcrypt.compare(password, user.password)

      if (!validPassword) {
        return res.status(401).json({ error: 'Mot de passe incorrect' })
      }

      const token = jwt.sign({ id: user.id },
  process.env.JWT_SECRET, { expiresIn: '24h' })
      res.json({ token })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

const me = async (req, res) => {
    try {
      const result = await
  userModel.getById(req.user.id)
      res.json(result.rows[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

    
module.exports = { register, login, me}