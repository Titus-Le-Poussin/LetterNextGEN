import { API_BASE } from './config'
async function apiFetch(endpoint, options) {
  const url = `${API_BASE}/api/prompts/me`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}