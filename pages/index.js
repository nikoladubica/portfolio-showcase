import Head from "next/head"
import Masthead from "../components/masthead"
import Hero from "../components/hero"
import Works from "../components/works"
import SkillsGallery from "../components/skills-gallery"
import Ledger from "../components/ledger"
import Contact from "../components/contact"
import SiteFooter from "../components/site-footer"

const Home = () => {
    return (
        <>
            <Head>
                <title>Nikola Čučuković — Front-End Developer</title>
                <meta
                    name="description"
                    content="Nikola Čučuković builds considered, performant interfaces for the modern web — React & Next.js at the core, an editor's eye throughout."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Masthead />
            <main id="top">
                <Hero />
                <Works />
                <SkillsGallery />
                <Ledger />
                <Contact />
            </main>
            <SiteFooter />
        </>
    )
}

export default Home
