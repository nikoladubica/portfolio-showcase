const SiteFooter = () => {
    return (
        <footer className="bg-ink-900 text-paper-200">
            <div className="wrap pt-8 pb-8 border-t border-[rgba(226,205,148,0.18)]">
                <div className="flex justify-between items-center flex-wrap gap-5">
                    <div className="flex items-center gap-4">
                        <img
                            className="w-10 h-10 object-contain"
                            src="/android-chrome-512x512.png"
                            alt="N. Čučuković logo"
                            width={40}
                            height={40}
                        />
                        <div>
                            <div className="font-display text-[22px] text-paper-50">Nikola Čučuković</div>
                            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-brass-400">Front-End Developer</div>
                        </div>
                    </div>
                    <a
                        className="w-10 h-10 border border-brass-400 rounded-[2px] inline-flex items-center justify-center"
                        href="https://github.com/nikoladubica"
                        target="_blank"
                        rel="noreferrer"
                        title="GitHub"
                    >
                        <img className="w-[18px] [filter:invert(82%)_sepia(20%)_saturate(600%)_hue-rotate(2deg)]" src="/img/icons/github.svg" alt="GitHub" />
                    </a>
                </div>
                <div className="h-px bg-[rgba(241,232,213,0.18)] my-6"></div>
                <div className="flex justify-between flex-wrap gap-2 font-mono text-[11px] tracking-[0.08em] text-paper-400 uppercase">
                    <span>Set in Cormorant Garamond, EB Garamond &amp; Courier Prime.</span>
                    <span>© MMXXVI · All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    )
}

export default SiteFooter
