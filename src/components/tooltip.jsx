// Floating parchment tooltip. Presentational + positional only: it renders a
// fixed-position bubble pointing at `anchor` (a DOMRect from getBoundingClientRect).
// The owning component tracks what's hovered and passes the rect + content.
const Tooltip = ({ anchor, children }) => {
    if (!anchor) return null

    return (
        <div
            role="tooltip"
            className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[2px] border border-brass-400 bg-paper-100 px-3 py-2 text-center shadow-[0_6px_18px_rgba(0,0,0,0.45)]"
            style={{ left: anchor.left + anchor.width / 2, top: anchor.top - 8 }}
        >
            {children}
            <span className="absolute left-1/2 -bottom-1 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-brass-400 bg-paper-100" />
        </div>
    )
}

export default Tooltip
