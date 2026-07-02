import { skills } from "../data/projects"

const SkillsGallery = () => {
    return (
        <section className="border-t border-[rgba(226,205,148,0.18)]" id="skills">
            <div className="wrap relative pt-8 px-6 pb-9">
                <div className="font-mono text-xs uppercase tracking-wider text-brass-400 text-center block mb-[10px]">§ II · Faculties &amp; Trades</div>
                <h2 className="font-blackletter font-bold text-3xl max-[560px]:text-2xl leading-none text-center text-text-heading mb-2 [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">A Catalogue of Skills</h2>
                <p className="text-center font-serif italic text-md text-paper-300 mx-auto">Three disciplines, hung in careful balance.</p>
                <div className="ornament-gallery">❧</div>

                <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-7 max-[900px]:gap-8 mt-8">
                    {skills.map(skill => (
                        <figure className="pic-frame relative bg-paper-50 pt-[30px] px-[20px] pb-[38px] m-0 shadow-gilt-frame transition-[transform,box-shadow] duration-[var(--dur)] ease-[var(--ease-antique)] hover:-translate-y-1" key={skill.title}>
                            <span className="absolute text-brass-700 text-[15px] leading-none pointer-events-none top-[11px] left-[13px]">❦</span>
                            <span className="absolute text-brass-700 text-[15px] leading-none pointer-events-none top-[11px] right-[13px]">❦</span>
                            <span className="absolute text-brass-700 text-[15px] leading-none pointer-events-none bottom-[11px] left-[13px]">❦</span>
                            <span className="absolute text-brass-700 text-[15px] leading-none pointer-events-none bottom-[11px] right-[13px]">❦</span>
                            <div className="text-center text-[28px] text-brass-600 leading-none mb-[6px]">{skill.glyph}</div>
                            <div className="text-center font-display italic text-[20px] text-oxblood-600 mb-[2px]">{skill.num}</div>
                            <h3 className="font-display font-semibold text-[20px] leading-[1.12] text-center text-ink-900 mb-[6px]">{skill.title}</h3>
                            <p className="font-serif italic text-[14px] text-center text-ink-500 mb-[14px]">{skill.clead}</p>
                            <div className="h-[4px] border-t border-b border-ink-300 w-[44px] mx-auto mb-[14px]"></div>
                            <ul className="list-none m-0 p-0 divide-y divide-dotted divide-ink-300">
                                {skill.items.map(item => (
                                    <li className="pic-li-glyph font-serif text-[14px] leading-[1.3] text-ink-700 text-center py-[6px]" key={item}>{item}</li>
                                ))}
                            </ul>
                            <span className="absolute left-1/2 -bottom-[29px] -translate-x-1/2 bg-[linear-gradient(180deg,#ead49a_0%,#c19a47_55%,#9a7b36_100%)] border border-[#5e4715] text-[#2a2012] font-mono text-[10px] tracking-[0.18em] uppercase py-[5px] px-4 whitespace-nowrap shadow-[0_3px_7px_rgba(33,27,18,0.4),inset_0_1px_0_rgba(255,255,255,0.45)]">{skill.plate}</span>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SkillsGallery
