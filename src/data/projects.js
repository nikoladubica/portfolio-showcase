// Single source of truth for the broadsheet's Works and Skills sections.

export const projects = [
    {
        no: 'No. 01 · 2020 - present',
        name: 'One Versus One',
        status: 'Live',
        image: '/img/projects/one-versus-one.webp',
        url: 'https://www.one-versus-one.com',
        description:
            'A head-to-head competition platform. Front-end optimized for speed, fast loading and a responsive mobile-first interface.',
        tags: ['Laravel', 'Vanilla JS', 'Tailwind', 'Swiper', 'Docker']
    },
    {
        no: 'No. 02 · 2022 - present',
        name: 'Premium Switzerland',
        status: 'Live',
        image: '/img/projects/premiumswitzerland.webp',
        url: 'https://www.premiumswitzerland.com',
        description:
            'A luxury-travel presence for the Swiss market - presentations of luxury properties, best boarding schools and private clinics.',
        tags: ['Laravel', 'Vanilla JS', 'React', 'Tailwind']
    },
    {
        no: 'No. 03 · 2025 - present',
        name: 'My Premium Europe',
        status: 'Live',
        image: '/img/projects/mypremiumeurope.webp',
        url: 'https://mypremiumeurope.com',
        description:
            'A sister site extending the luxury-travel brand across the wider European market, with improved design and better technologies.',
        tags: ['React', 'Inertia.js', 'Alpine.js', 'Tailwind', 'CI/CD']
    },
    {
        no: 'No. 04 · 2023 - 2024',
        name: 'PastorsLine',
        status: 'Live',
        image: '/img/projects/pastorsline.webp',
        url: 'https://pastorsline.com',
        description:
            'A messaging & outreach platform front-end - dashboard views, contact management, and campaign tools built for daily-use reliability.',
        tags: ['React', 'Redux', 'TypeScript', 'Docker']
    },
    {
        no: 'No. 05 · 2026',
        name: 'Maler Xpress',
        status: 'Live',
        image: '/img/projects/maler-xpress.webp',
        url: 'https://maler-xpress.ch',
        description:
            'A marketplace for Swiss painters - full-stack and DevOps work: project setup from zero, a full CMS, and a smart matching algorithm.',
        tags: ['React', 'Tanstack Query', 'Tailwind', 'Laravel', 'MySQL', 'CI/CD']
    },
    {
        no: 'No. 06 · 2025 - present',
        name: 'ZR Bus',
        status: 'Live',
        image: '/img/projects/zr-bus.webp',
        url: 'https://zrbus.ddns.net',
        description:
            'A city-wide "next bus" information site - a personal project, built to give something back to my city.',
        tags: ['React', 'Zustand', 'Tailwind', 'MySQL', 'CI/CD']
    }
]

export const openSourceProjects = [
    {
        name: 'c-calendar',
        url: 'https://github.com/nikoladubica/c-calendar',
        description: 'No-AI, only small documentation, hand-coded project - something to keep the brain cells working.',
        tags: ['Programming Language C']
    },
    {
        name: 'zr-bus',
        url: 'https://github.com/nikoladubica/zr-bus',
        description: 'A project for my city, that everyone can join - since we have no good transportation app, I decided to make one.',
        tags: ['React', 'Node.js', 'MySQL', 'CI/CD']
    },
    {
        name: 'meta-ai-builder',
        url: 'https://github.com/nikoladubica/meta-ai-builder',
        description: 'A small app that takes an OpenAI, Claude, or Gemini API key and lets users generate meta tags for their website.',
        tags: ['React', 'Node.js', 'MySQL']
    }
]

// ☞ Placeholder values - confirm real numbers with Nikola before shipping (marked ☞ below).
// Open-Source Repos is derived from openSourceProjects.length so it can never drift from the list.
export const stats = [
    { val: '3', lab: 'Countries Served' },        // ☞ placeholder
    { val: '8', lab: 'Sites Maintained' },        // ☞ placeholder
    { val: '∞', lab: 'Cups of Coffee' },
    { val: '5+', lab: 'Years Shipping' },
    { val: '10+', lab: 'Projects Delivered' },
    { val: String(openSourceProjects.length), lab: 'Open-Source Repos' },
    { val: '6', lab: 'Production Sites Live' },    // ☞ placeholder
    { val: '12', lab: 'Happy Clients' },          // ☞ placeholder
]

// ☞ Placeholder quotes - replace with real, permission-cleared testimonials before shipping.
// The Testimonials component (src/components/testimonials.jsx) is intentionally NOT mounted in
// App.jsx until these are real. Do not ship placeholder praise.
export const testimonials = [
    { quote: '…', name: '…', role: '…', company: '…' },
]

export const skills = [
    {
        glyph: '❦',
        num: 'I.',
        title: 'Front‑End Craft',
        clead: 'Fast, accessible, maintainable.',
        img: '/img/skills/frontend-old.webp',
        items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Laravel', 'Alpine.js'],
        plate: 'I · Front-End'
    },
    {
        glyph: '✦',
        num: 'II.',
        title: 'Lead & Manage',
        clead: 'Shipping is a team sport.',
        img: '/img/skills/leadership-old.webp',
        items: ['Team Leadership', 'Mentorship', 'Client Relations', 'Code Review', 'Agile & Scrum', 'Project Management'],
        plate: 'II · Leadership'
    },
    {
        glyph: '§',
        num: 'III.',
        title: 'AI & Automation',
        clead: 'Building with agents & LLMs.',
        img: '/img/skills/intelligence-old.webp',
        items: ['AI Agents', 'LLM Integration', 'AI Project Workflows', 'Prompt Engineering', 'AI-Assisted Dev', 'Automation'],
        plate: 'III · Intelligence'
    }
]
