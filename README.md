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

## Running the backend (game)

The "Get to Know Me" game (`game.html`) is backed by an Express + MariaDB API in `server/`,
kept out of the main app's `package.json` and bundle.

```bash
# MariaDB, if you don't already have it running:
brew install mariadb && brew services start mariadb
# or: docker run -d -p 3306:3306 -e MARIADB_ROOT_PASSWORD= -e MARIADB_ALLOW_EMPTY_ROOT_PASSWORD=yes mariadb:11

cp .env.example .env   # fill in DB_* vars for your local MariaDB
cd server
npm install
npm run db:setup       # creates the database + tables
npm run db:seed        # seeds islands/discoverables from src/data/projects.js
npm run dev            # http://localhost:4000, auto-restarts on change (node --watch)
```

`db:seed` is idempotent — re-running it re-syncs islands/discoverables from
`src/data/projects.js` without touching the `scores` table or duplicating rows.
