import Phaser from "phaser"

const ASSETS = [
    ["book-closed", "/img/game/intro/book-closed.webp"],
    ["book-open", "/img/game/intro/book-open.webp"],
    ["map-parchment", "/img/game/intro/map-parchment.webp"],
    ["cloud-1", "/img/game/intro/cloud-1.webp"],
    ["cloud-2", "/img/game/intro/cloud-2.webp"],
    ["cloud-3", "/img/game/intro/cloud-3.webp"],
    ["parchment", "/img/game/map/parchment.webp"],
    ["island-blob", "/img/game/map/island-blob.webp"],
    ["compass-rose", "/img/game/map/compass-rose.webp"],
    ["harbour-marker", "/img/game/map/harbour-marker.webp"]
]

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
