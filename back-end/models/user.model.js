const pool = require('../config/db')                                                                                                                                                        
                 
const create = (username, email, password) => {                                                                                                                                             
    return pool.query(                                                                                                                                                                        
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password]
    )
  }

const getByEmail = (email) => {
    return pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )
  }

const getById = (id) => {
    return pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )
  }

  const getAllUser = () => {
    return pool.query(
        'SELECT * FROM users'
    )
  }

  

module.exports = { create, getByEmail, getById, getAllUser }
