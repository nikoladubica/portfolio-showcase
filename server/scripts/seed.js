import pool from '../db.js'
import { projects } from '../../src/data/projects.js'

const TAG_TYPE = {
    Laravel: 'technology',
    'Vanilla JS': 'technology',
    React: 'technology',
    'Inertia.js': 'technology',
    'Alpine.js': 'technology',
    TypeScript: 'technology',
    Redux: 'technology',
    Zustand: 'technology',
    'Tanstack Query': 'technology',
    MySQL: 'technology',
    Tailwind: 'technology',
    Docker: 'tool',
    'CI/CD': 'tool',
    Swiper: 'tool',
}

const POINTS = { technology: 5, tool: 1 }

// Rough winding path across the map (% of a 1280x720 parchment), one point per island in order.
const MAP_POSITIONS = [
    { x: 15, y: 78 },
    { x: 30, y: 48 },
    { x: 48, y: 68 },
    { x: 62, y: 32 },
    { x: 78, y: 56 },
    { x: 90, y: 22 },
]

function slugify(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

async function main() {
    for (const [index, project] of projects.entries()) {
        const slug = slugify(project.name)
        const position = MAP_POSITIONS[index] ?? { x: 50, y: 50 }
        const sortOrder = index + 1

        await pool.query(
            `INSERT INTO islands (slug, name, description, url, sort_order, map_x, map_y, active)
             VALUES (?, ?, ?, ?, ?, ?, ?, 1)
             ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                description = VALUES(description),
                url = VALUES(url),
                sort_order = VALUES(sort_order),
                map_x = VALUES(map_x),
                map_y = VALUES(map_y),
                active = 1`,
            [slug, project.name, project.description, project.url, sortOrder, position.x, position.y]
        )

        const [[island]] = await pool.query('SELECT id FROM islands WHERE slug = ?', [slug])

        await pool.query('DELETE FROM discoverables WHERE island_id = ?', [island.id])

        const rows = project.tags.map((tag) => {
            const type = TAG_TYPE[tag] ?? 'tool'
            return [island.id, tag, type, POINTS[type], null, null, null]
        })

        if (rows.length > 0) {
            await pool.query(
                'INSERT INTO discoverables (island_id, name, type, points, hint, pos_x, pos_y) VALUES ?',
                [rows]
            )
        }

        console.log(`Seeded "${project.name}" (${slug}) with ${rows.length} discoverables.`)
    }

    await pool.end()
    console.log('Seed complete.')
}

main().catch((err) => {
    console.error('Seed failed:', err.message)
    process.exit(1)
})
