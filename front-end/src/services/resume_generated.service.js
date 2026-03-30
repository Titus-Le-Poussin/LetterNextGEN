export async function getResume_generated(token) {
    const response = await fetch("http://localhost:8080/api/resume-generated/me", {
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

export async function createResume_generated(token, name, content) {
    const response = await fetch("http://localhost:8080/api/resume-generated", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, content })
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)
    }
    return data
}

export async function updateResume_generated(token, id, name, content) {
    const response = await fetch(`http://localhost:8080/api/resume-generated/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, content })
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)
    }
    return data
}

export async function deleteResume_generated(token, id) {
    const response = await fetch(`http://localhost:8080/api/resume-generated/${id}`, {
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
