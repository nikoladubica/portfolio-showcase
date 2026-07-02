import { projects } from "../data/projects"
import SectionHead from "./section-head"

const TAG_TONES = {
    'React': 'oxblood',
    'Next.js': 'ink',
    'Framer Motion': 'gilt',
    'Redux': 'patina',
    'TypeScript': 'oxblood',
    'Tailwind': 'patina',
    'Swiper': 'gilt'
}

const Works = () => {
    return (
        <section className="pt-8 pb-8 border-t border-[rgba(226,205,148,0.18)] wrap" id="works">
            <SectionHead
                eyebrow="§ I · Selected Works"
                heading="Projects & Commissions"
                description="A register of recent front-end engagements — each shipped to production."
            />

            <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1 gap-4 mt-6">
                {projects.map(project => (
                    <article className="bg-ink-800 p-4 shadow-lg border border-[rgba(226,205,148,0.15)] flex flex-col" key={project.name}>
                        <div className="relative w-full shrink-0 aspect-[2/1] border border-brass-400 p-[2px] bg-paper-50 mb-[26px]">
                            <span className="absolute w-2 h-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f2e0ac,#9a7b36_70%,#5e4715)] shadow-[0_1px_2px_rgba(0,0,0,0.5)] z-2 -top-1 -left-1"></span>
                            <span className="absolute w-2 h-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f2e0ac,#9a7b36_70%,#5e4715)] shadow-[0_1px_2px_rgba(0,0,0,0.5)] z-2 -top-1 -right-1"></span>
                            <span className="absolute w-2 h-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f2e0ac,#9a7b36_70%,#5e4715)] shadow-[0_1px_2px_rgba(0,0,0,0.5)] z-2 -bottom-1 -left-1"></span>
                            <span className="absolute w-2 h-2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f2e0ac,#9a7b36_70%,#5e4715)] shadow-[0_1px_2px_rgba(0,0,0,0.5)] z-2 -bottom-1 -right-1"></span>
                            <img
                                className="w-full h-full object-cover object-top [filter:sepia(0.42)_contrast(1.05)_brightness(0.99)] border border-ink-300"
                                src={project.image}
                                alt={project.name}
                            />
                            <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 max-w-[88%] bg-[linear-gradient(180deg,#ead49a_0%,#c19a47_55%,#9a7b36_100%)] border border-[#5e4715] text-[#2a2012] font-display font-semibold text-[14px] py-[6px] px-[18px] whitespace-nowrap overflow-hidden text-ellipsis shadow-[0_3px_7px_rgba(33,27,18,0.4),inset_0_1px_0_rgba(255,255,255,0.45)]">{project.name}</div>
                        </div>
                        <div className="text-center pt-[6px] flex flex-col flex-1">
                            <div className="font-mono text-xs text-brass-400 tracking-caps uppercase">{project.no}</div>
                            <p className="text-[14px] text-paper-300 leading-[1.55] mt-2 mb-[14px] min-h-[4.65em] line-clamp-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                {project.tags.map(tag => (
                                    <span className={`tag tag--${TAG_TONES[tag] || 'ink'}`} key={tag}>{tag}</span>
                                ))}
                            </div>
                            <a
                                className="btn btn--solid btn--sm w-max mx-auto mt-auto"
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Visit Live ↗
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Works
