const pool = require('../config/db')                                                                                                                                                        
                 
const create = (user_id, name, content) => {                                                                                                                                             
    return pool.query(                                                                                                                                                                        
      'INSERT INTO letter_templates (user_id, name, content) VALUES ($1, $2, $3) RETURNING *',
      [user_id, name, content]
    )
  }

const getByUser = (user_id) => {
    return pool.query(
      'SELECT * FROM letter_templates WHERE user_id = $1',
      [user_id]
    )
  }

const getById = (id) => {
    return pool.query(
      'SELECT * FROM letter_templates WHERE id = $1',
      [id]
    )
  }

  const getAllLetterTemplate = () => {
    return pool.query(
        'SELECT * FROM letter_templates'
    )
  }

  const updateByID = (id, name, content) => {
    return pool.query(
        'UPDATE letter_templates SET name = $2, content = $3 WHERE id = $1 RETURNING *',
        [id, name, content]
    )
  }

  const deleteByID = (id) => {
    return pool.query(
        'DELETE FROM letter_templates WHERE id = $1',
        [id]
    )
  }

  

module.exports = { create, getByUser, getById, getAllLetterTemplate, updateByID, deleteByID }
