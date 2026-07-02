import { useEffect, useMemo, useState } from "react"
import SectionHead from "./section-head"

const GITHUB_USER = "nikoladubica"
// Public, CORS-enabled proxy that scrapes GitHub's contribution calendar and
// returns it as JSON. `?y=last` = the rolling last 365 days.
const API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`

const FILLS = [
    "rgba(241,232,213,0.07)",
    "rgba(194,163,94,0.32)",
    "rgba(194,163,94,0.55)",
    "rgba(201,138,128,0.7)",
    "#94392F"
]

// Deterministic stylised GitHub "contribution" grid — 53 weeks × 7 days.
// Seeded PRNG (no Date/Math.random) so it renders identically every time.
// Used as a graceful fallback while the live data loads or if the fetch fails.
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

// Turn the flat, day-by-day contribution list into columns of weeks (Sun→Sat),
// padding the leading partial week with empty cells the way GitHub does.
const toWeeks = (contributions) => {
    const weeks = []
    let current = new Array(7).fill(0)
    let filled = false

    for (const day of contributions) {
        const dow = new Date(day.date).getDay() // 0 = Sunday
        if (dow === 0 && filled) {
            weeks.push(current)
            current = new Array(7).fill(0)
        }
        current[dow] = day.level
        filled = true
    }
    if (filled) weeks.push(current)
    return weeks
}

const Ledger = () => {
    const fallback = useMemo(() => buildGrid(), [])
    const [weeks, setWeeks] = useState(fallback)
    const [total, setTotal] = useState(null)

    useEffect(() => {
        let active = true
        fetch(API)
            .then((res) => {
                if (!res.ok) throw new Error(`GitHub proxy returned ${res.status}`)
                return res.json()
            })
            .then((data) => {
                if (!active) return
                setWeeks(toWeeks(data.contributions))
                setTotal(data.total?.lastYear ?? null)
            })
            .catch(() => {
                // Keep the seeded fallback grid already in state.
            })
        return () => {
            active = false
        }
    }, [])

    const description = total != null
        ? `${total.toLocaleString()} contributions entered into the record this twelvemonth.`
        : "Contributions entered into the record this twelvemonth."

    return (
        <section id="ledger">
            <div className="wrap pt-8 pb-8 border-t border-[rgba(226,205,148,0.18)]">
                <SectionHead
                    eyebrow="§ III · The Ledger"
                    heading="A Year of Contributions"
                    description={description}
                />
                <div className="border-t border-[rgba(241,232,213,0.18)] pt-5">
                    <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
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
                            href={`https://github.com/${GITHUB_USER}`}
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
