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
                        <div className="[filter:invert(82%)_sepia(20%)_saturate(600%)_hue-rotate(2deg)]">
                            <svg viewBox="0 0 16 16" className="w-5 h-5" fill="#000" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                        </div>
                    </a>
                </div>
                <div className="h-px bg-[rgba(241,232,213,0.18)] my-6"></div>
                <div className="flex justify-between flex-wrap gap-2 font-mono text-[11px] tracking-[0.08em] text-paper-400 uppercase">
                    <span>Set in Cormorant Garamond, EB Garamond &amp; Courier Prime.</span>
                    <span>© MMXXVI Nikola Čučuković (Nikola Cucukovic) · All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    )
}

export default SiteFooter
