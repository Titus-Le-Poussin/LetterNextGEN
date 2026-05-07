import { API_BASE } from './config'
export async function getPrompts(token) {

    const response = await fetch(`${API_BASE}/api/prompts/me`, {
        method: "GET",
        headers: { "Content-Type" :
            "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)  
    }
    return data

}

export async function createPrompt (token, name, content) {
    const response = await fetch(`${API_BASE}/api/prompts`, {
        method: "POST",
        headers: { "Content-Type" :
            "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({ name, content })
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)  
    }
    return data
}

export async function updatePrompt (token, id, name, content) {
    const response = await fetch(`${API_BASE}/api/prompts/${id}`, {
        method: "PUT",
        headers: { "Content-Type" :
            "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({ name, content })
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)  
    }
    return data
}

export async function deletePrompt (token, id) {
    const response = await fetch(`${API_BASE}/api/prompts/${id}`, {
        method: "DELETE",
        headers: { "Content-Type" :
            "application/json",
            "Authorization": `Bearer ${token}`
        },

    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)  
    }
    return data
}

