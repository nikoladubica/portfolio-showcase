import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { MotionConfig } from "framer-motion"
import GamePage from "./GamePage"

import "@fontsource/cormorant-garamond/400.css"
import "@fontsource/cormorant-garamond/400-italic.css"
import "@fontsource/cormorant-garamond/500.css"
import "@fontsource/cormorant-garamond/600.css"
import "@fontsource/eb-garamond/400.css"
import "@fontsource/eb-garamond/400-italic.css"
import "@fontsource/courier-prime/400.css"
import "@fontsource/unifrakturcook/700.css"

import "../index.css"

const target = document.getElementById("game-root")

createRoot(target).render(
    <StrictMode>
        <MotionConfig reducedMotion="user">
            <GamePage />
        </MotionConfig>
    </StrictMode>
)
