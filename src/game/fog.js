const FOG_COLOR = 0x0d0a06
const SOFT_STEPS = 6

// Fog-of-war over a map: a single opaque RenderTexture that only gets erased on
// reveal events (never redrawn per-frame). Call createFog once per MapScene instance.
export function createFog(scene, width, height, depth = 1000) {
    const texture = scene.add.renderTexture(0, 0, width, height).setOrigin(0, 0).setDepth(depth)
    texture.fill(FOG_COLOR, 1)

    const brush = scene.make.graphics({ x: 0, y: 0, add: false })

    const reveals = []

    function eraseSoftCircle(x, y, radius) {
        brush.clear()
        for (let i = SOFT_STEPS; i >= 1; i--) {
            const r = (radius * i) / SOFT_STEPS
            const alpha = 1 - (i - 1) / SOFT_STEPS
            brush.fillStyle(0xffffff, alpha)
            brush.fillCircle(radius, radius, r)
        }
        texture.erase(brush, x - radius, y - radius)
    }

    return {
        texture,

        revealAt(x, y, radius) {
            reveals.push({ x, y, radius })
            eraseSoftCircle(x, y, radius)
        },

        revealAlong(points, radius) {
            for (const point of points) this.revealAt(point.x, point.y, radius)
        },

        getReveals() {
            return reveals
        },

        // Replays a saved reveal list against a freshly-filled texture so a refresh
        // restores pixel-identical fog state.
        restore(savedReveals) {
            reveals.length = 0
            texture.clear()
            texture.fill(FOG_COLOR, 1)
            for (const { x, y, radius } of savedReveals) this.revealAt(x, y, radius)
        },

        destroy() {
            brush.destroy()
            texture.destroy()
        },
    }
}
