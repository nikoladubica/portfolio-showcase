import { clearSave } from "../save"

const exploreAgain = () => {
    clearSave()
    window.location.reload()
}

const FinaleCard = ({ summary }) => {
    const minutes = Math.floor(summary.durationSeconds / 60)
    const seconds = summary.durationSeconds % 60

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(13,10,7,0.85)] p-4">
            <div className="max-w-[60ch] w-full bg-ink-800 border border-brass-400 shadow-[var(--shadow-gilt-frame)] p-6 max-h-[85vh] overflow-y-auto">
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

                <div className="flex gap-3 flex-wrap">
                    <button type="button" className="btn btn--outline btn--sm" disabled title="Coming in a future ticket">
                        Sign the Ledger
                    </button>
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
