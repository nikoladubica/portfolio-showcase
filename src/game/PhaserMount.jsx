import { useEffect, useRef } from "react"
import Phaser from "phaser"
import BootScene from "./scenes/BootScene"
import IntroScene from "./scenes/IntroScene"
import MapScene from "./scenes/MapScene"
import IslandScene from "./scenes/IslandScene"

const PhaserMount = ({ islands }) => {
    const containerRef = useRef(null)

    useEffect(() => {
        const game = new Phaser.Game({
            type: Phaser.CANVAS,
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
            scene: [BootScene, IntroScene, MapScene, IslandScene]
        })

        game.registry.set("islands", islands)

        // Canvas can go blank after a tab switch/resize; refresh the scale manager
        // when the document returns to the foreground to re-fit and repaint.
        const onVisibility = () => {
            if (!document.hidden) game.scale.refresh()
        }
        document.addEventListener("visibilitychange", onVisibility)

        return () => {
            document.removeEventListener("visibilitychange", onVisibility)
            game.destroy(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- islands are seeded once at mount via the registry, not reactively
    }, [])

    return <div ref={containerRef} className="game-canvas-mount w-full h-full" />
}

export default PhaserMount
