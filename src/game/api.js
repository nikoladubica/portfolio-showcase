const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4001"

export async function fetchIslands() {
    const response = await fetch(`${API_URL}/api/game/islands`)

    if (!response.ok) {
        throw new Error(`Failed to load islands (${response.status})`)
    }

    return response.json()
}

export async function submitScore({ name, score, islandsCompleted, durationSeconds }) {
    const response = await fetch(`${API_URL}/api/game/scores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score, islandsCompleted, durationSeconds })
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        throw new Error(data.error ?? `Failed to submit score (${response.status})`)
    }

    return data
}

export async function fetchLeaderboard(limit = 10) {
    const response = await fetch(`${API_URL}/api/game/leaderboard?limit=${limit}`)

    if (!response.ok) {
        throw new Error(`Failed to load leaderboard (${response.status})`)
    }

    return response.json()
}
