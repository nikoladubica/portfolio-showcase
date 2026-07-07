import Phaser from "phaser"
import { gameEvents } from "../events"
import { createFog } from "../fog"
import { loadSave, updateSave } from "../save"

const START_HALO_RADIUS = 150

export default class MapScene extends Phaser.Scene {
    constructor() {
        super("MapScene")
    }

    init(data) {
        this.islands = data?.islands ?? []
    }

    create() {
        const { width, height } = this.scale
        this.cameras.main.setZoom(1)
        this.cameras.main.setScroll(0, 0)

        this.addImageOrFallback(width / 2, height / 2, "parchment", width, height, 0xc9b88c).setDepth(0)

        const save = loadSave()
        const currentIslandId = save.currentIslandId ?? this.islands[0]?.id ?? null

        this.fog = createFog(this, width, height, 1000)

        const current = this.islands.find((island) => island.id === currentIslandId)
        const startX = current ? this.toWorldX(current.mapX, width) : width / 2
        const startY = current ? this.toWorldY(current.mapY, height) : height / 2

        if (save.fog.length > 0) {
            this.fog.restore(save.fog)
        } else {
            this.fog.revealAt(startX, startY, START_HALO_RADIUS)
        }

        updateSave((s) => ({ ...s, currentIslandId, fog: this.fog.getReveals() }))

        this.addImageOrFallback(width - 90, 90, "compass-rose", 120, 120, 0xc2a35e)
            .setDepth(1100)
            .setAlpha(0.85)

        this.islands.forEach((island) => this.drawIsland(island, currentIslandId, width, height))

        this.input.keyboard.on("keydown-ENTER", () => {
            const currentIsland = this.islands.find((island) => island.id === currentIslandId)
            if (currentIsland) this.enterIsland(currentIsland)
        })

        const total = this.islands.length
        gameEvents.emit("hud:update", {
            score: save.score,
            isleLabel: current ? `Isle ${current.sortOrder} of ${total}` : `Isle — of ${total}`,
            islandName: current?.name ?? ""
        })
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

    drawIsland(island, currentIslandId, width, height) {
        const x = this.toWorldX(island.mapX, width)
        const y = this.toWorldY(island.mapY, height)
        const isCurrent = island.id === currentIslandId

        const blob = this.addImageOrFallback(x, y, "island-blob", 140, 100, 0xdbcba6).setDepth(10)

        this.add
            .text(x, y + 60, island.name, {
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
        gameEvents.emit("island:enter", {
            id: island.id,
            name: island.name,
            description: island.description,
            url: island.url
        })
    }
}
