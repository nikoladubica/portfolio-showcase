import { useEffect, useState } from "react"

const NAV_LINKS = [
    { href: "#creation", label: "Creation" },
    { href: "#works", label: "Works" },
    { href: "#skills", label: "Skills" },
    { href: "#ledger", label: "Ledger" },
    { href: "#open-source", label: "Open Source" },
    { href: "#contact", label: "Contact" },
]

const Masthead = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    // Close the fold-out menu on Escape while it is open.
    useEffect(() => {
        if (!menuOpen) return
        const onKey = (e) => {
            if (e.key === "Escape") setMenuOpen(false)
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [menuOpen])

    return (
        <header className="sticky top-0 z-50 bg-[rgba(26,20,15,0.82)] backdrop-blur-[6px] border-b border-rule-strong">
            <div className="max-w-[var(--container)] mx-auto px-6 h-[68px] flex items-center justify-between">
                <a className="flex items-center gap-3 no-underline bg-transparent border-none cursor-pointer" href="#top">
                    <img
                        className="w-[34px] h-[34px] object-contain"
                        src="/android-chrome-512x512.png"
                        alt="N. Čučuković logo"
                        width={34}
                        height={34}
                    />
                    <span className="font-display text-[20px] text-paper-50">N. Čučuković</span>
                </a>

                {/* Desktop navigation (>900px) — unchanged. */}
                <nav className="flex items-center gap-6 max-[900px]:hidden">
                    {NAV_LINKS.map((link) => (
                        <a key={link.href} className="font-mono text-xs uppercase tracking-caps text-paper-200 no-underline hover:text-brass-400" href={link.href}>{link.label}</a>
                    ))}
                </nav>

                {/* Mobile menu trigger (≤900px) — the broadsheet's table of contents. */}
                <button
                    type="button"
                    className="hidden max-[900px]:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-caps text-paper-200 hover:text-brass-400 bg-transparent border border-rule-strong rounded-[var(--radius-sm)] px-3 py-2 cursor-pointer transition-colors duration-[var(--dur)] ease-[var(--ease-antique)]"
                    aria-label="Toggle section index"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-nav"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    Index
                    <span aria-hidden="true">☰</span>
                </button>
            </div>

            {/* Fold-out panel (≤900px). The 0fr→1fr grid-rows transition animates the
                reveal without a hard-coded height; the inner wrapper clips the overflow. */}
            <div className={`hidden max-[900px]:grid overflow-hidden transition-[grid-template-rows] duration-[var(--dur)] ease-[var(--ease-antique)] ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                    <nav
                        id="mobile-nav"
                        aria-label="Section index"
                        inert={!menuOpen}
                        className="flex flex-col bg-ink-900 border-t border-rule-strong"
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                className="font-mono text-xs uppercase tracking-caps text-paper-200 no-underline hover:text-brass-400 px-6 py-4 border-b border-ink-700 last:border-b-0"
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Masthead
