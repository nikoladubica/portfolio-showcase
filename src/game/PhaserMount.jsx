import { useEffect, useRef } from "react"
import Phaser from "phaser"
import BootScene from "./scenes/BootScene"

const PhaserMount = ({ islands }) => {
    const containerRef = useRef(null)
    const gameRef = useRef(null)

    useEffect(() => {
        const game = new Phaser.Game({
            type: Phaser.AUTO,
            parent: containerRef.current,
            width: 1280,
            height: 720,
            backgroundColor: "#1a1410",
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            physics: {
                default: "arcade",
                arcade: { debug: false }
            },
            scene: [BootScene]
        })

        game.registry.set("islands", islands)
        gameRef.current = game

        return () => {
            game.destroy(true)
            gameRef.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- islands are seeded once at mount via the registry, not reactively
    }, [])

    return <div ref={containerRef} className="game-canvas-mount w-full h-full" />
}

export default PhaserMount
