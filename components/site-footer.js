const SiteFooter = () => {
    return (
        <footer className="site-footer">
            <div className="wrap section">
                <div className="row">
                    <div className="foot-brand">
                        <span className="foot-mono">NČ</span>
                        <div>
                            <div className="nm">Nikola Čučuković</div>
                            <div className="role">Front-End Developer</div>
                        </div>
                    </div>
                    <a
                        className="foot-icon"
                        href="https://github.com/nikoladubica"
                        target="_blank"
                        rel="noreferrer"
                        title="GitHub"
                    >
                        <img src="/img/icons/github.svg" alt="GitHub" />
                    </a>
                </div>
                <div className="foot-rule"></div>
                <div className="colophon">
                    <span>Set in Cormorant Garamond, EB Garamond &amp; Courier Prime.</span>
                    <span>© MMXXVI · All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    )
}

export default SiteFooter
