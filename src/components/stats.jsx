import { motion } from "framer-motion"
import { stats } from "../data/projects"

const rise = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
}

const Stats = () => {
    return (
        <div className="stats">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.lab}
                    className="stat"
                    variants={rise}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1, ease: "easeInOut" }}
                >
                    <div className="stat-badge">
                        <span className="val">{stat.val}</span>
                        <span className="lab">{stat.lab}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default Stats
