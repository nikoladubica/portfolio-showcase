import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

const Page = ({ children }) => {
    const [isVisible, setVisible] = useState(true)
    const back = useSelector(state => state.backReducer.value.isBack)
    const router = useRouter()

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

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.main
                    key={router.pathname} 
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={!back ? forward : backward}
                    transition={{ ease: "easeIn", duration: 0.3 }}
                    className='relative h-[calc(100vh-88px)]'
                >
                    {children}
                </motion.main>
            )}
        </AnimatePresence>
    )
}

export default Page;