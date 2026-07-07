import { useEffect, useState } from "react"
import { fetchLeaderboard } from "../api"

const HIGHLIGHT = "bg-[rgba(194,163,94,0.18)]"

const Leaderboard = ({ playerEntry, onClose }) => {
    const [entries, setEntries] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchLeaderboard(10)
            .then(setEntries)
            .catch(() => setError(true))
    }, [])

    const playerInTop = playerEntry && entries && playerEntry.rank <= entries.length

    return (
        <div className="max-w-[50ch] w-full bg-ink-800 border border-brass-400 shadow-[var(--shadow-gilt-frame)] p-6">
            <p className="font-mono text-xs uppercase tracking-caps text-brass-400 mb-1">❦ The Ledger</p>
            <p className="font-display text-xl text-paper-50 mb-4">Top Voyages</p>

            {error && <p className="font-display italic text-paper-300 mb-4">The ledger could not be read.</p>}
            {!error && !entries && <p className="font-display italic text-paper-300 mb-4">Reading the ledger…</p>}

            {entries && (
                <table className="w-full text-sm border-collapse mb-4">
                    <tbody>
                        {entries.map((entry, i) => (
                            <tr
                                key={`${entry.name}-${entry.createdAt}-${i}`}
                                className={`border-b border-ink-700 ${playerInTop && i + 1 === playerEntry.rank ? HIGHLIGHT : ""}`}
                            >
                                <td className="py-2 font-mono text-xs text-brass-400 w-[4ch]">{i + 1}</td>
                                <td className="py-2 font-display text-paper-100">{entry.name}</td>
                                <td className="py-2 font-mono text-xs text-paper-300 text-right">{entry.islandsCompleted} isles</td>
                                <td className="py-2 font-mono text-xs text-brass-400 text-right w-[8ch]">{entry.score} pts</td>
                            </tr>
                        ))}
                        {playerEntry && !playerInTop && (
                            <tr className={HIGHLIGHT}>
                                <td className="py-2 font-mono text-xs text-brass-400 w-[4ch]">{playerEntry.rank}</td>
                                <td className="py-2 font-display text-paper-100">{playerEntry.name}</td>
                                <td className="py-2 font-mono text-xs text-paper-300 text-right">
                                    {playerEntry.islandsCompleted} isles
                                </td>
                                <td className="py-2 font-mono text-xs text-brass-400 text-right w-[8ch]">
                                    {playerEntry.score} pts
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {onClose && (
                <button type="button" className="btn btn--outline btn--sm" onClick={onClose}>
                    Close
                </button>
            )}
        </div>
    )
}

export default Leaderboard
