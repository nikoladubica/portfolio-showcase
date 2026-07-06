import { useEffect, useMemo, useState } from "react"
import SectionHead from "./section-head"
import Tooltip from "./tooltip"

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

// A cell with no real contribution behind it (leading week padding / fallback).
const PAD = { level: 0 }

// Parse GitHub's "YYYY-MM-DD" as local midnight so the weekday/month never
// shift a day in negative-offset timezones (bare `new Date("YYYY-MM-DD")` is UTC).
const parseDate = (iso) => new Date(`${iso}T00:00:00`)
const formatDay = (iso) =>
    parseDate(iso).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })

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
            days.push({ level: lvl })
        }
        weeks.push(days)
    }
    return weeks
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// Turn the flat, day-by-day contribution list into columns of weeks (Sun→Sat),
// padding the leading partial week with empty cells the way GitHub does.
// Also returns a per-column month row — labelled only where a new month begins.
const toWeeks = (contributions) => {
    const grid = []
    const weekStarts = []
    let days = new Array(7).fill(PAD)
    let start = null
    let filled = false

    for (const day of contributions) {
        const dow = parseDate(day.date).getDay() // 0 = Sunday
        if (dow === 0 && filled) {
            grid.push(days)
            weekStarts.push(start)
            days = new Array(7).fill(PAD)
            start = null
        }
        if (start === null) start = day.date
        days[dow] = { level: day.level, count: day.count, date: day.date }
        filled = true
    }
    if (filled) {
        grid.push(days)
        weekStarts.push(start)
    }

    let prevMonth = -1
    const months = weekStarts.map((date) => {
        const m = parseDate(date).getMonth()
        if (m === prevMonth) return ""
        prevMonth = m
        return MONTHS[m]
    })
    // Drop the leading label — the first month is only a sliver of weeks and
    // sits too close to the second to read cleanly.
    if (months.length) months[0] = ""

    return { grid, months }
}

const Ledger = () => {
    const fallback = useMemo(() => buildGrid(), [])
    const [weeks, setWeeks] = useState(fallback)
    const [months, setMonths] = useState([])
    const [total, setTotal] = useState(null)
    const [hover, setHover] = useState(null)

    useEffect(() => {
        let active = true
        fetch(API)
            .then((res) => {
                if (!res.ok) throw new Error(`GitHub proxy returned ${res.status}`)
                return res.json()
            })
            .then((data) => {
                if (!active) return
                const { grid, months: monthRow } = toWeeks(data.contributions)
                setWeeks(grid)
                setMonths(monthRow)
                setTotal(data.total?.lastYear ?? null)
            })
            .catch(() => {
                // Keep the seeded fallback grid already in state.
            })
        return () => {
            active = false
        }
    }, [])

    const live = total != null
    const description = live
        ? `${total.toLocaleString()} contributions entered into the record this twelvemonth.`
        : "An illustrative plate - the live record is being fetched from GitHub."

    return (
        <section id="ledger">
            <div className="wrap pt-8 pb-8 border-t border-[rgba(226,205,148,0.18)]">
                <SectionHead
                    eyebrow="§ III · The Ledger"
                    heading="A Year of Contributions"
                    description={description}
                />
                <div className="border-t border-[rgba(241,232,213,0.18)] pt-5">
                    {/* Columns have a minmax floor so cells stay legible instead of being
                        squeezed to slivers on narrow viewports - fr still fills the full
                        width on desktop, but below the floor the grid overflows and this
                        wrapper (not the page) scrolls horizontally to contain it. */}
                    <div className="overflow-x-auto md:overflow-hidden">
                        <div className={`grid gap-[3px] ${live ? "" : "opacity-60"}`} style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 1fr))` }}>
                            {weeks.map((days, w) => (
                                <div className="grid grid-rows-[repeat(7,1fr)] gap-[3px]" key={w}>
                                    {days.map((cell, d) => (
                                        <span
                                            className="aspect-square rounded-[2px] border border-[rgba(0,0,0,0.25)]"
                                            key={d}
                                            style={{ background: FILLS[cell.level] }}
                                            onMouseEnter={cell.date ? (e) => setHover({ rect: e.currentTarget.getBoundingClientRect(), cell }) : undefined}
                                            onMouseLeave={cell.date ? () => setHover(null) : undefined}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                        {months.length > 0 && (
                            <div className="grid gap-[3px] mt-2 font-mono text-[10px] text-paper-400 tracking-[0.08em]" style={{ gridTemplateColumns: `repeat(${months.length}, minmax(10px, 1fr))` }}>
                                {months.map((label, i) => (
                                    <span className="whitespace-nowrap overflow-visible" key={i}>{label}</span>
                                ))}
                            </div>
                        )}
                    </div>
                    {hover && (
                        <Tooltip anchor={hover.rect}>
                            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-900">
                                {formatDay(hover.cell.date)}
                            </div>
                            <div className="font-mono text-[10px] tracking-[0.06em] text-oxblood-600">
                                {hover.cell.count} contribution{hover.cell.count === 1 ? "" : "s"}
                            </div>
                        </Tooltip>
                    )}
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
