import { useEffect, useRef } from "react"

// Shared fixed-overlay dialog: scrim + gilt-framed panel with minimal focus
// management (focus the panel on mount, restore focus on unmount). No focus-trap
// library — the panel is the single focusable landing point. Pass chrome={false}
// when the child already supplies its own panel frame (e.g. the Leaderboard).
const GameDialog = ({
    role = "dialog",
    ariaLabel,
    zClass = "z-30",
    scrimClass = "bg-scrim/72",
    maxWidthClass = "max-w-[50ch]",
    chrome = true,
    className = "",
    children
}) => {
    const panelRef = useRef(null)

    useEffect(() => {
        const previous = document.activeElement
        panelRef.current?.focus()
        return () => {
            if (previous instanceof HTMLElement) previous.focus()
        }
    }, [])

    const chromeClasses = chrome ? "w-full bg-ink-800 border border-brass-400 shadow-gilt-frame p-6" : ""
    const panelClass = `${maxWidthClass} ${chromeClasses} max-h-[90vh] overflow-y-auto outline-none ${className}`
        .replace(/\s+/g, " ")
        .trim()

    return (
        <div className={`fixed inset-0 ${zClass} flex items-center justify-center ${scrimClass} p-4`}>
            <div ref={panelRef} tabIndex={-1} role={role} aria-modal="true" aria-label={ariaLabel} className={panelClass}>
                {children}
            </div>
        </div>
    )
}

export default GameDialog
