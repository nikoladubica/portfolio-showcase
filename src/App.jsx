import Masthead from "./components/masthead"
import Hero from "./components/hero"
import Works from "./components/works"
import SkillsGallery from "./components/skills-gallery"
import Ledger from "./components/ledger"
import OpenSource from "./components/open-source"
import Contact from "./components/contact"
import SiteFooter from "./components/site-footer"

const App = () => {
    return (
        <>
            <Masthead />
            <main id="top">
                <Hero />
                <Works />
                <SkillsGallery />
                <Ledger />
                <OpenSource />
                <Contact />
            </main>
            <SiteFooter />
        </>
    )
}

export default App
