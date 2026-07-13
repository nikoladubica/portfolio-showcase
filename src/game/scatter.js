// Deterministic RNG (mulberry32) so the same island id always scatters its
// discoverables the same way, without depending on Phaser.
function mulberry32(seed) {
    let state = seed
    return function () {
        state |= 0
        state = (state + 0x6d2b79f5) | 0
        let t = Math.imul(state ^ (state >>> 15), 1 | state)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y)
}

// bounds: { x, y, width, height } — the walkable world-space rectangle.
// Rows with pos_x/pos_y set are placed at that exact percentage of bounds;
// rows with pos_x/pos_y = null are scattered with a minimum spacing.
export function scatterDiscoverables(discoverables, bounds, seed, minSpacing = 140, margin = 100) {
    const rng = mulberry32(seed)
    const placed = []

    const manual = discoverables.filter((d) => d.posX !== null && d.posY !== null)
    const auto = discoverables.filter((d) => d.posX === null || d.posY === null)

    for (const item of manual) {
        const point = {
            x: bounds.x + (item.posX / 100) * bounds.width,
            y: bounds.y + (item.posY / 100) * bounds.height
        }
        placed.push({ ...item, x: point.x, y: point.y })
    }

    for (const item of auto) {
        let point
        let attempts = 0
        do {
            point = {
                x: bounds.x + margin + rng() * (bounds.width - margin * 2),
                y: bounds.y + margin + rng() * (bounds.height - margin * 2)
            }
            attempts += 1
        } while (attempts < 60 && placed.some((p) => distance(p, point) < minSpacing))

        placed.push({ ...item, x: point.x, y: point.y })
    }

    return placed
}
