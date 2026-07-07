import { useState } from "react"
import { clearSave, loadSave, markScoreSubmitted, getLastPlayerName, setLastPlayerName } from "../save"
import { submitScore } from "../api"
import Leaderboard from "./Leaderboard"

const exploreAgain = () => {
    clearSave()
    window.location.reload()
}

const FinaleCard = ({ summary }) => {
    const [alreadySubmitted] = useState(() => loadSave().scoreSubmitted)
    const [name, setName] = useState(() => getLastPlayerName())
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)

    const minutes = Math.floor(summary.durationSeconds / 60)
    const seconds = summary.durationSeconds % 60
    const islandsCompleted = summary.breakdown.filter((island) => island.completed).length

    const signLedger = () => {
        const trimmed = name.trim()
        if (trimmed.length < 2 || trimmed.length > 24) {
            setError("Name must be 2-24 characters.")
            return
        }

        setSubmitting(true)
        setError(null)

        submitScore({
            name: trimmed,
            score: summary.score,
            islandsCompleted,
            durationSeconds: summary.durationSeconds
        })
            .then((data) => {
                setLastPlayerName(trimmed)
                markScoreSubmitted()
                setResult(data)
            })
            .catch((err) => setError(err.message))
            .finally(() => setSubmitting(false))
    }

    const showBoard = result || alreadySubmitted

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(13,10,7,0.85)] p-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-label="The Voyage Concludes"
                className="max-w-[60ch] w-full bg-ink-800 border border-brass-400 shadow-[var(--shadow-gilt-frame)] p-6 max-h-[85vh] overflow-y-auto"
            >
                <p className="font-mono text-xs uppercase tracking-caps text-brass-400 mb-2">The Voyage Concludes</p>
                <p className="font-display text-3xl text-paper-50 mb-1">
                    {summary.score} / {summary.maxScore} points
                </p>
                <p className="font-display italic text-paper-300 mb-5">
                    {minutes}m {seconds}s at sea
                </p>

                <table className="w-full text-sm mb-6 border-collapse">
                    <tbody>
                        {summary.breakdown.map((island) => (
                            <tr key={island.name} className="border-b border-ink-700">
                                <td className="py-2 font-display text-paper-100">
                                    {island.name} {island.completed && <span className="text-brass-400">✧</span>}
                                </td>
                                <td className="py-2 font-mono text-xs text-paper-300 text-right">
                                    {island.found} / {island.total}
                                </td>
                                <td className="py-2 font-mono text-xs text-brass-400 text-right w-[8ch]">
                                    {island.pointsEarned} pts
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!showBoard && (
                    <div className="mb-6">
                        <label className="font-mono text-xs uppercase tracking-caps text-brass-400 block mb-2" htmlFor="finale-name">
                            Sign the Ledger
                        </label>
                        <div className="flex gap-3 flex-wrap items-start">
                            <input
                                id="finale-name"
                                type="text"
                                className="bg-ink-900 border border-brass-400 text-paper-100 font-display px-3 py-2 flex-1 min-w-[16ch]"
                                value={name}
                                maxLength={24}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                            />
                            <button type="button" className="btn btn--gilt btn--sm" onClick={signLedger} disabled={submitting}>
                                {submitting ? "Signing…" : "Sign ✒"}
                            </button>
                        </div>
                        {error && <p className="font-display italic text-oxblood-300 mt-2">{error}</p>}
                    </div>
                )}

                {showBoard && (
                    <div className="mb-6">
                        <Leaderboard playerEntry={result} />
                    </div>
                )}

                <div className="flex gap-3 flex-wrap">
                    <button type="button" className="btn btn--gilt btn--sm" onClick={exploreAgain}>
                        Explore Again
                    </button>
                    <a className="btn btn--outline btn--sm" href="/">
                        Back to the Broadsheet
                    </a>
                </div>
            </div>
        </div>
    )
}

export default FinaleCard
