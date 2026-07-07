import { useEffect, useState } from "react"
import PhaserMount from "./PhaserMount"
import { fetchIslands } from "./api"
import { gameEvents } from "./events"

const GamePage = () => {
    const [status, setStatus] = useState("loading")
    const [islands, setIslands] = useState([])

    const load = () => {
        fetchIslands()
            .then((data) => {
                setIslands(data)
                setStatus("ready")
            })
            .catch(() => setStatus("error"))
    }

    useEffect(load, [])

    const retry = () => {
        setStatus("loading")
        load()
    }

    useEffect(() => {
        const onReady = () => console.log("game:ready")
        gameEvents.on("game:ready", onReady)
        return () => gameEvents.off("game:ready", onReady)
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-ink-900 text-paper-100">
            <header className="flex items-center justify-between px-6 h-[68px] border-b border-rule-strong">
                <a className="flex items-center gap-3 no-underline" href="/">
                    <img className="w-[34px] h-[34px] object-contain" src="/android-chrome-512x512.png" alt="N. Čučuković logo" width={34} height={34} />
                    <span className="font-display text-[20px] text-paper-50">N. Čučuković</span>
                </a>
                <div className="flex items-center gap-4">
                    {status === "ready" && (
                        <span className="font-mono text-xs uppercase tracking-caps text-brass-400">
                            {islands.length} isles charted
                        </span>
                    )}
                    <a className="font-mono text-xs uppercase tracking-caps text-paper-200 no-underline hover:text-brass-400" href="/">
                        ← Back to the Broadsheet
                    </a>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-4">
                {status === "loading" && (
                    <p className="font-display italic text-xl text-paper-200">Charting the waters…</p>
                )}

                {status === "error" && (
                    <div className="text-center max-w-[50ch]">
                        <p className="font-display italic text-xl text-paper-200 mb-4">
                            The charts are unreadable — the game server can&rsquo;t be reached.
                        </p>
                        <div className="flex gap-3 justify-center flex-wrap">
                            <button type="button" className="btn btn--outline" onClick={retry}>
                                Try Again
                            </button>
                            <a className="btn btn--outline" href="/">
                                Back to the Broadsheet
                            </a>
                        </div>
                    </div>
                )}

                {status === "ready" && (
                    <div className="w-full max-w-[1280px] aspect-video border border-brass-400 shadow-[var(--shadow-gilt-frame)]">
                        <PhaserMount islands={islands} />
                    </div>
                )}
            </main>
        </div>
    )
}

export default GamePage
