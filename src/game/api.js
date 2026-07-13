const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4001"

export async function fetchIslands() {
    const response = await fetch(`${API_URL}/api/game/islands`, { signal: AbortSignal.timeout(8000) })

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

// Per-island art is optional and added over time. A missing file must never be
// handed to Phaser's SVG loader: dev (and many static hosts) answer a missing
// asset with a 200 HTML SPA-fallback rather than a 404 — loaderror never fires,
// and SVGFile.onProcess throws on the HTML (no <svg> element), stalling the
// loader and blacking out the scene. So we probe the content-type here and only
// load real SVGs.
async function svgExists(path) {
    try {
        const response = await fetch(path, { signal: AbortSignal.timeout(8000) })
        return response.ok && (response.headers.get("content-type") ?? "").includes("svg")
    } catch {
        return false
    }
}

export function mapArtExists(slug) {
    return svgExists(`/img/game/map/islands/${slug}.svg`)
}

export function sceneArtExists(slug, layer) {
    return svgExists(`/img/game/island/scenes/${slug}-${layer}.svg`)
}

export async function fetchLeaderboard(limit = 10) {
    const response = await fetch(`${API_URL}/api/game/leaderboard?limit=${limit}`, { signal: AbortSignal.timeout(8000) })

    if (!response.ok) {
        throw new Error(`Failed to load leaderboard (${response.status})`)
    }

    return response.json()
}
