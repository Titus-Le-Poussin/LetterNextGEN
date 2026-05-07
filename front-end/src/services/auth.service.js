import { API_BASE } from './config'
export async function register(username, email, password) {

    const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type" :
            "application/json"
        },
        body:JSON.stringify({ username, email, password })
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)  
    }
    return data

}

export async function login (email, password) {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type" :
            "application/json"
        },
        body:JSON.stringify({ email, password })
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)  
    }
    return data
}
