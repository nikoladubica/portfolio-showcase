import { ReduxProvider } from "../redux/provider"
import {
    Cormorant_Garamond,
    EB_Garamond,
    Courier_Prime,
    UnifrakturCook
} from "next/font/google"

import './globals.css'

// Display serif — high-contrast, used for headings and the hero
const display = Cormorant_Garamond({
    subsets: ['latin', 'latin-ext'],
    weight: ['300', '400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-display-next',
    display: 'swap'
})

// Body serif — warm old-style face for running text
const serif = EB_Garamond({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-serif-next',
    display: 'swap'
})

// Typewriter mono — labels, eyebrows, buttons
const mono = Courier_Prime({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    variable: '--font-mono-next',
    display: 'swap'
})

// Blackletter — display masthead ornament only
const blackletter = UnifrakturCook({
    subsets: ['latin'],
    weight: '700',
    variable: '--font-blackletter-next',
    display: 'swap'
})

const fontVars = `app-root ${display.variable} ${serif.variable} ${mono.variable} ${blackletter.variable}`

const App = ({ Component, pageProps }) => {
    return (
        <ReduxProvider>
            <div className={fontVars}>
                <Component {...pageProps} />
            </div>
        </ReduxProvider>
    )
}

export default App;
