import { useEffect, useState } from "react"
import PhaserMount from "./PhaserMount"
import { fetchIslands } from "./api"
import { clearSave } from "./save"
import { gameEvents } from "./events"
import DiscoveryCard from "./ui/DiscoveryCard"
import FinaleCard from "./ui/FinaleCard"
import Leaderboard from "./ui/Leaderboard"

const GamePage = () => {
    const [status, setStatus] = useState("loading")
    const [islands, setIslands] = useState([])
    const [introActive, setIntroActive] = useState(true)
    const [hud, setHud] = useState(null)
    const [activeIsland, setActiveIsland] = useState(null)
    const [islandProgress, setIslandProgress] = useState(null)
    const [showSkipConfirm, setShowSkipConfirm] = useState(false)
    const [discovery, setDiscovery] = useState(null)
    const [celebrate, setCelebrate] = useState(false)
    const [finaleSummary, setFinaleSummary] = useState(null)
    const [showLedger, setShowLedger] = useState(false)
    const [showRestartConfirm, setShowRestartConfirm] = useState(false)

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
        const onIntroComplete = () => setIntroActive(false)
        const onHudUpdate = (payload) => setHud((prev) => ({ ...prev, ...payload }))
        const onIslandIntro = (island) => setActiveIsland(island)
        const onIslandProgress = (payload) => {
            setIslandProgress((prev) => {
                if (payload.completed && !prev?.completed) setCelebrate(true)
                return payload
            })
        }
        const onMapEntered = () => setIslandProgress(null)
        const onDiscoveryFound = (payload) => setDiscovery(payload)
        const onRunFinished = (summary) => setFinaleSummary(summary)

        gameEvents.on("game:ready", onReady)
        gameEvents.on("intro:complete", onIntroComplete)
        gameEvents.on("hud:update", onHudUpdate)
        gameEvents.on("island:intro", onIslandIntro)
        gameEvents.on("island:progress", onIslandProgress)
        gameEvents.on("map:entered", onMapEntered)
        gameEvents.on("discovery:found", onDiscoveryFound)
        gameEvents.on("run:finished", onRunFinished)

        return () => {
            gameEvents.off("game:ready", onReady)
            gameEvents.off("intro:complete", onIntroComplete)
            gameEvents.off("hud:update", onHudUpdate)
            gameEvents.off("island:intro", onIslandIntro)
            gameEvents.off("island:progress", onIslandProgress)
            gameEvents.off("map:entered", onMapEntered)
            gameEvents.off("discovery:found", onDiscoveryFound)
            gameEvents.off("run:finished", onRunFinished)
        }
    }, [])

    useEffect(() => {
        if (!celebrate) return undefined
        const timer = setTimeout(() => setCelebrate(false), 3000)
        return () => clearTimeout(timer)
    }, [celebrate])

    const skipIntro = () => gameEvents.emit("intro:skip")

    // Wipes the run and reloads so the game boots fresh from a default save.
    const startOver = () => {
        clearSave()
        window.location.reload()
    }

    const startWalking = () => {
        setActiveIsland(null)
        gameEvents.emit("island:start")
    }

    const requestExit = () => {
        if (islandProgress?.completed) {
            gameEvents.emit("island:exit", { skip: false })
            setIslandProgress(null)
            return
        }
        setShowSkipConfirm(true)
    }

    const confirmSkip = () => {
        setShowSkipConfirm(false)
        gameEvents.emit("island:exit", { skip: true })
        setIslandProgress(null)
    }

    // Esc closes whichever dialog is on top; FinaleCard has no close by design (the run is over).
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key !== "Escape") return
            if (showRestartConfirm) setShowRestartConfirm(false)
            else if (showSkipConfirm) setShowSkipConfirm(false)
            else if (showLedger) setShowLedger(false)
            else if (activeIsland) startWalking()
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [showRestartConfirm, showSkipConfirm, showLedger, activeIsland])

    return (
        <div className="min-h-screen flex flex-col bg-ink-900 text-paper-100">
            <header className="flex items-center justify-between px-6 h-[68px] border-b border-rule-strong">
                <a className="flex items-center gap-3 no-underline" href="/">
                    <img className="w-[34px] h-[34px] object-contain" src="/android-chrome-512x512.png" alt="N. Čučuković logo" width={34} height={34} />
                    <span className="font-display text-[20px] text-paper-50">N. Čučuković</span>
                </a>
                <div className="flex items-center gap-4">
                    {status === "ready" && hud && (
                        <span className="font-mono text-xs uppercase tracking-caps text-brass-400">
                            {hud.score} pts{hud.isleLabel ? ` · ${hud.isleLabel}` : ""}
                            {hud.islandName ? ` · ${hud.islandName}` : ""}
                        </span>
                    )}
                    {status === "ready" && !hud && (
                        <span className="font-mono text-xs uppercase tracking-caps text-brass-400">
                            {islands.length} isles charted
                        </span>
                    )}
                    {status === "ready" && (
                        <button
                            type="button"
                            className="font-mono text-xs uppercase tracking-caps text-paper-200 bg-transparent border-none cursor-pointer hover:text-brass-400"
                            onClick={() => setShowLedger(true)}
                        >
                            The Ledger
                        </button>
                    )}
                    {status === "ready" && (
                        <button
                            type="button"
                            className="font-mono text-xs uppercase tracking-caps text-paper-200 bg-transparent border-none cursor-pointer hover:text-brass-400"
                            onClick={() => setShowRestartConfirm(true)}
                        >
                            Start Over
                        </button>
                    )}
                    <a className="font-mono text-xs uppercase tracking-caps text-paper-200 no-underline hover:text-brass-400" href="/">
                        ← Back to the Broadsheet
                    </a>
                </div>
            </header>

            <p className="text-center font-display italic text-sm text-paper-300 py-2 px-4">
                Prefer reading to sailing?{" "}
                <a className="text-brass-400 hover:text-brass-200" href="/#works">
                    See the projects directly
                </a>
                .
            </p>

            <div className="hidden max-[640px]:portrait:flex items-center justify-center gap-2 mx-4 mb-2 px-4 py-2 border border-brass-400 bg-[rgba(13,10,7,0.6)]">
                <span className="font-mono text-xs uppercase tracking-caps text-brass-400 text-center">
                    ⟲ Rotate your device for the best experience
                </span>
            </div>

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
                    <div className="relative w-full max-w-[1280px] aspect-video border border-brass-400 shadow-[var(--shadow-gilt-frame)]">
                        <PhaserMount islands={islands} />

                        {introActive && (
                            <button
                                type="button"
                                className="btn btn--outline btn--sm absolute top-3 right-3 z-10"
                                onClick={skipIntro}
                            >
                                Skip ⇢
                            </button>
                        )}

                        {islandProgress && (
                            <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-3 bg-[rgba(13,10,7,0.78)] border border-brass-400 px-4 py-2 flex-wrap">
                                <span className="font-mono text-xs uppercase tracking-caps text-brass-400">
                                    Found {islandProgress.found} / {islandProgress.total}
                                </span>
                                <button type="button" className="btn btn--outline btn--sm" onClick={requestExit}>
                                    {islandProgress.completed ? "Embark ⚓" : "Set Sail ⇢"}
                                </button>
                            </div>
                        )}

                        {celebrate && (
                            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 bg-[rgba(13,10,7,0.85)] border border-brass-400 px-5 py-3">
                                <p className="font-display text-lg text-brass-200 whitespace-nowrap">
                                    Isle fully charted! +{islandProgress?.total ?? 0} discoveries
                                </p>
                            </div>
                        )}

                        <DiscoveryCard discovery={discovery} onDismiss={() => setDiscovery(null)} />
                    </div>
                )}
            </main>

            {activeIsland && (
                <div className="fixed inset-0 z-20 flex items-center justify-center bg-[rgba(13,10,7,0.72)] p-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={activeIsland.name}
                        className="max-w-[50ch] w-full bg-ink-800 border border-brass-400 shadow-[var(--shadow-gilt-frame)] p-6 max-h-[90vh] overflow-y-auto"
                    >
                        <p className="font-mono text-xs uppercase tracking-caps text-brass-400 mb-2">
                            {activeIsland.name}
                        </p>
                        <p className="font-display text-lg text-paper-100 mb-4">{activeIsland.description}</p>
                        <div className="flex gap-3 flex-wrap">
                            <button type="button" className="btn btn--outline btn--sm" onClick={startWalking}>
                                Start Walking ⚓
                            </button>
                            <a className="btn btn--outline btn--sm" href={activeIsland.url} target="_blank" rel="noreferrer">
                                Live ↗
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {showSkipConfirm && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(13,10,7,0.72)] p-4">
                    <div
                        role="alertdialog"
                        aria-modal="true"
                        className="max-w-[42ch] w-full bg-ink-800 border border-brass-400 shadow-[var(--shadow-gilt-frame)] p-6 text-center max-h-[90vh] overflow-y-auto"
                    >
                        <p className="font-display text-lg text-paper-100 mb-4">
                            Leave {(islandProgress?.total ?? 0) - (islandProgress?.found ?? 0)} treasures behind?
                        </p>
                        <div className="flex gap-3 justify-center flex-wrap">
                            <button type="button" className="btn btn--outline btn--sm" onClick={() => setShowSkipConfirm(false)}>
                                Keep Exploring
                            </button>
                            <button type="button" className="btn btn--gilt btn--sm" onClick={confirmSkip}>
                                Set Sail ⇢
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showRestartConfirm && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(13,10,7,0.72)] p-4">
                    <div
                        role="alertdialog"
                        aria-modal="true"
                        className="max-w-[42ch] w-full bg-ink-800 border border-brass-400 shadow-[var(--shadow-gilt-frame)] p-6 text-center max-h-[90vh] overflow-y-auto"
                    >
                        <p className="font-display text-lg text-paper-100 mb-4">
                            Start the voyage anew? Your charted isles and score will be lost.
                        </p>
                        <div className="flex gap-3 justify-center flex-wrap">
                            <button type="button" className="btn btn--outline btn--sm" onClick={() => setShowRestartConfirm(false)}>
                                Keep Sailing
                            </button>
                            <button type="button" className="btn btn--gilt btn--sm" onClick={startOver}>
                                Start Over ⟲
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {finaleSummary && <FinaleCard summary={finaleSummary} />}

            {showLedger && !finaleSummary && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(13,10,7,0.85)] p-4">
                    <div role="dialog" aria-modal="true" aria-label="The Ledger" className="max-h-[90vh] overflow-y-auto">
                        <Leaderboard onClose={() => setShowLedger(false)} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default GamePage
