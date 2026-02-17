const pool = require('../config/db')                                                                                                                                                        
                 
const create = (user_id, company_name, job_title, job_offer, letter_content) => {                                                                                                                                             
    return pool.query(                                                                                                                                                                        
      'INSERT INTO generated_letters (user_id, company_name, job_title, job_offer, letter_content) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, company_name, job_title, job_offer, letter_content]
    )
  }

const getByUser = (user_id) => {
    return pool.query(
      'SELECT * FROM generated_letters WHERE user_id = $1',
      [user_id]
    )
  }

const getById = (id) => {
    return pool.query(
      'SELECT * FROM generated_letters WHERE id = $1',
      [id]
    )
  }

  const getAllLetterGenerated = () => {
    return pool.query(
        'SELECT * FROM generated_letters'
    )
  }

  const updateByID = (id, company_name, job_title, job_offer, letter_content) => {
    return pool.query(
        'UPDATE generated_letters SET company_name = $2, job_title = $3, job_offer = $4, letter_content = $5 WHERE id = $1 RETURNING *',
        [id, company_name, job_title, job_offer, letter_content]
    )
  }

  const deleteByID = (id) => {
    return pool.query(
        'DELETE FROM generated_letters WHERE id = $1',
        [id]
    )
  }

  

module.exports = { create, getByUser, getById, getAllLetterGenerated, updateByID, deleteByID }
