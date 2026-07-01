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
        image: '/img/projects/premium-switzerland.png',
        url: 'https://www.premiumswitzerland.com',
        description:
            'A bespoke luxury-travel presence for the Swiss market — editorial layouts, refined typography, and a polished booking journey.',
        tags: ['Next.js', 'TypeScript', 'Tailwind']
    },
    {
        no: 'No. 03 · 2023',
        name: 'Keys To Switzerland',
        status: 'Live',
        image: '/img/projects/keys-to-switzerland.png',
        url: 'https://www.keys-to-switzerland.com',
        description:
            'A concierge & property experience site. Component-driven build with careful attention to imagery, motion, and load performance.',
        tags: ['React', 'Next.js', 'Swiper']
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
