import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "react-redux"

const Page = ({ children }) => {
    const router = useRouter()

    return (
        <main className='relative h-[calc(100vh-88px)]'>
            {children}
        </main>
    )
}

export default Page;