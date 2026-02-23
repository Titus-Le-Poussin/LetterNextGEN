const pool = require('../config/db')                                                                                                                                                        
                 
const create = (user_id, company_name, job_title, job_offer, skills) => {                                                                                                                                             
    return pool.query(                                                                                                                                                                        
      'INSERT INTO generated_resume (user_id, company_name, job_title, job_offer, skills) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, company_name, job_title, job_offer, skills]
    )
  }

const getByUser = (user_id) => {
    return pool.query(
      'SELECT * FROM generated_resume WHERE user_id = $1',
      [user_id]
    )
  }

const getById = (id) => {
    return pool.query(
      'SELECT * FROM generated_resume WHERE id = $1',
      [id]
    )
  }

  const getAllResumeGenerated = () => {
    return pool.query(
        'SELECT * FROM generated_resume'
    )
  }

  const updateByID = (id, company_name, job_title, job_offer, skills) => {
    return pool.query(
        'UPDATE generated_resume SET company_name = $2, job_title = $3, job_offer = $4, skills = $5 WHERE id = $1 RETURNING *',
        [id, company_name, job_title, job_offer, skills]
    )
  }

  const deleteByID = (id) => {
    return pool.query(
        'DELETE FROM generated_resume WHERE id = $1',
        [id]
    )
  }

  

module.exports = { create, getByUser, getById, getAllResumeGenerated, updateByID, deleteByID }
