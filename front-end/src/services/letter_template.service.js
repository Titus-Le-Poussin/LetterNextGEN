import { API_BASE } from './config'
export async function getLetter_template(token) {

    const response = await fetch(`${API_BASE}/api/letter-template/me`, {
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

export async function createLetter_template (token, name, content) {
    const response = await fetch(`${API_BASE}/api/letter-template`, {
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

export async function updateLetter_template (token, id, name, content) {
    const response = await fetch(`${API_BASE}/api/letter-template/${id}`, {
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

export async function deleteLetter_template (token, id) {
    const response = await fetch(`${API_BASE}/api/letter-template/${id}`, {
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

