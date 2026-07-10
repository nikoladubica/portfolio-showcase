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

        // Reduced-motion users get an instant cut, no gate. Everyone else waits for the
        // "Start Animation" button in the page chrome before the sequence plays — we
        // register the listener first, then announce readiness, so a click can't be missed.
        if (reducedMotion) {
            this.playReducedMotionCut(width, height)
            return
        }

        const begin = () => {
            if (alreadySeen) {
                // this.playShortReturnCut(width, height)
                this.playFullSequence(width, height)
            } else {
                this.playFullSequence(width, height)
            }
        }
        gameEvents.once("intro:start", begin)
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => gameEvents.off("intro:start", begin))
        gameEvents.emit("intro:await-start")
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

        // Size the book to the screen so it always fits, then hinge it on its spine
        // (left edge) rather than its centre. The closed cover is centred on screen.
        const pageH = Math.min(height * 0.74, 500)
        const pageW = pageH * 0.72
        const cy = height / 2
        const spineX = width / 2
        const hingeX = spineX - pageW / 2

        const book = this.addImageOrFallback(hingeX, cy, "book-cover-front", pageW, pageH, 0x5c211b)
        book.setOrigin(0, 0.5)
        // Tween relative to the display scale — never override it with setScale(1),
        // which would snap the image back to its full intrinsic pixel size.
        const coverScaleX = book.scaleX
        const coverScaleY = book.scaleY
        book.setAlpha(0).setScale(coverScaleX * 0.94, coverScaleY * 0.94)

        this.tweens.add({
            targets: book,
            alpha: 1,
            scaleX: coverScaleX,
            scaleY: coverScaleY,
            duration: 1700,
            ease: "Sine.easeOut",
            onComplete: () => {
                this.time.delayedCall(1300, () =>
                    this.openBook(book, clouds, spineX, cy, pageW, pageH, width, height)
                )
            }
        })
    }

    openBook(book, clouds, spineX, cy, pageW, pageH, width, height) {
        const hingeX = spineX - pageW / 2

        // The right-hand page, revealed as the cover lifts off it. The left page is
        // formed by the cover's inner face landing on it (below). Under both faces.
        const base = this.addImageOrFallback(spineX, cy, "book-open-base", pageW, pageH, 0xf1e8d5)
        base.setDepth(0)

        // The cover's inner face — hinged on the spine's right edge, edge-on to start,
        // it swings down onto the left page as the outer face finishes lifting. The two
        // faces together read as one rigid cover rotating from right to left.
        const inner = this.addImageOrFallback(hingeX, cy, "book-cover-inner", pageW, pageH, 0x6b2b22)
        inner.setOrigin(1, 0.5).setDepth(1)
        const innerScaleX = inner.scaleX
        inner.setScale(0, inner.scaleY)

        book.setDepth(1)

        // Phase 1 (0°→90°) — outer cover lifts off the right page and foreshortens
        // into the spine. Sine.easeIn mimics the cosine of a rigid rotation.
        this.tweens.add({
            targets: book,
            scaleX: 0,
            duration: 900,
            ease: "Sine.easeIn",
            onComplete: () => {
                book.destroy()

                // Phase 2 (90°→180°) — inner face rotates down onto the left page.
                this.tweens.add({
                    targets: inner,
                    scaleX: innerScaleX,
                    duration: 900,
                    ease: "Sine.easeOut",
                    onComplete: () => {
                        const mapW = pageW * 0.82
                        const mapH = pageH * 0.86
                        const map = this.addImageOrFallback(spineX, cy, "map-parchment", mapW, mapH, 0xc9b88c)
                        map.setAlpha(0)
                        const dots = this.drawIslandDots(spineX, cy, mapW, mapH)
                        dots.setAlpha(0)

                        this.tweens.add({
                            targets: [map, ...dots.getChildren()],
                            alpha: 1,
                            duration: 700,
                            onComplete: () =>
                                this.time.delayedCall(900, () =>
                                    this.zoomIntoMap(clouds, spineX, cy, mapW, mapH, width, height)
                                )
                        })
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
        const pageH = Math.min(height * 0.74, 500)
        const pageW = pageH * 0.72
        const cy = height / 2
        const spineX = width / 2
        const hingeX = spineX - pageW / 2

        // Already open — the inner cover as the left page, the base as the right page.
        const left = this.addImageOrFallback(hingeX, cy, "book-cover-inner", pageW, pageH, 0x6b2b22)
        left.setOrigin(1, 0.5).setAlpha(0)
        const right = this.addImageOrFallback(spineX, cy, "book-open-base", pageW, pageH, 0xf1e8d5)
        right.setAlpha(0)

        this.tweens.add({
            targets: [left, right],
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
