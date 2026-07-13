import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { vitePrerenderPlugin } from "vite-prerender-plugin"

export default defineConfig({
    plugins: [react(), tailwindcss(), vitePrerenderPlugin({ renderTarget: "#root" })],
    build: {
        rollupOptions: {
            input: {
                main: "index.html",
                game: "game.html"
            }
        }
    }
})
