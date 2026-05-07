import { API_BASE } from './config'
export async function getSkills(token) {
    const response = await fetch(`${API_BASE}/api/skills/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)
    }
    return data
}

export async function createSkill(token, skill_name, category_name) {
    const response = await fetch(`${API_BASE}/api/skills`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ skill_name, category_name })
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)
    }
    return data
}

export async function deleteSkill(token, id) {
    const response = await fetch(`${API_BASE}/api/skills/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)
    }
    return data
}
