import Link from "next/link"
import { clearBack } from "../redux/features/back-slice"
import { useDispatch } from "react-redux"
import { motion } from "framer-motion"

const Hero = () => {
  const dispatch = useDispatch()

  const forwardClickHandler = () => {
    dispatch(clearBack())
  }

  return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="mb-24">
            <p className="relative text-black font-medium text-sm md:text-xl mb-2">
              <motion.span key={1}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-0 left-0 animate-wiggle">👋</motion.span> 
              <motion.span key={2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="ml-5 md:ml-7">Hello, I am</motion.span>
            </p>
            <h1 className="font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-main to-rose-main text-5xl md:text-8xl">Nikola Čučuković</h1>
            
            <motion.p key={3}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-black text-lg md:text-2xl font-medium mt-2">A Front-End Developer ✏️</motion.p>
        </div>

        <Link href='/projects' onClick={forwardClickHandler}>
          <motion.button key={4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex items-center justify-center gap-2 w-full rounded-2xl bg-blue-main hover:bg-rose-main transition-colors duration-300 px-8 py-4 text-white font-bold text-center">
            <span>See My Work</span>
            <img src="/img/icons/arrow-left-white.svg" className="rotate-180" height='24' width='24' />
          </motion.button>
        </Link>
      </div>
  )
} 

export default Hero