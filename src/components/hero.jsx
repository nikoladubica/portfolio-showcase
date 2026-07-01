import { motion } from "framer-motion"
import Stats from "./stats"

const rise = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
}

const Hero = () => {
    return (
        <section className="hero wrap">
            <motion.div
                className="kicker"
                variants={rise}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                Anno MMXXVI · Zrenjanin, Serbia · Vol. I
            </motion.div>
            <div className="rule-double"></div>

            <div className="hero-grid">
                <motion.div
                    variants={rise}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
                >
                    <h1>
                        Front-End Developer
                    </h1>
                    <p className="lead dropcap">
                        Nikola Čučuković builds considered, performant interfaces for the modern web - React
                        and Next.js at the core, an editor&apos;s eye throughout. Part engineer, part craftsman,
                        lately deep in AI-assisted workflows and the people side of shipping product.
                    </p>
                    <div className="cta-row">
                        <a className="btn btn--solid" href="#works">See the Work</a>
                        <a className="btn btn--gilt" href="#contact">Make Contact →</a>
                    </div>
                </motion.div>

                <motion.div
                    className="portrait-col"
                    variants={rise}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
                >
                    <div className="portrait-plate">
                        <div className="portrait-oval"><span>NČ</span></div>
                    </div>
                    <div className="portrait-cap">☞ Replace with portrait</div>
                </motion.div>
            </div>

            <Stats />
        </section>
    )
}

export default Hero
