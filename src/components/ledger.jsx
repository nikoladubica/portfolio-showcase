import { useMemo } from "react"
import SectionHead from "./section-head"

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
        <section id="ledger">
            <div className="wrap pt-8 pb-8 border-t border-[rgba(226,205,148,0.18)]">
                <SectionHead
                    eyebrow="§ III · The Ledger"
                    heading="A Year of Contributions"
                    description="1,284 commits entered into the record this twelvemonth."
                />
                <div className="border-t border-[rgba(241,232,213,0.18)] pt-5">
                    <div className="grid grid-cols-[repeat(53,1fr)] gap-[3px]">
                        {weeks.map((days, w) => (
                            <div className="grid grid-rows-[repeat(7,1fr)] gap-[3px]" key={w}>
                                {days.map((lvl, d) => (
                                    <span className="aspect-square rounded-[2px] border border-[rgba(0,0,0,0.25)]" key={d} style={{ background: FILLS[lvl] }} />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 mt-5 font-mono text-[10px] text-paper-400 tracking-[0.08em]">
                        <span>LESS</span>
                        {FILLS.map((fill, i) => (
                            <span className="w-[13px] h-[13px] rounded-[2px] border border-[rgba(0,0,0,0.25)]" key={i} style={{ background: fill }} />
                        ))}
                        <span>MORE</span>
                        <span className="flex-1"></span>
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
