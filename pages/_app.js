import { ReduxProvider } from "../redux/provider"
import { Inter } from "next/font/google"

import AppChild from "./app-child"
import './globals.css'

const font = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }) => {
    console.log()

    return(
        <ReduxProvider>
            <AppChild Component={Component} pageProps={pageProps} />
        </ReduxProvider>
    )
}

export default App;