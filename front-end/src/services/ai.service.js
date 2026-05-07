import { API_BASE } from './config'
export async function analyzeLetter(token, job_offer, prompt_content) {

    const response = await fetch(`${API_BASE}/api/ai/analyzeLetter`, {
        method: "POST",
        headers: { "Content-Type" :
            "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({ job_offer, prompt_content })
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)  
    }
    return data

}

export async function analyzeResume (token, job_offer, prompt_content) {
    const response = await fetch(`${API_BASE}/api/ai/analyzeResume`, {
        method: "POST",
        headers: { "Content-Type" :
            "application/json",
            "Authorization": `Bearer ${token}`
        },
        body:JSON.stringify({ job_offer, prompt_content })
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)  
    }
    return data
}

