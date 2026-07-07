import Phaser from "phaser"

// Placeholder — ticket 04 replaces this with the real fog-of-war world map.
export default class MapScene extends Phaser.Scene {
    constructor() {
        super("MapScene")
    }

    init(data) {
        this.islands = data?.islands ?? []
    }

    create() {
        this.cameras.main.setBackgroundColor("#c9b88c")
        this.add
            .text(this.scale.width / 2, this.scale.height / 2, `${this.islands.length} isles await…`, {
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "36px",
                color: "#211b12"
            })
            .setOrigin(0.5)
    }
}
