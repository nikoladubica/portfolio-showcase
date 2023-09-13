import { ReduxProvider } from "../redux/provider"
import { useRouter } from "next/router"
import { Inter } from "next/font/google"
import Header from "../components/header"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

import AppChild from "./app-child"
import './globals.css'

const font = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }) => {

    return(
        <ReduxProvider>
            <AppChild Component={Component} pageProps={pageProps}  />
        </ReduxProvider>
    )
}

export default App;