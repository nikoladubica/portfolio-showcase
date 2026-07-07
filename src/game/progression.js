// Pure functions over the islands list + save state — no Phaser imports, so these are
// trivially reusable (ticket 07's score validation) and testable by hand.

function bySortOrder(islands) {
    return [...islands].sort((a, b) => a.sortOrder - b.sortOrder)
}

export function currentIsland(save, islands) {
    return islands.find((island) => island.id === save.currentIslandId) ?? bySortOrder(islands)[0] ?? null
}

export function nextIsland(islands, currentIslandId) {
    const sorted = bySortOrder(islands)
    const index = sorted.findIndex((island) => island.id === currentIslandId)
    if (index === -1) return null
    return sorted[index + 1] ?? null
}

export function isRunComplete(islands, save) {
    const sorted = bySortOrder(islands)
    const last = sorted[sorted.length - 1]
    return !!last && !!save.visited[last.id]
}

export function maxPossibleScore(islands) {
    return islands.reduce(
        (sum, island) => sum + island.discoverables.reduce((s, d) => s + d.points, 0),
        0
    )
}
