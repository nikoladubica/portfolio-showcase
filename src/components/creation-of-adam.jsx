import { useRef } from "react"
import { easeIn, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import SectionHead from "./section-head"
import { CANVAS, FINGER_GAP } from "../data/creation"

// Every tuning value for the scroll scene lives here. Figure offsets are
// percentages of the layer's own box, and every channel returns to rest by
// `convergeEnd` — so the converged painting is always the untransformed
// original and needs no positional verification.
//
// Progress map: 0 → entryHold the displaced figures hold still (entry buffer),
// entryHold → convergeEnd they drift home, convergeEnd → zoomEnd the finale
// zoom plays, and zoomEnd → 1 is the release: the finished frame eases upward
// from a near-standstill, accelerating until it leaves at normal scroll speed —
// so the unpin is a gradual handoff instead of a hard stop-and-go.
const CHOREO = {
    wrapperHeight: "650vh",
    entryHold: 0.1,
    convergeEnd: 0.5,
    zoomEnd: 0.78,
    god: { x: "12%", y: "-7%" },
    adam: { x: "-6%", y: "4%" },
    backgroundScale: 1.06,
    // The scene follows the scrollbar through this spring, so motion keeps
    // gliding briefly after the visitor stops scrolling. Lower stiffness or
    // higher damping = a lazier, longer trail.
    scrollSpring: { stiffness: 90, damping: 28, mass: 1, restDelta: 0.0005 },
    // How far the frame has drifted up by the moment the pin releases. Larger
    // = an earlier, more pronounced send-off; "0vh" = the old hard hold. The
    // section's negative bottom margin reuses this value, so the next section
    // slides up into exactly the space the drift vacates — no dead gap.
    releaseDistance: "-60vh",
    finale: {
        zoomScale: 2.4,
        handsFade: [0.58, 0.68],
        glow: [0.66, 0.78],
    },
}

// The fingertip gap as a percentage of the canvas — zoom origin and glow anchor.
const GAP = {
    x: (FINGER_GAP.x / CANVAS.width) * 100,
    y: (FINGER_GAP.y / CANVAS.height) * 100,
}

// The framed painting never renders wider than the ~1132px content column.
const LAYER_SIZES = "(max-width: 1180px) 100vw, 1132px"

const layerProps = (name) => ({
    src: `/img/creation/${name}.webp`,
    srcSet: `/img/creation/${name}-1400.webp 1400w, /img/creation/${name}.webp ${CANVAS.width}w`,
    sizes: LAYER_SIZES,
    width: CANVAS.width,
    height: CANVAS.height,
    loading: "lazy",
    decoding: "async",
    alt: "",
    className: "absolute inset-0 h-full w-full",
})

const CreationOfAdam = () => {
    const animate = !useReducedMotion()
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
    const progress = useSpring(scrollYProgress, CHOREO.scrollSpring)

    const convergeRange = [CHOREO.entryHold, CHOREO.convergeEnd]
    const godX = useTransform(progress, convergeRange, [CHOREO.god.x, "0%"])
    const godY = useTransform(progress, convergeRange, [CHOREO.god.y, "0%"])
    const adamX = useTransform(progress, convergeRange, [CHOREO.adam.x, "0%"])
    const adamY = useTransform(progress, convergeRange, [CHOREO.adam.y, "0%"])
    const backgroundScale = useTransform(progress, convergeRange, [CHOREO.backgroundScale, 1])
    const zoomScale = useTransform(progress, [CHOREO.convergeEnd, CHOREO.zoomEnd], [1, CHOREO.finale.zoomScale])
    const handsOpacity = useTransform(progress, CHOREO.finale.handsFade, [0, 1])
    const glowOpacity = useTransform(progress, CHOREO.finale.glow, [0, 1])
    const glowScale = useTransform(progress, CHOREO.finale.glow, [0.5, 1])
    // easeIn keeps the frame near-still at the start of the release window and
    // has it moving at roughly scroll speed when the sticky pin lets go.
    const releaseY = useTransform(progress, [CHOREO.zoomEnd, 1], ["0vh", CHOREO.releaseDistance], { ease: easeIn })

    return (
        <section
            ref={ref}
            id="creation"
            className="relative"
            style={animate ? { height: CHOREO.wrapperHeight, marginBottom: CHOREO.releaseDistance } : undefined}
        >
            <div className={animate ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : "pt-8 pb-9"}>
                <motion.div className="wrap w-full" style={animate ? { y: releaseY } : undefined}>
                    <SectionHead
                        eyebrow="Plate No. I · The Divine Spark"
                        heading="The Creation of Adam"
                        description="Scroll, and the fresco finds itself — hand reaching toward hand."
                        marginBottom="mb-5"
                    />

                    <figure
                        className="pic-frame relative mx-auto w-full bg-paper-50 p-[10px] pb-[36px] shadow-gilt-frame m-0"
                        style={{ maxWidth: `calc((100vh - 280px) * ${CANVAS.width / CANVAS.height})` }}
                    >
                        <div
                            className="relative w-full overflow-hidden"
                            role="img"
                            aria-label="Michelangelo's Creation of Adam — Adam's hand reaching toward the hand of God"
                            style={{ aspectRatio: `${CANVAS.width} / ${CANVAS.height}` }}
                        >
                            <motion.div
                                className="absolute inset-0"
                                style={animate ? { scale: zoomScale, transformOrigin: `${GAP.x}% ${GAP.y}%` } : undefined}
                            >
                                <motion.img {...layerProps("background")} style={animate ? { scale: backgroundScale } : undefined} />
                                <motion.img {...layerProps("god-cluster")} style={animate ? { x: godX, y: godY } : undefined} />
                                <motion.img {...layerProps("adam")} style={animate ? { x: adamX, y: adamY } : undefined} />
                                {animate && (
                                    <>
                                        <motion.img
                                            src="/img/creation/hands.webp"
                                            width={CANVAS.width}
                                            height={CANVAS.height}
                                            loading="lazy"
                                            decoding="async"
                                            alt=""
                                            className="absolute inset-0 h-full w-full"
                                            style={{ opacity: handsOpacity }}
                                        />
                                        <motion.div
                                            aria-hidden="true"
                                            className="glow-brass pointer-events-none absolute aspect-square w-[16%] rounded-full"
                                            style={{
                                                left: `${GAP.x}%`,
                                                top: `${GAP.y}%`,
                                                x: "-50%",
                                                y: "-50%",
                                                opacity: glowOpacity,
                                                scale: glowScale,
                                            }}
                                        />
                                    </>
                                )}
                            </motion.div>
                        </div>
                        <figcaption className="absolute inset-x-0 bottom-[10px] text-center font-mono text-2xs uppercase tracking-caps text-ink-600">
                            Fresco · Sistine Chapel Ceiling · c. 1512
                        </figcaption>
                    </figure>
                </motion.div>
            </div>
        </section>
    )
}

export default CreationOfAdam
