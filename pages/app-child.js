import { useRouter } from "next/router"
import Header from "../components/header"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

const AppChild = ({ Component, pageProps }) => {
    const router = useRouter()
    const back = useSelector(state => state.backReducer.value.isBack)

    const forward = {
        initial: { x: '100%' },
        animate: { x: '0%' },
        exit: { x: '-100%' }
    }

    const backward = {
        initial: { x: '-100%' },
        animate: { x: '0%' },
        exit: { x: '100%' }
    }

    return(
        <div className="bg-white overflow-x-hidden p-8 md:px-16 min-h-screen min-w-screen">
            <AnimatePresence>
                <Header pathname={router.pathname} />

                <motion.div
                    key={router.pathname} 
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={!back ? forward : backward}
                    transition={{ type: "tween", duration: 0.4 }}
                >
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default AppChild;