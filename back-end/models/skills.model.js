const pool = require('../config/db')                                                                                                                                                        
                 
const create = (user_id, skill_name, category_name) => {                                                                                                                                             
    return pool.query(                                                                                                                                                                        
      'INSERT INTO skills (user_id, skill_name, category_name) VALUES ($1, $2, $3) RETURNING *',
      [user_id, skill_name, category_name]
    )
  }

const getByUser = (user_id) => {
    return pool.query(
      'SELECT * FROM skills WHERE user_id = $1',
      [user_id]
    )
  }

const getById = (id) => {
    return pool.query(
      'SELECT * FROM skills WHERE id = $1',
      [id]
    )
  }

  const getAllSkills = () => {
    return pool.query(
        'SELECT * FROM skills'
    )
  }

  const updateByID = (id, skill_name, category_name) => {
    return pool.query(
        'UPDATE skills SET skill_name = $2, category_name = $3 WHERE id = $1 RETURNING *',
        [id, skill_name, category_name]
    )
  }

  const deleteByID = (id) => {
    return pool.query(
        'DELETE FROM skills WHERE id = $1',
        [id]
    )
  }

  

module.exports = { create, getByUser, getById, getAllSkills, updateByID, deleteByID }
