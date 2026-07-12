import Phaser from "phaser"

const ASSETS = [
    ["cloud-1", "/img/game/intro/cloud-1.webp"],
    ["cloud-2", "/img/game/intro/cloud-2.webp"],
    ["cloud-3", "/img/game/intro/cloud-3.webp"],
    ["parchment", "/img/game/map/parchment.webp"],
    ["island-blob", "/img/game/map/island-blob.webp"],
    ["compass-rose", "/img/game/map/compass-rose.webp"],
    ["harbour-marker", "/img/game/map/harbour-marker.webp"],
    ["ship", "/img/game/map/ship.webp"],
    ["ground", "/img/game/island/ground.webp"],
    ["rock", "/img/game/island/rock.webp"],
    ["palm", "/img/game/island/palm.webp"],
    ["ruin", "/img/game/island/ruin.webp"],
    ["discovery-marker", "/img/game/island/discovery-marker.webp"],
    ["discovery-glint", "/img/game/island/discovery-glint.webp"]
]

// Intro pieces (book faces + the world-map parchment), rasterised well above
// their display size so they stay crisp through the camera's dive into the map.
// Loaded via load.svg (vector), the rest are load.image (webp).
const INTRO_SVGS = [
    ["book-cover-front", "/img/game/intro/book-cover-front.svg", { width: 1500, height: 2000 }],
    ["book-cover-inner", "/img/game/intro/book-cover-inner.svg", { width: 1500, height: 2000 }],
    ["book-open-base", "/img/game/intro/book-open-base.svg", { width: 1500, height: 2000 }],
    ["map-parchment", "/img/game/intro/map-parchment.svg", { width: 1717, height: 2500 }]
]

const SPRITESHEETS = [["player", "/img/game/island/player.webp", { frameWidth: 32, frameHeight: 48 }]]

export default class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene")
    }

    preload() {
        const { width, height } = this.scale

        const barWidth = 360
        const barHeight = 10
        const barX = width / 2 - barWidth / 2
        const barY = height / 2 + 40

        this.add
            .text(width / 2, height / 2 - 20, "Charting the waters…", {
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "28px",
                color: "#c19a47"
            })
            .setOrigin(0.5)

        const track = this.add.rectangle(barX, barY, barWidth, barHeight, 0x3f3424).setOrigin(0, 0.5)
        const fill = this.add.rectangle(barX, barY, 0, barHeight, 0xc2a35e).setOrigin(0, 0.5)

        this.load.on("progress", (value) => {
            fill.width = barWidth * value
        })

        for (const [key, url] of ASSETS) {
            this.load.image(key, url)
        }

        for (const [key, url, size] of INTRO_SVGS) {
            this.load.svg(key, url, size)
        }

        for (const [key, url, frameConfig] of SPRITESHEETS) {
            this.load.spritesheet(key, url, frameConfig)
        }

        // Per-island map art is optional — only islands flagged `hasMapArt` (probed
        // for a real SVG in GamePage, so the dev/host 200-HTML fallback can't hang the
        // loader) are loaded here; MapScene falls back to island-blob for the rest.
        // Rasterised at 2× the 140×100 display size so hover bob/zoom stay crisp.
        const islands = this.registry.get("islands") ?? []
        for (const island of islands) {
            if (!island.hasMapArt) continue
            this.load.svg(`island-map-${island.slug}`, `/img/game/map/islands/${island.slug}.svg`, {
                width: 280,
                height: 200
            })
        }

        // Placeholder art must never dead-end the intro — a failed asset just means
        // IntroScene draws a plain rectangle in its place instead of the loaded image.
        this.load.on("loaderror", (file) => {
            console.warn(`Game asset failed to load, falling back to a plain shape: ${file.key}`)
        })

        this.load.once(Phaser.Loader.Events.COMPLETE, () => {
            track.destroy()
            fill.destroy()
        })
    }

    create() {
        this.scene.start("IntroScene", { islands: this.registry.get("islands") ?? [] })
    }
}
