const pool = require('../config/db')

const getAllProjects = () => pool.query(
  'SELECT * FROM portfolio_projects WHERE visible = TRUE ORDER BY order_index ASC, created_at DESC'
)

const getAllProjectsAdmin = () => pool.query(
  'SELECT * FROM portfolio_projects ORDER BY order_index ASC, created_at DESC'
)

const createProject = (title, short_desc, description, tech_stack, media_url, media_type, github_url, demo_url, order_index) =>
  pool.query(
    `INSERT INTO portfolio_projects (title, short_desc, description, tech_stack, media_url, media_type, github_url, demo_url, order_index)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [title, short_desc, description, JSON.stringify(tech_stack || []), media_url, media_type || 'image', github_url, demo_url, order_index || 0]
  )

const updateProject = (id, title, short_desc, description, tech_stack, media_url, media_type, github_url, demo_url, order_index, visible) =>
  pool.query(
    `UPDATE portfolio_projects
     SET title=$1, short_desc=$2, description=$3, tech_stack=$4, media_url=$5, media_type=$6,
         github_url=$7, demo_url=$8, order_index=$9, visible=$10, updated_at=NOW()
     WHERE id=$11 RETURNING *`,
    [title, short_desc, description, JSON.stringify(tech_stack || []), media_url, media_type || 'image', github_url, demo_url, order_index, visible, id]
  )

const deleteProject = (id) => pool.query('DELETE FROM portfolio_projects WHERE id = $1', [id])

const getAllExperiences = () => pool.query(
  'SELECT * FROM portfolio_experiences ORDER BY order_index ASC, created_at DESC'
)

const createExperience = (company, role, period, description, tech_stack, is_current, order_index) =>
  pool.query(
    `INSERT INTO portfolio_experiences (company, role, period, description, tech_stack, is_current, order_index)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [company, role, period, description, JSON.stringify(tech_stack || []), is_current || false, order_index || 0]
  )

const updateExperience = (id, company, role, period, description, tech_stack, is_current, order_index) =>
  pool.query(
    `UPDATE portfolio_experiences
     SET company=$1, role=$2, period=$3, description=$4, tech_stack=$5, is_current=$6, order_index=$7
     WHERE id=$8 RETURNING *`,
    [company, role, period, description, JSON.stringify(tech_stack || []), is_current, order_index, id]
  )

const deleteExperience = (id) => pool.query('DELETE FROM portfolio_experiences WHERE id = $1', [id])

const getAbout = () => pool.query('SELECT * FROM portfolio_about LIMIT 1')

const updateAbout = (bio, title, phone, email, age, languages) =>
  pool.query(
    `UPDATE portfolio_about SET bio=$1, title=$2, phone=$3, email=$4, age=$5, languages=$6, updated_at=NOW() RETURNING *`,
    [bio, title, phone, email, age, languages]
  )

const getPublicSkills = () =>
  pool.query('SELECT skill_name, category_name FROM skills WHERE user_id = 1 ORDER BY category_name, skill_name')

module.exports = {
  getAllProjects, getAllProjectsAdmin, createProject, updateProject, deleteProject,
  getAllExperiences, createExperience, updateExperience, deleteExperience,
  getAbout, updateAbout, getPublicSkills
}
