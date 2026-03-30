export async function analyzeLetter(token, job_offer, prompt_content) {

    const response = await fetch("http://localhost:8080/api/ai/analyzeLetter", {
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
    const response = await fetch("http://localhost:8080/api/ai/analyzeResume", {
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

