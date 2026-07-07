const SAVE_KEY = "game:save"
const SAVE_VERSION = 1

function defaultSave() {
    return {
        version: SAVE_VERSION,
        currentIslandId: null,
        fog: [], // [{ x, y, radius }] reveal calls, in native map coords (0-1280 x 0-720)
        found: {}, // { [islandId]: [discoverableId, ...] }
        score: 0,
        runStartedAt: Date.now(),
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
