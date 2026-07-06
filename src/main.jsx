import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { MotionConfig } from "framer-motion"
import App from "./App"

// Only the weights/styles actually rendered are imported. Audited against src/ and
// index.css: Cormorant Garamond uses 400/400-italic (masthead, footer, display italic),
// 500 (font-medium headings), 600 (font-semibold + h1-h4 default); EB Garamond uses
// 400/400-italic (body + serif italic); Courier Prime uses 400 (font-mono, buttons);
// UnifrakturCook uses 700 (blackletter dropcap + section headings).
import "@fontsource/cormorant-garamond/400.css"
import "@fontsource/cormorant-garamond/400-italic.css"
import "@fontsource/cormorant-garamond/500.css"
import "@fontsource/cormorant-garamond/600.css"
import "@fontsource/eb-garamond/400.css"
import "@fontsource/eb-garamond/400-italic.css"
import "@fontsource/courier-prime/400.css"
import "@fontsource/unifrakturcook/700.css"

import "./index.css"

const appTree = (
    <StrictMode>
        <MotionConfig reducedMotion="user">
            <App />
        </MotionConfig>
    </StrictMode>
)

if (typeof window !== "undefined") {
    const target = document.getElementById("root")
    // Dev server never runs the prerender step (target starts empty), so a plain
    // mount is correct there. The production build ships prerendered markup in
    // dist/index.html, so the client must hydrate onto it instead of re-rendering.
    import.meta.env.DEV ? createRoot(target).render(appTree) : hydrateRoot(target, appTree)
}

export async function prerender() {
    const { renderToString } = await import("react-dom/server")
    return { html: renderToString(appTree) }
}
