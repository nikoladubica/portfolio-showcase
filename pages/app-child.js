import { ReduxProvider } from "../redux/provider"
import { useRouter } from "next/router"
import { Inter } from "next/font/google"
import Header from "../components/header"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

const AppChild = ({ Component, pageProps }) => {
    const router = useRouter()
    const back = useSelector(state => state.backReducer.value.isBack)

    const forward = {
        initial: { x: '100%', opacity: 0 },
        animate: { x: '0%', opacity: 1 },
        exit: { x: '-100%', opacity: 0 }
    }

    const backward = {
        initial: { x: '-100%', opacity: 0 },
        animate: { x: '0%', opacity: 1 },
        exit: { x: '100%', opacity: 0 }
    }

    return(
        <div className="bg-white overflow-x-hidden p-8 md:px-16 min-h-screen min-w-screen">
            <Header pathname={router.pathname} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={router.pathname} 
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={!back ? forward : backward}
                    transition={{ ease: "easeIn", duration: 0.3 }}
                >
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default AppChild;