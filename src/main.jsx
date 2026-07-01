import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ReduxProvider } from "./redux/provider"
import App from "./App"

import "@fontsource/cormorant-garamond/300.css"
import "@fontsource/cormorant-garamond/300-italic.css"
import "@fontsource/cormorant-garamond/400.css"
import "@fontsource/cormorant-garamond/400-italic.css"
import "@fontsource/cormorant-garamond/500.css"
import "@fontsource/cormorant-garamond/500-italic.css"
import "@fontsource/cormorant-garamond/600.css"
import "@fontsource/cormorant-garamond/600-italic.css"
import "@fontsource/cormorant-garamond/700.css"
import "@fontsource/cormorant-garamond/700-italic.css"
import "@fontsource/eb-garamond/400.css"
import "@fontsource/eb-garamond/400-italic.css"
import "@fontsource/eb-garamond/500.css"
import "@fontsource/eb-garamond/500-italic.css"
import "@fontsource/eb-garamond/600.css"
import "@fontsource/eb-garamond/600-italic.css"
import "@fontsource/courier-prime/400.css"
import "@fontsource/courier-prime/400-italic.css"
import "@fontsource/courier-prime/700.css"
import "@fontsource/courier-prime/700-italic.css"
import "@fontsource/unifrakturcook/700.css"

import "./index.css"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ReduxProvider>
            <div className="app-root">
                <App />
            </div>
        </ReduxProvider>
    </StrictMode>
)
