const API = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const headers = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` })
})

export const getProjects = () => fetch(`${API}/api/portfolio/projects`).then(r => r.json())
export const getProjectsAdmin = (token) => fetch(`${API}/api/portfolio/projects/all`, { headers: headers(token) }).then(r => r.json())
export const createProject = (data, token) => fetch(`${API}/api/portfolio/projects`, { method: 'POST', headers: headers(token), body: JSON.stringify(data) }).then(r => r.json())
export const updateProject = (id, data, token) => fetch(`${API}/api/portfolio/projects/${id}`, { method: 'PUT', headers: headers(token), body: JSON.stringify(data) }).then(r => r.json())
export const deleteProject = (id, token) => fetch(`${API}/api/portfolio/projects/${id}`, { method: 'DELETE', headers: headers(token) }).then(r => r.json())

export const getExperiences = () => fetch(`${API}/api/portfolio/experiences`).then(r => r.json())
export const createExperience = (data, token) => fetch(`${API}/api/portfolio/experiences`, { method: 'POST', headers: headers(token), body: JSON.stringify(data) }).then(r => r.json())
export const updateExperience = (id, data, token) => fetch(`${API}/api/portfolio/experiences/${id}`, { method: 'PUT', headers: headers(token), body: JSON.stringify(data) }).then(r => r.json())
export const deleteExperience = (id, token) => fetch(`${API}/api/portfolio/experiences/${id}`, { method: 'DELETE', headers: headers(token) }).then(r => r.json())

export const getAbout = () => fetch(`${API}/api/portfolio/about`).then(r => r.json())
export const updateAbout = (data, token) => fetch(`${API}/api/portfolio/about`, { method: 'PUT', headers: headers(token), body: JSON.stringify(data) }).then(r => r.json())

export const getSkills = () => fetch(`${API}/api/portfolio/skills`).then(r => r.json())
