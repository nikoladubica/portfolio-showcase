// Single source of truth for the broadsheet's Works and Skills sections.

export const projects = [
    {
        no: 'No. 01 · 2020 - present',
        name: 'One Versus One',
        status: 'Live',
        image: '/img/projects/one-versus-one.png',
        url: 'https://www.one-versus-one.com',
        description:
            'A head-to-head competition platform. Front-end optimized for speed, fast loading and a responsive mobile-first interface.',
        tags: ['Laravel', 'Vanilla JS', 'Tailwind', 'Swiper', 'Docker']
    },
    {
        no: 'No. 02 · 2022 - present',
        name: 'Premium Switzerland',
        status: 'Live',
        image: '/img/projects/premiumswitzerland.png',
        url: 'https://www.premiumswitzerland.com',
        description:
            'A luxury-travel presence for the Swiss market - presentations of luxury properties, best boarding schools and private clinics.',
        tags: ['Laravel', 'Vanilla JS', 'React', 'Tailwind']
    },
    {
        no: 'No. 03 · 2025 - present',
        name: 'My Premium Europe',
        status: 'Live',
        image: '/img/projects/mypremiumeurope.png',
        url: 'https://mypremiumeurope.com',
        description:
            'A sister site extending the luxury-travel brand across the wider European market, with improved design and better technologies.',
        tags: ['React', 'Inertia.js', 'Alpine.js', 'Tailwind', 'CI/CD']
    },
    {
        no: 'No. 04 · 2023 - 2024',
        name: 'PastorsLine',
        status: 'Live',
        image: '/img/projects/pastorsline.png',
        url: 'https://pastorsline.com',
        description:
            'A messaging & outreach platform front-end - dashboard views, contact management, and campaign tools built for daily-use reliability.',
        tags: ['React', 'Redux', 'TypeScript', 'Docker']
    },
    {
        no: 'No. 05 · 2026',
        name: 'Maler Xpress',
        status: 'Live',
        image: '/img/projects/maler-xpress.png',
        url: 'https://maler-xpress.ch',
        description:
            'A market place for Swiss painters - Full-Stack and DevOps work, setting up the whole project, full CMS system and a smart algorithm.',
        tags: ['React', 'Tanstack Query', 'Tailwind', 'Laravel', 'MySQL', 'CI/CD']
    },
    {
        no: 'No. 06 · 2025 - present',
        name: 'ZR Bus',
        status: 'Live',
        image: '/img/projects/zr-bus.png',
        url: 'https://zrbus.ddns.net',
        description:
            'City wide "next bus" information type website - a personal project as something to give back to my city.',
        tags: ['React', 'Zustand', 'Tailwind', 'MySQL', 'CI/CD']
    }
]

// ☞ Replace with real repositories
export const openSourceProjects = [
    {
        name: 'c-calendar',
        url: 'https://github.com/nikoladubica/c-calendar',
        description: 'No-AI, only small documentation, hand coded project - something to keep the brain cells working.',
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
        description: 'Simple app that uses OpenAI, Claude or Gemini API key and allow the users to create metas for their website.',
        tags: ['React', 'Node.js', 'MySQL']
    }
]

export const stats = [
    { val: '50+', lab: 'Interviews Done' },
    { val: '1000+', lab: 'Hours of Learning' },
    { val: '∞', lab: 'Cups of Coffee' },
    { val: '5+', lab: 'Years Shipping' },
    { val: '10+', lab: 'Projects Delivered' },
    { val: '4', lab: 'Open-Source Repos' },
    { val: '99+', lab: 'Ideas Yet to start' },
    { val: '3', lab: 'Products Coming' },
]

export const skills = [
    {
        glyph: '❦',
        num: 'I.',
        title: 'Front‑End Craft',
        clead: 'Fast, accessible, maintainable.',
        img: '/img/skills/frontend-old.jpg',
        items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Laravel', 'Alpine.js'],
        plate: 'I · Front-End'
    },
    {
        glyph: '✦',
        num: 'II.',
        title: 'Lead & Manage',
        clead: 'Shipping is a team sport.',
        img: '/img/skills/leadership-old.jpg',
        items: ['Team Leadership', 'Mentorship', 'Client Relations', 'Code Review', 'Agile & Scrum', 'Project Management'],
        plate: 'II · Leadership'
    },
    {
        glyph: '§',
        num: 'III.',
        title: 'AI & Automation',
        clead: 'Building with agents & LLMs.',
        img: '/img/skills/intelligence-old.jpg',
        items: ['AI Agents', 'LLM Integration', 'AI Project Workflows', 'Prompt Engineering', 'AI-Assisted Dev', 'Automation'],
        plate: 'III · Intelligence'
    }
]
