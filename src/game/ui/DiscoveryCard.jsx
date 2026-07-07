import { AnimatePresence, motion } from "framer-motion"

const DiscoveryCard = ({ discovery, onDismiss }) => {
    return (
        <AnimatePresence>
            {discovery && (
                <motion.div
                    className="fixed bottom-6 right-6 z-30 max-w-[36ch] bg-ink-800 border border-brass-400 shadow-[var(--shadow-gilt-frame)] p-5"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                >
                    <span
                        className="tag inline-block mb-2"
                        style={{
                            background: discovery.type === "technology" ? "#7A2E26" : "#574836",
                            color: "#F1E8D5"
                        }}
                    >
                        {discovery.type === "technology" ? "Technology · 5 points" : "Tool · 1 point"}
                    </span>
                    <p className="font-display text-xl text-paper-50 mb-1">{discovery.name}</p>
                    {discovery.hint && <p className="font-display italic text-sm text-paper-300 mb-3">{discovery.hint}</p>}
                    <button type="button" className="btn btn--outline btn--sm" onClick={onDismiss}>
                        Continue
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default DiscoveryCard
