# portfolio-showcase

Personal portfolio site for **Nikola Čučuković**, a Front-End Developer. A single-page React app with an antique-broadsheet design system. Frontend only — no backend, no router.

## Stack

- **[React 19](https://react.dev/)** — function components and hooks
- **[Vite 8](https://vite.dev/)** — dev server and build tooling
- **[Tailwind CSS 4](https://tailwindcss.com/)** — configured in CSS via the `@theme` block in `src/index.css` (no `tailwind.config.js`)
- **[Redux Toolkit 2](https://redux-toolkit.js.org/)** + **React-Redux 9** — global UI state
- **[Framer Motion 12](https://www.framer.com/motion/)** — content and scroll animations
- **[Swiper 14](https://swiperjs.com/)** — carousels
- **[Fontsource](https://fontsource.org/)** — self-hosted fonts (Cormorant Garamond, EB Garamond, Courier Prime, UnifrakturCook)

## Getting Started

Requires Node `>=24` (see `.nvmrc`).

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (Vite's default port — check the terminal output if it picks another).

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server            |
| `npm run build`   | Production build to `dist/`          |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Structure

```
index.html            Vite entry, mounts #root
vite.config.js         Vite + React + Tailwind plugins

src/
  main.jsx             App bootstrap: createRoot, ReduxProvider, font + CSS imports
  App.jsx              Single-page composition of all sections
  index.css            Tailwind import, @theme design tokens, base styles
  components/          Section and shared UI components
  data/projects.js     Project data
  redux/               store, provider, ui-slice

public/
  img/                 Icons, project screenshots, skill imagery
  favicon.*, site.webmanifest
```

## Design System

An "antique broadsheet" theme built on Tailwind v4 tokens defined in `src/index.css` (`@theme`): paper and ink neutrals, oxblood / brass / verdigris accents, a serif/blackletter/mono type scale, and gilt-frame shadows. Note the documented Tailwind v4 Preflight caveats in that file before adding base CSS.

## Deployment

Build with `npm run build`; the static output in `dist/` can be served by any static host.
