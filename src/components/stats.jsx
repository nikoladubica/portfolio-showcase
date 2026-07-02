import { motion } from "framer-motion"
import { stats } from "../data/projects"

const rise = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
}

const Stats = () => {
    return (
        <div className="grid grid-cols-4 max-[900px]:grid-cols-2 max-[560px]:grid-cols-2 gap-7 max-[560px]:gap-6 mt-8 border-t border-b border-[rgba(226,205,148,0.25)] pt-8 pb-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.lab}
                    className="flex flex-col items-center text-center"
                    variants={rise}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: "easeInOut" }}
                >
                    <div className="relative w-[104px] h-[104px] max-[560px]:w-[88px] max-[560px]:h-[88px] bg-paper-50 shadow-[0_0_0_1px_#5e4715,0_0_0_4px_#e7ce91,0_0_0_7px_#c39a47,0_8px_18px_rgba(33,27,18,0.35)] flex flex-col items-center justify-center py-[10px] px-2">
                        <span className="font-display text-xl font-medium text-ink-900 leading-none flex-1 flex items-center">{stat.val}</span>
                        <span className="font-mono text-2xs uppercase tracking-caps text-ink-500">{stat.lab}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default Stats
