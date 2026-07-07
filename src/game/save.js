const SAVE_KEY = "game:save"
const SAVE_VERSION = 1

function defaultSave() {
    return {
        version: SAVE_VERSION,
        currentIslandId: null,
        fog: [], // [{ x, y, radius }] reveal calls, in native map coords (0-1280 x 0-720)
        found: {}, // { [islandId]: [discoverableId, ...] }
        visited: {}, // { [islandId]: { completed, pointsEarned } }
        inIsland: null, // islandId of an in-progress exploration, so a refresh resumes on the island
        score: 0,
        runStartedAt: Date.now(),
        runFinished: false,
        scoreSubmitted: false,
        pausedMs: 0, // time accumulated while the tab was hidden, excluded from run duration
    }
}

export function loadSave() {
    try {
        const raw = localStorage.getItem(SAVE_KEY)
        if (!raw) return defaultSave()

        const parsed = JSON.parse(raw)
        if (parsed.version !== SAVE_VERSION) return defaultSave()

        return { ...defaultSave(), ...parsed }
    } catch {
        return defaultSave()
    }
}

export function writeSave(save) {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save))
}

export function updateSave(mutator) {
    const next = mutator(loadSave())
    writeSave(next)
    return next
}

export function clearSave() {
    localStorage.removeItem(SAVE_KEY)
}

export function getFoundIds(save, islandId) {
    return save.found[islandId] ?? []
}

// Records a discoverable as found (idempotent) and adds its points to the score.
// Returns the updated save.
export function recordFound(islandId, discoverable) {
    return updateSave((save) => {
        const foundForIsland = getFoundIds(save, islandId)
        if (foundForIsland.includes(discoverable.id)) return save

        return {
            ...save,
            score: save.score + discoverable.points,
            found: { ...save.found, [islandId]: [...foundForIsland, discoverable.id] }
        }
    })
}

export function markVisited(islandId, result) {
    return updateSave((save) => ({ ...save, visited: { ...save.visited, [islandId]: result } }))
}

export function setInIsland(islandId) {
    return updateSave((save) => ({ ...save, inIsland: islandId }))
}

export function clearInIsland() {
    return updateSave((save) => ({ ...save, inIsland: null }))
}

export function markScoreSubmitted() {
    return updateSave((save) => ({ ...save, scoreSubmitted: true }))
}

const LAST_NAME_KEY = "game:lastPlayerName"

// Kept outside the versioned save blob (its own key) so it survives clearSave()/"Explore Again".
export function getLastPlayerName() {
    return localStorage.getItem(LAST_NAME_KEY) ?? ""
}

export function setLastPlayerName(name) {
    localStorage.setItem(LAST_NAME_KEY, name)
}

// Run duration is wall-clock (runStartedAt) minus time spent with the tab hidden, so
// leaving the game in a background tab doesn't inflate the score-plausibility duration.
export function getRunDurationSeconds(save) {
    const elapsed = Date.now() - save.runStartedAt - (save.pausedMs ?? 0)
    return Math.max(0, Math.round(elapsed / 1000))
}

let hiddenSince = null

if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            hiddenSince = Date.now()
        } else if (hiddenSince !== null) {
            const hiddenMs = Date.now() - hiddenSince
            hiddenSince = null
            updateSave((save) => ({ ...save, pausedMs: (save.pausedMs ?? 0) + hiddenMs }))
        }
    })
}
