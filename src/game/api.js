const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000"

export async function fetchIslands() {
    const response = await fetch(`${API_URL}/api/game/islands`)

    if (!response.ok) {
        throw new Error(`Failed to load islands (${response.status})`)
    }

    return response.json()
}
