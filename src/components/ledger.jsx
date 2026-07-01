import { useMemo } from "react"

const FILLS = [
    "rgba(241,232,213,0.07)",
    "rgba(194,163,94,0.32)",
    "rgba(194,163,94,0.55)",
    "rgba(201,138,128,0.7)",
    "#94392F"
]

// Deterministic stylised GitHub "contribution" grid — 53 weeks × 7 days.
// Seeded PRNG (no Date/Math.random) so server and client render identically.
const buildGrid = () => {
    let seed = 1847
    const rand = () => {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff
        return seed / 0x7fffffff
    }

    const weeks = []
    for (let w = 0; w < 53; w++) {
        const days = []
        for (let d = 0; d < 7; d++) {
            const r = rand()
            let lvl = r < 0.42 ? 0 : r < 0.66 ? 1 : r < 0.84 ? 2 : r < 0.95 ? 3 : 4
            if ((d === 0 || d === 6) && r < 0.6) lvl = Math.max(0, lvl - 1)
            days.push(lvl)
        }
        weeks.push(days)
    }
    return weeks
}

const Ledger = () => {
    const weeks = useMemo(() => buildGrid(), [])

    return (
        <section className="ledger" id="ledger">
            <div className="wrap section">
                <div className="sec-head center">
                    <span className="eyebrow">§ III · The Ledger</span>
                    <h2>A Year of Contributions</h2>
                    <p>1,284 commits entered into the record this twelvemonth.</p>
                    <div className="ornament">❧</div>
                </div>
                <div className="grid-wrap">
                    <div className="contrib">
                        {weeks.map((days, w) => (
                            <div className="contrib-col" key={w}>
                                {days.map((lvl, d) => (
                                    <span key={d} style={{ background: FILLS[lvl] }} />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="legend">
                        <span>LESS</span>
                        {FILLS.map((fill, i) => (
                            <span className="sw" key={i} style={{ background: fill }} />
                        ))}
                        <span>MORE</span>
                        <span style={{ flex: 1 }}></span>
                        <a
                            className="btn btn--gilt btn--sm"
                            href="https://github.com/nikoladubica"
                            target="_blank"
                            rel="noreferrer"
                        >
                            View on GitHub ↗
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Ledger
