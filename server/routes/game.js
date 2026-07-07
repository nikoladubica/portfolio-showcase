import { Router } from 'express'
import pool from '../db.js'

const router = Router()

router.get('/islands', async (req, res, next) => {
    try {
        const [islands] = await pool.query(
            `SELECT id, slug, name, description, url, sort_order, map_x, map_y
             FROM islands
             WHERE active = 1
             ORDER BY sort_order ASC`
        )

        const [discoverables] = await pool.query(
            `SELECT id, island_id, name, type, points, hint, pos_x, pos_y
             FROM discoverables
             WHERE island_id IN (SELECT id FROM islands WHERE active = 1)`
        )

        const byIsland = new Map()
        for (const row of discoverables) {
            if (!byIsland.has(row.island_id)) byIsland.set(row.island_id, [])
            byIsland.get(row.island_id).push({
                id: row.id,
                name: row.name,
                type: row.type,
                points: row.points,
                hint: row.hint,
                posX: row.pos_x === null ? null : Number(row.pos_x),
                posY: row.pos_y === null ? null : Number(row.pos_y),
            })
        }

        res.json(
            islands.map((island) => ({
                id: island.id,
                slug: island.slug,
                name: island.name,
                description: island.description,
                url: island.url,
                sortOrder: island.sort_order,
                mapX: Number(island.map_x),
                mapY: Number(island.map_y),
                discoverables: byIsland.get(island.id) ?? [],
            }))
        )
    } catch (err) {
        next(err)
    }
})

export default router
