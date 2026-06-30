import { ReduxProvider } from "../redux/provider"
import { Inter } from "next/font/google"

import AppChild from "./app-child"
import './globals.css'

const font = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }) => {
    return(
        <ReduxProvider>
            <main className={font.className}>
                <AppChild Component={Component} pageProps={pageProps} />
            </main>
        </ReduxProvider>
    )
}

export default App;