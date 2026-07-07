import Phaser from "phaser"
import { gameEvents } from "../events"

// Placeholder for ticket 02 — becomes a real preloader with a progress bar in ticket 03.
export default class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene")
    }

    create() {
        this.cameras.main.setBackgroundColor("#1a1410")

        this.add
            .text(this.scale.width / 2, this.scale.height / 2, "The game begins here…", {
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "42px",
                color: "#c19a47"
            })
            .setOrigin(0.5)

        gameEvents.emit("game:ready", { islands: this.registry.get("islands") ?? [] })
    }
}
