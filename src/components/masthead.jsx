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
                <div className="mobile-notice">
                    <p>☞ For the full experience, view this broadsheet on a desktop.</p>
                    <button
                        className="close"
                        aria-label="Dismiss notice"
                        onClick={() => dispatch(dismissMobileNotice())}
                    >
                        ✕
                    </button>
                </div>
            )}

            <header className="masthead">
                <div className="wrap bar">
                    <a className="brand" href="#top">
                        <img
                            className="monogram"
                            src="/android-chrome-512x512.png"
                            alt="N. Čučuković logo"
                            width={34}
                            height={34}
                        />
                        <span className="brand-name">N. Čučuković</span>
                    </a>
                    <nav className="nav">
                        <a href="#works">Works</a>
                        <a href="#skills">Skills</a>
                        <a href="#ledger">Ledger</a>
                        <a href="#open-source">Open Source</a>
                        <a href="#contact">Contact</a>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Masthead
