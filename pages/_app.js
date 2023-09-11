import { ReduxProvider } from "../redux/provider"
import { useRouter } from "next/router"
import { Inter } from "next/font/google"
import Header from "../components/header"

import './globals.css'

const font = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }) => {
    const router = useRouter()

    return(
        <ReduxProvider>
            <div className="bg-white overflow-x-hidden p-8 md:px-16 min-h-screen min-w-screen">
                <Header pathname={router.pathname} />
                <Component {...pageProps} />
            </div>
        </ReduxProvider>
    )
}

export default App;