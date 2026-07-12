import Phaser from "phaser"
import { gameEvents } from "../events"
import { scatterDiscoverables } from "../scatter"
import { loadSave, getFoundIds, recordFound, markVisited, clearInIsland } from "../save"

const INTERACT_RANGE = 70
const PLAYER_SPEED = 220
const DEPTH = { GROUND: 0, MARKERS: 5, PLAYER: 10, OVERLAY: 20, PROMPTS: 30 }
const OBSTACLE_LAYOUT = [
    { rx: 0.15, ry: 0.2, key: "rock" },
    { rx: 0.8, ry: 0.15, key: "palm" },
    { rx: 0.25, ry: 0.78, key: "ruin" },
    { rx: 0.72, ry: 0.82, key: "rock" },
    { rx: 0.5, ry: 0.3, key: "palm" },
    { rx: 0.88, ry: 0.55, key: "ruin" }
]

export default class IslandScene extends Phaser.Scene {
    constructor() {
        super("IslandScene")
    }

    init(data) {
        this.island = data?.island ?? null
        this.islands = data?.islands ?? []
        this.movementEnabled = false
        this.exited = false
        this.joystick = { active: false, originX: 0, originY: 0, vector: { x: 0, y: 0 } }
    }

    preload() {
        if (!this.island) return
        const { width, height } = this.scale
        const size = { width: width * 2, height: height * 2 }

        // Lazy per-island scene art: only the island being entered is
        // rasterised; Phaser skips keys already in the texture cache, so
        // revisits within a session don't re-load. A missing -overlay.svg is
        // normal (the layer is optional) — the warn below is expected then.
        this.load.svg(`${this.island.slug}-ground`, `/img/game/island/scenes/${this.island.slug}-ground.svg`, size)
        this.load.svg(`${this.island.slug}-overlay`, `/img/game/island/scenes/${this.island.slug}-overlay.svg`, size)

        this.load.on("loaderror", (file) => {
            console.warn(`Island scene layer missing, using fallback: ${file.key}`)
        })
    }

    create() {
        const { width, height } = this.scale
        const worldW = width * 2
        const worldH = height * 2

        this.physics.world.setBounds(0, 0, worldW, worldH)
        this.cameras.main.setBounds(0, 0, worldW, worldH)
        this.cameras.main.setZoom(1)

        // With scene art the rocks/ruins are part of the drawing, so the
        // placeholder obstacles (and their collision) only exist on the
        // fallback path; blocking for art islands lands with the walkable
        // polygon in ticket 11.
        const hasSceneArt = this.textures.exists(`${this.island.slug}-ground`)

        if (hasSceneArt) {
            this.add
                .image(worldW / 2, worldH / 2, `${this.island.slug}-ground`)
                .setDisplaySize(worldW, worldH)
                .setDepth(DEPTH.GROUND)
            if (this.textures.exists(`${this.island.slug}-overlay`)) {
                this.add
                    .image(worldW / 2, worldH / 2, `${this.island.slug}-overlay`)
                    .setDisplaySize(worldW, worldH)
                    .setDepth(DEPTH.OVERLAY)
            }
        } else {
            this.addGround(worldW, worldH)
        }

        const startX = worldW / 2
        const startY = worldH / 2
        this.player = this.addPlayer(startX, startY)
        this.player.setDepth(DEPTH.PLAYER)

        if (!hasSceneArt) {
            const obstacles = this.addObstacles(worldW, worldH)
            this.physics.add.collider(this.player, obstacles)
        }

        this.cameras.main.startFollow(this.player, true, 0.12, 0.12)

        this.cursors = this.input.keyboard.createCursorKeys()
        this.keys = this.input.keyboard.addKeys("W,S,A,D")
        this.input.keyboard.on("keydown-E", () => {
            if (this.nearestMarker) this.collect(this.nearestMarker)
        })

        this.setupTouchJoystick(width)

        this.remainingMarkers = this.spawnDiscoverables(worldW, worldH)
        this.nearestMarker = null

        const onStart = () => {
            this.movementEnabled = true
        }
        const onExit = ({ skip }) => this.exitIsland(skip)
        gameEvents.on("island:start", onStart)
        gameEvents.on("island:exit", onExit)
        // Scenes emit SHUTDOWN on scene swap but DESTROY on game teardown (React unmount /
        // StrictMode) — clean up on both so listeners don't leak on the gameEvents singleton.
        const cleanup = () => {
            gameEvents.off("island:start", onStart)
            gameEvents.off("island:exit", onExit)
        }
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, cleanup)
        this.events.once(Phaser.Scenes.Events.DESTROY, cleanup)

        gameEvents.emit("island:intro", {
            name: this.island.name,
            description: this.island.description,
            url: this.island.url
        })

        this.emitProgress(loadSave())
    }

    addImageOrFallback(x, y, key, w, h, color) {
        if (this.textures.exists(key)) {
            return this.add.image(x, y, key).setDisplaySize(w, h)
        }
        return this.add.rectangle(x, y, w, h, color)
    }

    addGround(worldW, worldH) {
        if (this.textures.exists("ground")) {
            this.add.tileSprite(worldW / 2, worldH / 2, worldW, worldH, "ground")
        } else {
            this.add.rectangle(worldW / 2, worldH / 2, worldW, worldH, 0xdbcba6)
        }
    }

    addObstacles(worldW, worldH) {
        const group = this.physics.add.staticGroup()
        for (const { rx, ry, key } of OBSTACLE_LAYOUT) {
            const x = rx * worldW
            const y = ry * worldH
            const obstacle = this.addImageOrFallback(x, y, key, 70, 70, 0x574836)
            group.add(obstacle)
            obstacle.body.setSize(obstacle.displayWidth * 0.7, obstacle.displayHeight * 0.5)
        }
        return group
    }

    addPlayer(x, y) {
        let player
        if (this.textures.exists("player")) {
            player = this.physics.add.sprite(x, y, "player", 0)
        } else {
            const rect = this.add.rectangle(x, y, 24, 40, 0x211b12)
            this.physics.add.existing(rect)
            player = rect
        }
        player.setCollideWorldBounds(true)
        return player
    }

    setupTouchJoystick(width) {
        this.input.on("pointerdown", (pointer) => {
            if (pointer.x >= width / 2) return
            if (this.input.hitTestPointer(pointer).length > 0) return
            this.joystick.active = true
            this.joystick.originX = pointer.x
            this.joystick.originY = pointer.y
        })

        this.input.on("pointermove", (pointer) => {
            if (!this.joystick.active) return
            const dx = pointer.x - this.joystick.originX
            const dy = pointer.y - this.joystick.originY
            const len = Math.hypot(dx, dy) || 1
            const max = 50
            const clamp = Math.min(len, max) / max
            this.joystick.vector = { x: (dx / len) * clamp, y: (dy / len) * clamp }
        })

        this.input.on("pointerup", () => {
            this.joystick.active = false
            this.joystick.vector = { x: 0, y: 0 }
        })
    }

    spawnDiscoverables(worldW, worldH) {
        const save = loadSave()
        const found = getFoundIds(save, this.island.id)
        const remaining = this.island.discoverables.filter((d) => !found.includes(d.id))

        const bounds = { x: worldW * 0.1, y: worldH * 0.1, width: worldW * 0.8, height: worldH * 0.8 }
        const placed = scatterDiscoverables(remaining, bounds, this.island.id)

        return placed.map((discoverable) => {
            const marker = this.addImageOrFallback(discoverable.x, discoverable.y, "discovery-marker", 36, 36, 0x7c5f26)
            marker.setDepth(DEPTH.MARKERS)
            marker.discoverable = discoverable
            marker.setInteractive({ useHandCursor: true })
            marker.on("pointerup", () => this.collect(marker))

            marker.promptText = this.add
                .text(discoverable.x, discoverable.y - 30, "E / tap to dig up", {
                    fontFamily: "Courier Prime, monospace",
                    fontSize: "12px",
                    color: "#c2a35e"
                })
                .setOrigin(0.5)
                .setAlpha(0)
                .setDepth(DEPTH.PROMPTS)

            return marker
        })
    }

    updateProximity() {
        let nearest = null
        let nearestDist = Infinity

        for (const marker of this.remainingMarkers) {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, marker.x, marker.y)
            const inRange = dist <= INTERACT_RANGE
            marker.promptText.setAlpha(inRange ? 1 : 0)
            if (inRange && dist < nearestDist) {
                nearest = marker
                nearestDist = dist
            }
        }

        this.nearestMarker = nearest
    }

    collect(marker) {
        if (!this.remainingMarkers.includes(marker)) return

        const { discoverable } = marker
        marker.promptText.destroy()
        const glint = this.addImageOrFallback(marker.x, marker.y, "discovery-glint", 48, 48, 0xe2ce9c)
        glint.setDepth(DEPTH.MARKERS)
        this.tweens.add({
            targets: glint,
            scale: 1.6,
            alpha: 0,
            duration: 450,
            onComplete: () => glint.destroy()
        })
        marker.destroy()
        this.remainingMarkers = this.remainingMarkers.filter((m) => m !== marker)
        this.nearestMarker = null

        const updatedSave = recordFound(this.island.id, discoverable)
        gameEvents.emit("discovery:found", discoverable)
        this.emitProgress(updatedSave)
    }

    emitProgress(save) {
        const total = this.island.discoverables.length
        const found = getFoundIds(save, this.island.id).length
        const completed = total > 0 && found === total

        gameEvents.emit("hud:update", {
            score: save.score,
            isleLabel: `Isle ${this.island.sortOrder} of ${this.islands.length}`,
            islandName: this.island.name
        })
        gameEvents.emit("island:progress", { islandId: this.island.id, found, total, completed })
    }

    exitIsland(skip) {
        if (this.exited) return
        this.exited = true

        const save = loadSave()
        const found = getFoundIds(save, this.island.id)
        const total = this.island.discoverables.length
        const completed = total > 0 && found.length === total
        const pointsEarned = this.island.discoverables
            .filter((d) => found.includes(d.id))
            .reduce((sum, d) => sum + d.points, 0)

        markVisited(this.island.id, { completed, pointsEarned })
        clearInIsland()

        this.scene.start("MapScene", {
            islands: this.islands,
            result: { islandId: this.island.id, completed, pointsEarned, skip }
        })
    }

    update() {
        if (!this.movementEnabled) {
            this.player.body.setVelocity(0, 0)
            return
        }

        let dx = 0
        let dy = 0

        if (this.joystick.active) {
            dx = this.joystick.vector.x
            dy = this.joystick.vector.y
        } else {
            if (this.cursors.left.isDown || this.keys.A.isDown) dx -= 1
            if (this.cursors.right.isDown || this.keys.D.isDown) dx += 1
            if (this.cursors.up.isDown || this.keys.W.isDown) dy -= 1
            if (this.cursors.down.isDown || this.keys.S.isDown) dy += 1
        }

        const len = Math.hypot(dx, dy) || 1
        this.player.body.setVelocity((dx / len) * PLAYER_SPEED, (dy / len) * PLAYER_SPEED)

        this.updateProximity()
    }
}
