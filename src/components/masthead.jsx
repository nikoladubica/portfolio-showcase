import { useSelector, useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"
import { dismissMobileNotice } from "../redux/features/ui-slice"

const Masthead = () => {
    const dispatch = useDispatch()
    const dismissed = useSelector(state => state.uiReducer.value.mobileNoticeDismissed)

    const showNotice = isMobile && !dismissed

    return (
        <>
            {showNotice && (
                <div className="fixed top-0 left-0 w-full z-[1001] bg-[linear-gradient(180deg,#ead49a_0%,#c19a47_55%,#9a7b36_100%)] text-[#2a2012] border-b border-[#5e4715] py-5 pr-7 pl-6 font-serif text-base shadow-[0_6px_18px_rgba(33,27,18,0.4)] transition-transform duration-[var(--dur)] ease-[var(--ease-antique)] translate-y-0">
                    <p>☞ For the full experience, view this broadsheet on a desktop.</p>
                    <button
                        className="absolute top-1/2 right-5 -translate-y-1/2 bg-transparent border-none cursor-pointer font-mono text-[20px] text-[#2a2012] leading-none p-1"
                        aria-label="Dismiss notice"
                        onClick={() => dispatch(dismissMobileNotice())}
                    >
                        ✕
                    </button>
                </div>
            )}

            <header className="sticky top-0 z-50 bg-[rgba(26,20,15,0.82)] backdrop-blur-[6px] border-b border-rule-strong">
                <div className="max-w-[var(--container)] mx-auto px-6 h-[68px] flex items-center justify-between">
                    <a className="flex items-center gap-3 no-underline bg-transparent border-none cursor-pointer" href="#top">
                        <img
                            className="w-[34px] h-[34px] object-contain"
                            src="/android-chrome-512x512.png"
                            alt="N. Čučuković logo"
                            width={34}
                            height={34}
                        />
                        <span className="font-display text-[20px] text-paper-50">N. Čučuković</span>
                    </a>
                    <nav className="flex items-center gap-6 max-[900px]:hidden">
                        <a className="font-mono text-xs uppercase tracking-caps text-paper-200 no-underline hover:text-brass-400" href="#works">Works</a>
                        <a className="font-mono text-xs uppercase tracking-caps text-paper-200 no-underline hover:text-brass-400" href="#skills">Skills</a>
                        <a className="font-mono text-xs uppercase tracking-caps text-paper-200 no-underline hover:text-brass-400" href="#ledger">Ledger</a>
                        <a className="font-mono text-xs uppercase tracking-caps text-paper-200 no-underline hover:text-brass-400" href="#open-source">Open Source</a>
                        <a className="font-mono text-xs uppercase tracking-caps text-paper-200 no-underline hover:text-brass-400" href="#contact">Contact</a>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Masthead
