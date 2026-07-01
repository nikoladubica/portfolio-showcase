import { useSyncExternalStore } from "react"
import { useSelector, useDispatch } from "react-redux"
import { isMobile } from "react-device-detect"
import { dismissMobileNotice } from "../redux/features/ui-slice"

// Hydration-safe "am I on the client?" — server snapshot is false, client is true,
// so device detection never causes an SSR/first-paint mismatch.
const noopSubscribe = () => () => {}
const useHydrated = () =>
    useSyncExternalStore(noopSubscribe, () => true, () => false)

const Masthead = () => {
    const dispatch = useDispatch()
    const dismissed = useSelector(state => state.uiReducer.value.mobileNoticeDismissed)

    const hydrated = useHydrated()
    const showNotice = hydrated && isMobile && !dismissed

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
                        <span className="monogram">NČ</span>
                        <span className="brand-name">N. Čučuković</span>
                    </a>
                    <nav className="nav">
                        <a href="#works">Works</a>
                        <a href="#skills">Skills</a>
                        <a href="#ledger">Ledger</a>
                        <a href="#contact">Contact</a>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Masthead
