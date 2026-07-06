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
        tags: ['Laravel', 'Vanilla JS', 'Tailwind', 'Swiper', 'Docker'],
        // ☞ DRAFT - every ☞ line below is an inference from the public site/stack and
        // must be confirmed or corrected by Nikola before this ships (see acceptance criteria).
        caseStudy: {
            role: '☞ Front-end developer - confirm exact role, team size, and how long you have owned it',
            problem:
                '☞ A head-to-head competition platform where matches, standings and results all have to feel instant on a phone. Confirm the real problem: was it real-time scoring, tournament scale, or something else?',
            highlights: [
                '☞ Built the mobile-first interface in Vanilla JS and Tailwind for fast first paint - confirm which screens were yours',
                '☞ Used Swiper for the match / bracket browsing experience - confirm',
                '☞ Worked inside a Dockerised setup for consistent builds - confirm how involved you were in DevOps',
            ],
            outcome:
                '☞ A measurable or observable result - load time, active players, tournaments run, or simply that it has stayed live and maintained since 2020.',
        },
    },
    {
        no: 'No. 02 · 2022 - present',
        name: 'Premium Switzerland',
        status: 'Live',
        image: '/img/projects/premiumswitzerland.webp',
        url: 'https://www.premiumswitzerland.com',
        description:
            'A luxury-travel presence for the Swiss market - presentations of luxury properties, best boarding schools and private clinics.',
        tags: ['Laravel', 'Vanilla JS', 'React', 'Tailwind'],
        // ☞ DRAFT - flagship. Confirm/replace every ☞ line before shipping.
        caseStudy: {
            role: '☞ Front-end lead, team of N - confirm role and team size',
            problem:
                '☞ A luxury-travel brand needed a polished, trust-building presence for the Swiss market - properties, boarding schools and private clinics presented to a discerning, high-net-worth audience where design quality signals credibility. Confirm the real brief and constraints.',
            highlights: [
                '☞ Led the front-end build, pairing a Laravel back-end with React islands where interactivity was needed - confirm the split',
                '☞ Delivered a bespoke, editorial presentation of premium listings - confirm what you specifically owned',
                '☞ A concrete decision or number: performance, responsive breakpoints, CMS-driven content, or reuse across the brand - confirm',
            ],
            outcome:
                '☞ Measurable or observable result - conversion, enquiry volume, page speed, or that it has run and grown as the brand flagship since 2022.',
        },
    },
    {
        no: 'No. 03 · 2025 - present',
        name: 'My Premium Europe',
        status: 'Live',
        image: '/img/projects/mypremiumeurope.webp',
        url: 'https://mypremiumeurope.com',
        description:
            'A sister site extending the luxury-travel brand across the wider European market, with improved design and better technologies.',
        tags: ['React', 'Inertia.js', 'Alpine.js', 'Tailwind', 'CI/CD'],
        // ☞ DRAFT - confirm/replace every ☞ line before shipping.
        caseStudy: {
            role: '☞ Front-end developer - confirm role and team size',
            problem:
                '☞ Extend the Premium Switzerland brand across the wider European market on a modernised stack, without losing the editorial polish that defines it. Confirm the real driver for the sister site.',
            highlights: [
                '☞ Rebuilt the experience on React + Inertia.js with Alpine.js for lightweight interactivity - confirm the architecture choice was yours',
                '☞ Carried the brand design system across from the Swiss flagship - confirm',
                '☞ Set up CI/CD for the deploys - confirm your involvement',
            ],
            outcome:
                '☞ Measurable or observable result - new markets reached, improved speed vs the older site, or launch timeline.',
        },
    },
    {
        no: 'No. 04 · 2023 - 2024',
        name: 'PastorsLine',
        status: 'Live',
        image: '/img/projects/pastorsline.webp',
        url: 'https://pastorsline.com',
        description:
            'A messaging & outreach platform front-end - dashboard views, contact management, and campaign tools built for daily-use reliability.',
        tags: ['React', 'Redux', 'TypeScript', 'Docker'],
        // ☞ DRAFT - flagship. Confirm/replace every ☞ line before shipping.
        caseStudy: {
            role: '☞ Front-end developer on the product team - confirm role and team size',
            problem:
                '☞ A messaging and outreach platform used daily by churches to reach their congregations - the front-end had to stay reliable and legible across dashboards, contact management and campaign tooling for non-technical users. Confirm the real challenge.',
            highlights: [
                '☞ Built dashboard, contact-management and campaign views in React + Redux with TypeScript for type safety at scale - confirm which areas were yours',
                '☞ A concrete decision or number: state architecture, number of screens, or a reliability/quality win - confirm',
                '☞ Worked in a Dockerised environment alongside the wider team - confirm',
            ],
            outcome:
                '☞ Measurable or observable result - users served, message volume, uptime/reliability, or features shipped over 2023-2024.',
        },
    },
    {
        no: 'No. 05 · 2026',
        name: 'Maler Xpress',
        status: 'Live',
        image: '/img/projects/maler-xpress.webp',
        url: 'https://maler-xpress.ch',
        description:
            'A marketplace for Swiss painters - full-stack and DevOps work: project setup from zero, a full CMS, and a smart matching algorithm.',
        tags: ['React', 'Tanstack Query', 'Tailwind', 'Laravel', 'MySQL', 'CI/CD'],
        // ☞ DRAFT - flagship. Confirm/replace every ☞ line before shipping.
        caseStudy: {
            role: '☞ Full-stack + DevOps, project set up from zero - confirm role and whether you led',
            problem:
                '☞ Swiss homeowners and professional painters needed a single marketplace to find each other - built from nothing, it needed a public marketplace, a CMS to run it, and a way to match jobs to the right painters. Confirm the real brief.',
            highlights: [
                '☞ Set the project up from zero - React + Tanstack Query front-end on a Laravel + MySQL back-end - confirm',
                '☞ Built a full CMS to administer listings and content - confirm scope',
                '☞ Designed a smart matching algorithm to pair jobs with painters - confirm what it optimises for',
            ],
            outcome:
                '☞ Measurable or observable result - painters onboarded, jobs matched, time-to-launch, or that it went from zero to production in 2026.',
        },
    },
    {
        no: 'No. 06 · 2025 - present',
        name: 'ZR Bus',
        status: 'Live',
        image: '/img/projects/zr-bus.webp',
        url: 'https://zrbus.ddns.net',
        description:
            'A city-wide "next bus" information site - a personal project, built to give something back to my city.',
        tags: ['React', 'Zustand', 'Tailwind', 'MySQL', 'CI/CD'],
        // ☞ DRAFT - personal project. Confirm/replace every ☞ line before shipping.
        caseStudy: {
            role: 'Solo build - personal project. ☞ Confirm this is entirely your own work',
            problem:
                '☞ The city had no good public-transport app, so residents had no easy way to know when the next bus was coming. A self-initiated project to fill that gap. Confirm the framing.',
            highlights: [
                '☞ Built the "next bus" experience in React with Zustand for state - confirm',
                '☞ Backed by MySQL for the route / timetable data - confirm the data source',
                '☞ Wired up CI/CD so updates deploy automatically - confirm',
            ],
            outcome:
                '☞ Observable result - residents using it, routes covered, or simply that the city now has a working next-bus site where it had none.',
        },
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
