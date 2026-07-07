import Phaser from "phaser"
import { gameEvents } from "../events"
import { createFog } from "../fog"
import { loadSave, updateSave, setInIsland, getFoundIds, getRunDurationSeconds } from "../save"
import { nextIsland, maxPossibleScore } from "../progression"

const START_HALO_RADIUS = 150
const ROUTE_REVEAL_RADIUS = 90
const SAIL_DURATION = 2500

export default class MapScene extends Phaser.Scene {
    constructor() {
        super("MapScene")
    }

    init(data) {
        this.islands = data?.islands ?? []
        this.result = data?.result ?? null
    }

    create() {
        gameEvents.emit("map:entered")

        const { width, height } = this.scale
        this.cameras.main.setZoom(1)
        this.cameras.main.setScroll(0, 0)

        this.addImageOrFallback(width / 2, height / 2, "parchment", width, height, 0xc9b88c).setDepth(0)

        let save = loadSave()
        const oldFogReveals = save.fog
        let animateSail = null

        if (this.result) {
            const fromIsland = this.islands.find((island) => island.id === this.result.islandId)
            const next = nextIsland(this.islands, this.result.islandId)

            if (next && fromIsland) {
                const fromX = this.toWorldX(fromIsland.mapX, width)
                const fromY = this.toWorldY(fromIsland.mapY, height)
                const toX = this.toWorldX(next.mapX, width)
                const toY = this.toWorldY(next.mapY, height)
                const curve = this.buildSailCurve(fromX, fromY, toX, toY)
                const points = curve.getPoints(24)
                const newReveals = [
                    ...points.map((p) => ({ x: p.x, y: p.y, radius: ROUTE_REVEAL_RADIUS })),
                    { x: toX, y: toY, radius: START_HALO_RADIUS }
                ]

                save = updateSave((s) => ({ ...s, currentIslandId: next.id, fog: [...s.fog, ...newReveals] }))
                animateSail = { curve, points, toX, toY }
            } else if (!next) {
                save = updateSave((s) => ({ ...s, runFinished: true }))
            }
        }

        const currentIslandId =
            animateSail || save.runFinished ? null : (save.currentIslandId ?? this.islands[0]?.id ?? null)

        this.fog = createFog(this, width, height, 1000)

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

        if (animateSail && reducedMotion) {
            // Fog + currentIslandId are already committed to save above — just re-render fresh.
            this.scene.restart({ islands: this.islands })
            return
        }

        if (animateSail) {
            this.fog.restore(oldFogReveals)
        } else if (save.fog.length > 0) {
            this.fog.restore(save.fog)
        } else {
            const current = this.islands.find((island) => island.id === currentIslandId)
            const startX = current ? this.toWorldX(current.mapX, width) : width / 2
            const startY = current ? this.toWorldY(current.mapY, height) : height / 2
            this.fog.revealAt(startX, startY, START_HALO_RADIUS)
            updateSave((s) => ({ ...s, fog: this.fog.getReveals() }))
        }

        this.addImageOrFallback(width - 90, 90, "compass-rose", 120, 120, 0xc2a35e)
            .setDepth(1100)
            .setAlpha(0.85)

        this.islands.forEach((island) => this.drawIsland(island, currentIslandId, width, height, save))

        if (animateSail) {
            this.playSailAnimation(animateSail)
        } else {
            this.setupInteraction(currentIslandId, save)
        }

        if (save.runFinished && this.result && !animateSail) {
            this.emitFinale(save)
        }
    }

    toWorldX(mapX, width) {
        return (mapX / 100) * width
    }

    toWorldY(mapY, height) {
        return (mapY / 100) * height
    }

    addImageOrFallback(x, y, key, w, h, color) {
        if (this.textures.exists(key)) {
            return this.add.image(x, y, key).setDisplaySize(w, h)
        }
        return this.add.rectangle(x, y, w, h, color)
    }

    drawIsland(island, currentIslandId, width, height, save) {
        const x = this.toWorldX(island.mapX, width)
        const y = this.toWorldY(island.mapY, height)
        const isCurrent = island.id === currentIslandId
        const visitResult = save.visited[island.id]

        const blob = this.addImageOrFallback(x, y, "island-blob", 140, 100, 0xdbcba6).setDepth(10)
        if (visitResult) blob.setTint(0xc2a35e)

        this.add
            .text(x, y + 60, visitResult ? `${island.name} ✓` : island.name, {
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "18px",
                color: "#211b12"
            })
            .setOrigin(0.5)
            .setDepth(10)

        if (!isCurrent) return

        this.addImageOrFallback(x, y - 55, "harbour-marker", 32, 32, 0xc2a35e).setDepth(11)

        const label = this.add
            .text(x, y - 90, "Explore ⚓", {
                fontFamily: "Courier Prime, monospace",
                fontSize: "14px",
                color: "#c2a35e"
            })
            .setOrigin(0.5)
            .setDepth(11)
            .setAlpha(0)

        blob.setInteractive({ useHandCursor: true })

        blob.on("pointerover", () => {
            this.tweens.add({ targets: blob, y: y - 8, duration: 150 })
            label.setAlpha(1)
        })
        blob.on("pointerout", () => {
            this.tweens.add({ targets: blob, y, duration: 150 })
            label.setAlpha(0)
        })
        blob.on("pointerup", () => this.enterIsland(island))
    }

    enterIsland(island) {
        setInIsland(island.id)
        this.scene.start("IslandScene", { island, islands: this.islands })
    }

    setupInteraction(currentIslandId, save) {
        this.input.keyboard.on("keydown-ENTER", () => {
            const currentIsland = this.islands.find((island) => island.id === currentIslandId)
            if (currentIsland) this.enterIsland(currentIsland)
        })

        const current = this.islands.find((island) => island.id === currentIslandId)
        const total = this.islands.length
        gameEvents.emit("hud:update", {
            score: save.score,
            isleLabel: current ? `Isle ${current.sortOrder} of ${total}` : `Isle — of ${total}`,
            islandName: current?.name ?? ""
        })
    }

    buildSailCurve(fromX, fromY, toX, toY) {
        const midX = (fromX + toX) / 2
        const midY = (fromY + toY) / 2
        const dx = toX - fromX
        const dy = toY - fromY
        const len = Math.hypot(dx, dy) || 1
        const bow = len * 0.2
        const controlX = midX + (-dy / len) * bow
        const controlY = midY + (dx / len) * bow

        return new Phaser.Curves.QuadraticBezier(
            new Phaser.Math.Vector2(fromX, fromY),
            new Phaser.Math.Vector2(controlX, controlY),
            new Phaser.Math.Vector2(toX, toY)
        )
    }

    playSailAnimation({ curve, points }) {
        const ship = this.addImageOrFallback(points[0].x, points[0].y, "ship", 56, 36, 0xc2a35e).setDepth(1200)
        const shipState = { t: 0 }
        let lastIdx = -1

        const arrive = () => {
            ship.destroy()
            this.scene.restart({ islands: this.islands })
        }

        const tween = this.tweens.add({
            targets: shipState,
            t: 1,
            duration: SAIL_DURATION,
            ease: "Sine.easeInOut",
            onUpdate: () => {
                const point = curve.getPoint(shipState.t)
                const tangent = curve.getTangent(shipState.t)
                ship.x = point.x
                ship.y = point.y + Math.sin(shipState.t * Math.PI * 8) * 3
                ship.rotation = Math.atan2(tangent.y, tangent.x)

                const idx = Math.min(points.length - 1, Math.floor(shipState.t * points.length))
                if (idx !== lastIdx) {
                    this.fog.revealAt(points[idx].x, points[idx].y, ROUTE_REVEAL_RADIUS)
                    lastIdx = idx
                }
            },
            onComplete: arrive
        })

        const skip = () => {
            if (!tween.isPlaying()) return
            tween.stop()
            arrive()
        }

        this.input.keyboard.once("keydown-ENTER", skip)
        this.input.once("pointerdown", skip)
    }

    emitFinale(save) {
        const breakdown = this.islands.map((island) => {
            const result = save.visited[island.id]
            return {
                name: island.name,
                found: getFoundIds(save, island.id).length,
                total: island.discoverables.length,
                pointsEarned: result?.pointsEarned ?? 0,
                completed: !!result?.completed
            }
        })

        gameEvents.emit("run:finished", {
            score: save.score,
            maxScore: maxPossibleScore(this.islands),
            durationSeconds: getRunDurationSeconds(save),
            breakdown
        })
    }
}
