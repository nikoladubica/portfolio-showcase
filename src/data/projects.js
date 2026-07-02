// Single source of truth for the broadsheet's Works and Skills sections.

export const projects = [
    {
        no: 'No. 01 · 2024',
        name: 'One Versus One',
        status: 'Live',
        image: '/img/projects/one-versus-one.png',
        url: 'https://www.one-versus-one.com',
        description:
            'A head-to-head competition platform. Front-end built for fast, animated match flows and a responsive mobile-first interface.',
        tags: ['React', 'Next.js', 'Framer Motion', 'Redux']
    },
    {
        no: 'No. 02 · 2023',
        name: 'Premium Switzerland',
        status: 'Live',
        image: '/img/projects/premiumswitzerland.png',
        url: 'https://www.premiumswitzerland.com',
        description:
            'A bespoke luxury-travel presence for the Swiss market — editorial layouts, refined typography, and a polished booking journey.',
        tags: ['Next.js', 'TypeScript', 'Tailwind']
    },
    {
        no: 'No. 03 · 2023',
        name: 'My Premium Europe',
        status: 'Live',
        image: '/img/projects/mypremiumeurope.png',
        url: '#',
        description:
            'A sister site extending the luxury-travel brand across the wider European market, with a shared design system and localized booking flows.',
        tags: ['Next.js', 'TypeScript', 'Tailwind']
    },
    {
        no: 'No. 04 · 2023',
        name: 'PastorsLine',
        status: 'Live',
        image: '/img/projects/pastorsline.png',
        url: '#',
        description:
            'A messaging & outreach platform front-end — dashboard views, contact management, and campaign tools built for daily-use reliability.',
        tags: ['React', 'Redux', 'Tailwind']
    },
    {
        no: 'No. 05 · 2022',
        name: 'Maler Xpress',
        status: 'Live',
        image: '/img/projects/maler-xpress.png',
        url: '#',
        description:
            'A local trades service site for a Swiss painting company — clear service listings, quote requests, and a fast, mobile-first layout.',
        tags: ['React', 'Tailwind']
    },
    {
        no: 'No. 06 · 2022',
        name: 'ZR Bus',
        status: 'Live',
        image: '/img/projects/zr-bus.png',
        url: '#',
        description:
            'A regional coach & shuttle booking site — route search, schedules, and a streamlined ticket-booking journey for everyday commuters.',
        tags: ['React', 'Next.js', 'Swiper']
    }
]

// ☞ Replace with real repositories
export const openSourceProjects = [
    {
        name: 'antique-ui-kit',
        url: 'https://github.com/nikoladubica/antique-ui-kit',
        description: 'A small React component library exploring the broadsheet aesthetic used on this site.',
        tags: ['React', 'Vite']
    },
    {
        name: 'eslint-config-nc',
        url: 'https://github.com/nikoladubica/eslint-config-nc',
        description: 'Shareable ESLint config for React + Next.js projects, tuned for readability over strictness.',
        tags: ['ESLint', 'Node']
    },
    {
        name: 'redux-slice-utils',
        url: 'https://github.com/nikoladubica/redux-slice-utils',
        description: 'A handful of small helpers for trimming boilerplate out of Redux Toolkit slices.',
        tags: ['Redux Toolkit', 'TypeScript']
    }
]

export const stats = [
    { val: '8+', lab: 'Years Shipping' },
    { val: '40+', lab: 'Projects Delivered' },
    { val: '12', lab: 'Open-Source Repos' },
    { val: '∞', lab: 'Cups of Coffee' }
]

export const skills = [
    {
        glyph: '❦',
        num: 'I.',
        title: 'Front‑End Craft',
        clead: 'Fast, accessible, maintainable.',
        items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux Toolkit'],
        plate: 'I · Front-End'
    },
    {
        glyph: '✦',
        num: 'II.',
        title: 'Lead & Manage',
        clead: 'Shipping is a team sport.',
        items: ['Team Leadership', 'Mentorship', 'Client Relations', 'Code Review', 'Agile & Scrum'],
        plate: 'II · Leadership'
    },
    {
        glyph: '§',
        num: 'III.',
        title: 'AI & Automation',
        clead: 'Building with agents & LLMs.',
        items: ['AI Agents', 'LLM Integration', 'RAG Pipelines', 'Prompt Engineering', 'AI-Assisted Dev'],
        plate: 'III · Intelligence'
    }
]
