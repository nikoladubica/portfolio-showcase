import { openSourceProjects } from "../data/projects"

const OpenSource = () => {
    return (
        <section className="pt-8 pb-8 border-t border-[rgba(226,205,148,0.18)] wrap" id="open-source">
            <div className="mb-7 text-center">
                <span className="font-mono text-xs uppercase tracking-wider text-brass-400 block my-2">§ IV · Open Source</span>
                <h2 className="font-blackletter text-3xl max-[560px]:text-2xl font-bold text-text-heading my-2 tracking-[0.01em] [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">Public Repositories</h2>
                <p className="font-serif italic text-md text-paper-300 max-w-[60ch] mx-auto">Smaller tools and experiments, kept in the open on GitHub.</p>
                <div className="ornament">❧</div>
            </div>

            <div className="mt-6 border-t border-[rgba(226,205,148,0.18)]">
                {openSourceProjects.map(project => (
                    <div
                        className="grid grid-cols-[1fr_auto_44px] max-[900px]:grid-cols-[1fr_38px] items-center gap-5 py-5 border-b border-[rgba(226,205,148,0.18)]"
                        key={project.name}
                    >
                        <div>
                            <h3 className="font-display font-medium text-md text-text-heading mb-1">{project.name}</h3>
                            <p className="font-serif text-[14px] text-paper-300 leading-[1.5] max-w-[62ch]">{project.description}</p>
                        </div>
                        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-paper-400 text-right whitespace-nowrap max-[900px]:col-span-full max-[900px]:text-left max-[900px]:mt-1">{project.tags.join(' · ')}</div>
                        <a
                            className="w-[38px] h-[38px] shrink-0 inline-flex items-center justify-center border border-brass-400 rounded-[2px] text-brass-400 font-mono text-[16px] no-underline transition-[background,color,border-color] duration-[var(--dur)] ease-[var(--ease-antique)] hover:bg-[linear-gradient(180deg,#ead49a_0%,#c19a47_55%,#9a7b36_100%)] hover:text-[#2a2012] hover:border-[#5e4715]"
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View ${project.name} on GitHub`}
                        >
                            ↗
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default OpenSource
