import Phaser from "phaser"
import { gameEvents } from "../events"
import { loadSave } from "../save"

const INTRO_SEEN_KEY = "game:introSeen"

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super("IntroScene")
    }

    init(data) {
        this.islands = data?.islands ?? []
    }

    create() {
        const { width, height } = this.scale
        this.cameras.main.setZoom(1)
        this.cameras.main.setScroll(0, 0)

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const alreadySeen = localStorage.getItem(INTRO_SEEN_KEY) === "1"

        const onSkip = () => this.finish()
        gameEvents.on("intro:skip", onSkip)
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => gameEvents.off("intro:skip", onSkip))

        this.finished = false

        if (reducedMotion) {
            this.playReducedMotionCut(width, height)
        } else if (alreadySeen) {
            this.playShortReturnCut(width, height)
        } else {
            this.playFullSequence(width, height)
        }
    }

    addImageOrFallback(x, y, key, w, h, color) {
        if (this.textures.exists(key)) {
            return this.add.image(x, y, key).setDisplaySize(w, h)
        }
        return this.add.rectangle(x, y, w, h, color)
    }

    drawIslandDots(mapX, mapY, mapW, mapH) {
        const group = this.add.group()
        for (const island of this.islands) {
            const dotX = mapX - mapW / 2 + (island.mapX / 100) * mapW
            const dotY = mapY - mapH / 2 + (island.mapY / 100) * mapH
            group.add(this.add.circle(dotX, dotY, 5, 0x211b12, 0.7))
        }
        return group
    }

    createClouds(width, height) {
        const keys = ["cloud-1", "cloud-2", "cloud-3"]
        const clouds = keys.map((key, i) => {
            const cloud = this.addImageOrFallback(
                Phaser.Math.Between(-100, width * 0.3),
                height * (0.2 + i * 0.25),
                key,
                420 + i * 60,
                200 + i * 30,
                0xf1e8d5
            )
            cloud.setAlpha(0.55)
            return cloud
        })

        clouds.forEach((cloud, i) => {
            this.tweens.add({
                targets: cloud,
                x: width + 200,
                duration: 4000 + i * 900,
                repeat: -1,
                delay: i * 300
            })
        })

        return clouds
    }

    playFullSequence(width, height) {
        const clouds = this.createClouds(width, height)

        const book = this.addImageOrFallback(width / 2, height / 2, "book-closed", 320, 420, 0x5c211b)
        book.setAlpha(0).setScale(0.9)

        this.tweens.add({
            targets: book,
            alpha: 1,
            scale: 1,
            duration: 800,
            ease: "Sine.easeOut",
            onComplete: () => {
                this.time.delayedCall(300, () => this.openBook(book, clouds, width, height))
            }
        })
    }

    openBook(book, clouds, width, height) {
        this.tweens.add({
            targets: book,
            scaleX: 0,
            duration: 600,
            ease: "Sine.easeIn",
            onComplete: () => {
                book.destroy()
                const open = this.addImageOrFallback(width / 2, height / 2, "book-open", 720, 450, 0xf1e8d5)
                open.setScale(0, 1)
                const mapW = 300
                const mapH = 420
                const mapX = width / 2 + 170
                const mapY = height / 2
                const map = this.addImageOrFallback(mapX, mapY, "map-parchment", mapW, mapH, 0xc9b88c)
                map.setAlpha(0)
                const dots = this.drawIslandDots(mapX, mapY, mapW, mapH)
                dots.setAlpha(0)

                this.tweens.add({
                    targets: open,
                    scaleX: 1,
                    duration: 600,
                    ease: "Sine.easeOut",
                    onComplete: () => {
                        map.setAlpha(1)
                        dots.setAlpha(1)
                        this.time.delayedCall(400, () => this.zoomIntoMap(clouds, mapX, mapY, mapW, mapH, width, height))
                    }
                })
            }
        })
    }

    zoomIntoMap(clouds, mapX, mapY, mapW, mapH, width, height) {
        clouds.forEach((cloud) => {
            this.tweens.add({ targets: cloud, alpha: 0, duration: 1200 })
        })

        const zoom = Math.max(width / mapW, height / mapH)

        this.tweens.add({
            targets: this.cameras.main,
            zoom,
            duration: 2000,
            ease: "Cubic.easeInOut"
        })

        this.cameras.main.pan(mapX, mapY, 2000, "Cubic.easeInOut", false, (camera, progress) => {
            if (progress === 1) this.finish()
        })
    }

    playShortReturnCut(width, height) {
        const open = this.addImageOrFallback(width / 2, height / 2, "book-open", 720, 450, 0xf1e8d5)
        open.setAlpha(0)
        this.tweens.add({
            targets: open,
            alpha: 1,
            duration: 400,
            onComplete: () => this.time.delayedCall(600, () => this.finish())
        })
    }

    playReducedMotionCut(width, height) {
        const fade = this.add.rectangle(width / 2, height / 2, width, height, 0x211b12, 1)
        this.tweens.add({
            targets: fade,
            alpha: 0,
            duration: 300,
            onComplete: () => this.finish()
        })
    }

    finish() {
        if (this.finished) return
        this.finished = true
        localStorage.setItem(INTRO_SEEN_KEY, "1")
        gameEvents.emit("intro:complete")

        const save = loadSave()
        const resumedIsland = save.inIsland && this.islands.find((island) => island.id === save.inIsland)
        if (resumedIsland) {
            this.scene.start("IslandScene", { island: resumedIsland, islands: this.islands })
            return
        }

        this.scene.start("MapScene", { islands: this.islands })
    }
}
