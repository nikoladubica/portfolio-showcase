import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { projects } from "../data/projects"
import SectionHead from "./section-head"

// Each technology's own brand color (not the design system's oxblood/ink/gilt/patina
// palette). Framer Motion uses Framer's brand blue, Zustand has no official brand color
// (small library, no fixed brand palette) so an amber "bear" tone was picked instead.
const TAG_TONES = {
    'React': '#61DAFB',
    'Next.js': '#000000',
    'Framer Motion': '#0055FF',
    'Redux': '#764ABC',
    'TypeScript': '#3178C6',
    'Tailwind': '#38BDF8',
    'Swiper': '#6332F6',
    'Laravel': '#FF2D20',
    'Node.js': '#339933',
    'Docker': '#2496ED',
    'Zustand': '#B45309',
    'Vanilla JS': '#F7DF1E',
    'Inertia.js': '#155dfc',
    'Alpine.js': '#48a9c1',
    'Tanstack Query': '#fd9a00',
    'MySQL': '#3E6E93',
    'CI/CD': '#dddddd',
    'C': '#000000',
}

// The case-study fold-out is built and wired, but the "Read the Full Account" toggle stays
// hidden until the copy in projects.js is real (the drafts are ☞-placeholder) and a final
// button position is chosen. Flip to true to surface it. While false, the fold-out is
// unreachable, so no ☞ placeholder text can appear on the site.
const CASE_STUDY_ENABLED = false

const hexToRgb = (hex) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16)
})

const getLuminance = (hex) => {
    const { r, g, b } = hexToRgb(hex)
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

// Picks readable text color (the same light/dark tones already used elsewhere in the
// design system) based on the tag's background luminance.
const getTagTextColor = (luminance) => (luminance > 0.6 ? '#2a2012' : '#f5edd8')

// Light colors get a transparent-to-black/40 overlay (top to bottom), dark colors get a
// white/40-to-transparent overlay, so every pill reads as a subtle gradient regardless
// of how bright or dark its brand color is.
const getTagOverlay = (luminance) =>
    luminance > 0.6
        ? 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))'
        : 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)'

const darkenColor = (hex, percent) => {
    const { r, g, b } = hexToRgb(hex)
    const factor = 1 - percent / 100
    const toHex = (channel) => Math.round(channel * factor).toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// The case-study fold-out: role in mono caps, problem/outcome as serif prose, highlights
// as a ❧-glyph list (pic-li-glyph). Height-animated with the shared --dur / --ease-antique
// motion so it matches the rest of the broadsheet.
const CaseStudy = ({ caseStudy }) => (
    <div className="text-left border-t border-[rgba(226,205,148,0.18)] pt-4 mt-1">
        <div className="font-mono text-2xs text-brass-400 tracking-caps uppercase mb-3">{caseStudy.role}</div>
        <p className="text-[13.5px] text-paper-300 leading-[1.6] mb-4">{caseStudy.problem}</p>
        {caseStudy.highlights?.length > 0 && (
            <ul className="flex flex-col gap-2 mb-4">
                {caseStudy.highlights.map(highlight => (
                    <li className="pic-li-glyph text-[13.5px] text-paper-300 leading-[1.5]" key={highlight}>
                        {highlight}
                    </li>
                ))}
            </ul>
        )}
        <p className="text-[13.5px] text-paper-200 leading-[1.6] italic">
            <span className="not-italic font-mono text-2xs text-brass-400 tracking-caps uppercase mr-2">Outcome</span>
            {caseStudy.outcome}
        </p>
    </div>
)

const WorkCard = ({ project }) => {
    const [open, setOpen] = useState(false)
    const hasCaseStudy = CASE_STUDY_ENABLED && Boolean(project.caseStudy)

    return (
        <article className="bg-ink-800 p-4 shadow-lg border border-[rgba(226,205,148,0.15)] flex flex-col">
            <div className="relative w-full shrink-0 aspect-[2/1] border border-brass-400 p-[2px] bg-paper-50 mb-[26px]">
                <span className="absolute w-2 h-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f2e0ac,#9a7b36_70%,#5e4715)] shadow-[0_1px_2px_rgba(0,0,0,0.5)] z-2 -top-1 -left-1"></span>
                <span className="absolute w-2 h-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f2e0ac,#9a7b36_70%,#5e4715)] shadow-[0_1px_2px_rgba(0,0,0,0.5)] z-2 -top-1 -right-1"></span>
                <span className="absolute w-2 h-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f2e0ac,#9a7b36_70%,#5e4715)] shadow-[0_1px_2px_rgba(0,0,0,0.5)] z-2 -bottom-1 -left-1"></span>
                <span className="absolute w-2 h-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f2e0ac,#9a7b36_70%,#5e4715)] shadow-[0_1px_2px_rgba(0,0,0,0.5)] z-2 -bottom-1 -right-1"></span>
                <img
                    className="w-full h-full object-cover object-top [filter:sepia(0.42)_contrast(1.05)_brightness(0.99)] border border-ink-300"
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 max-w-[88%] bg-[linear-gradient(180deg,#ead49a_0%,#c19a47_55%,#9a7b36_100%)] border border-[#5e4715] text-[#2a2012] font-display font-semibold text-[14px] py-[6px] px-[18px] whitespace-nowrap overflow-hidden text-ellipsis shadow-[0_3px_7px_rgba(33,27,18,0.4),inset_0_1px_0_rgba(255,255,255,0.45)]">{project.name}</div>
            </div>
            <div className="text-center pt-[6px] flex flex-col flex-1 gap-4">
                <div className="font-mono text-xs text-brass-400 tracking-caps uppercase">{project.no}</div>
                <p className="text-[14px] text-paper-300 leading-[1.55] mt-2 mb-[14px] min-h-[4.65em] line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {project.tags.map(tag => {
                        const color = TAG_TONES[tag] || '#8E7B5F'
                        const luminance = getLuminance(color)
                        return (
                            <span
                                className="tag"
                                key={tag}
                                style={{
                                    background: `${getTagOverlay(luminance)}, ${color}`,
                                    borderColor: darkenColor(color, 40),
                                    color: getTagTextColor(luminance)
                                }}
                            >
                                {tag}
                            </span>
                        )
                    })}
                </div>

                <AnimatePresence initial={false}>
                    {hasCaseStudy && open && (
                        <motion.div
                            key="case-study"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.26, ease: [0.22, 0.61, 0.36, 1] }}
                            className="overflow-hidden"
                        >
                            <CaseStudy caseStudy={project.caseStudy} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-wrap gap-3 justify-center items-center mt-auto pt-1">
                    <a
                        className="btn btn--solid btn--sm w-max"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Visit Live ↗
                    </a>
                    {hasCaseStudy && (
                        <button
                            type="button"
                            className="font-mono text-2xs text-brass-400 tracking-caps uppercase underline decoration-1 underline-offset-2 hover:text-brass-200 transition-colors"
                            onClick={() => setOpen(prev => !prev)}
                            aria-expanded={open}
                        >
                            {open ? 'Close Account ↑' : 'Read the Full Account →'}
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}

const Works = () => {
    return (
        <section className="pt-8 pb-8 border-t border-[rgba(226,205,148,0.18)] wrap" id="works">
            <SectionHead
                eyebrow="§ I · Selected Works"
                heading="Projects & Commissions"
                description="A register of recent front-end engagements - each shipped to production."
            />

            <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1 auto-rows-fr gap-4 mt-6">
                {projects.map(project => (
                    <WorkCard project={project} key={project.name} />
                ))}
            </div>
        </section>
    )
}

export default Works
