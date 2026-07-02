import { motion } from "framer-motion"
import Stats from "./stats"

const rise = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
}

const Hero = () => {
    return (
        <section className="pt-9 wrap">
            <motion.div
                className="font-mono text-xs uppercase tracking-wider text-brass-400 text-center mb-4"
                variants={rise}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                Anno MMXXVI · Zrenjanin, Serbia · Vol. I
            </motion.div>
            <div className="border-0 h-[2px] w-[400px] max-w-[80%] mx-auto bg-[linear-gradient(to_right,transparent,#c39a47,transparent)]"></div>

            <div className="grid grid-cols-[1.55fr_1fr] max-[900px]:grid-cols-1 gap-8 items-center mt-6">
                <motion.div
                    variants={rise}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
                >
                    <h1 className="font-display font-medium text-4xl max-[560px]:text-2xl leading-[0.98] tracking-[-0.015em] mb-4 text-text-heading [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
                        Front-End Developer
                    </h1>
                    <p className="text-md text-paper-200 max-w-[52ch] leading-[1.6] dropcap">
                        Nikola Čučuković builds considered, performant interfaces for the modern web - React
                        and Next.js at the core, an editor&apos;s eye throughout. Part engineer, part craftsman,
                        lately deep in AI-assisted workflows and the people side of shipping product.
                    </p>
                    <div className="flex gap-3 mt-5 flex-wrap">
                        <a className="btn btn--solid" href="#works">See the Work</a>
                        <a className="btn btn--gilt" href="#contact">Make Contact →</a>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col items-center max-[900px]:order-[-1]"
                    variants={rise}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
                >
                    <div className="w-[220px] h-[264px] border border-brass-400 p-[6px] bg-paper-50 shadow">
                        <img className="h-full w-full object-cover" src="public/img/profile.jpg" alt="" />
                    </div>
                </motion.div>
            </div>

            <Stats />
        </section>
    )
}

export default Hero
