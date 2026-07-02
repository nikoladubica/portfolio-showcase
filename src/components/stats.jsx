import { motion } from "framer-motion"
import { stats } from "../data/projects"

// Symmetric scale — outermost tiles are small/faint, growing toward the
// center pair which stay at full size and opacity. Indexed by distance
// from the center: 0 = outermost (index 0 & last), up to 3 = center pair.
const TIERS = [
    {
        box: "w-[56px] h-[56px] max-[560px]:w-[46px] max-[560px]:h-[46px]",
        val: "text-xs",
        lab: "text-[7px]",
        opacity: 0.35,
        shadow: "shadow-[0_0_0_1px_#5e4715,0_0_0_3px_#e7ce91,0_0_0_5px_#c39a47,0_4px_10px_rgba(33,27,18,0.25)]",
    },
    {
        box: "w-[72px] h-[72px] max-[560px]:w-[60px] max-[560px]:h-[60px]",
        val: "text-base",
        lab: "text-[8px]",
        opacity: 0.6,
        shadow: "shadow-[0_0_0_1px_#5e4715,0_0_0_3px_#e7ce91,0_0_0_6px_#c39a47,0_6px_14px_rgba(33,27,18,0.3)]",
    },
    {
        box: "w-[88px] h-[88px] max-[560px]:w-[74px] max-[560px]:h-[74px]",
        val: "text-lg",
        lab: "text-[9px]",
        opacity: 0.82,
        shadow: "shadow-[0_0_0_1px_#5e4715,0_0_0_4px_#e7ce91,0_0_0_7px_#c39a47,0_7px_16px_rgba(33,27,18,0.33)]",
    },
    {
        box: "w-[104px] h-[104px] max-[560px]:w-[88px] max-[560px]:h-[88px]",
        val: "text-xl",
        lab: "text-2xs",
        opacity: 1,
        shadow: "shadow-[0_0_0_1px_#5e4715,0_0_0_4px_#e7ce91,0_0_0_7px_#c39a47,0_8px_18px_rgba(33,27,18,0.35)]",
    },
]

const Stats = () => {
    return (
        <div className="flex items-center justify-center gap-6 mt-8 border-t border-b border-[rgba(226,205,148,0.25)] pt-8 pb-8">
            {stats.map((stat, index) => {
                const tier = TIERS[Math.min(index, stats.length - 1 - index)]
                return (
                    <motion.div
                        key={stat.lab}
                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: tier.opacity, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: "easeInOut" }}
                    >
                        <div className={`relative ${tier.box} ${tier.shadow} bg-paper-50 flex flex-col items-center justify-center py-[10px] px-2`}>
                            <span className={`font-display ${tier.val} font-medium text-ink-900 leading-none flex-1 flex items-center`}>{stat.val}</span>
                            <span className={`font-mono ${tier.lab} uppercase tracking-caps text-ink-500`}>{stat.lab}</span>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

export default Stats
