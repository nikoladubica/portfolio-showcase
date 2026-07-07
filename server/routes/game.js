import { Router } from 'express'
import pool from '../db.js'

const router = Router()

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX = 5
// In-memory only — naive by design (see ticket notes); resets on server restart.
const submissionsByIp = new Map()

function isRateLimited(ip) {
    const now = Date.now()
    const entry = submissionsByIp.get(ip)

    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
        submissionsByIp.set(ip, { count: 1, windowStart: now })
        return false
    }

    if (entry.count >= RATE_LIMIT_MAX) return true

    entry.count += 1
    return false
}

function cleanPlayerName(name) {
    if (typeof name !== 'string') return ''
    // eslint-disable-next-line no-control-regex -- intentionally stripping control chars from user input
    return name.replace(/[\x00-\x1F\x7F]/g, '').trim().slice(0, 24)
}

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

router.post('/scores', async (req, res, next) => {
    try {
        if (isRateLimited(req.ip)) {
            return res.status(429).json({ error: 'Too many submissions from this address — try again later.' })
        }

        const { name, score, islandsCompleted, durationSeconds } = req.body ?? {}
        const cleanName = cleanPlayerName(name)

        if (cleanName.length < 2) {
            return res.status(422).json({ error: 'Name must be 2-24 characters.' })
        }
        if (!Number.isInteger(score) || score < 0) {
            return res.status(422).json({ error: 'Invalid score.' })
        }
        if (!Number.isInteger(islandsCompleted) || islandsCompleted < 0) {
            return res.status(422).json({ error: 'Invalid islandsCompleted.' })
        }
        if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
            return res.status(422).json({ error: 'Invalid durationSeconds.' })
        }

        const [activeIslands] = await pool.query('SELECT id FROM islands WHERE active = 1')
        const islandIds = activeIslands.map((row) => row.id)

        let maxScore = 0
        if (islandIds.length > 0) {
            const [[{ total }]] = await pool.query(
                'SELECT COALESCE(SUM(points), 0) AS total FROM discoverables WHERE island_id IN (?)',
                [islandIds]
            )
            maxScore = total
        }

        if (score > maxScore) {
            return res.status(422).json({ error: 'Score exceeds the maximum possible.' })
        }
        if (islandsCompleted > islandIds.length) {
            return res.status(422).json({ error: 'islandsCompleted exceeds the active island count.' })
        }
        if (durationSeconds < islandsCompleted * 5) {
            return res.status(422).json({ error: 'Duration is too short for the islands completed.' })
        }

        const [result] = await pool.query(
            'INSERT INTO scores (player_name, score, islands_completed, duration_seconds) VALUES (?, ?, ?, ?)',
            [cleanName, score, islandsCompleted, Math.round(durationSeconds)]
        )

        const [[{ rank }]] = await pool.query('SELECT COUNT(*) + 1 AS rank FROM scores WHERE score > ?', [score])

        res.status(201).json({
            id: result.insertId,
            name: cleanName,
            score,
            islandsCompleted,
            durationSeconds,
            rank,
        })
    } catch (err) {
        next(err)
    }
})

router.get('/leaderboard', async (req, res, next) => {
    try {
        const parsedLimit = parseInt(req.query.limit, 10)
        const limit = Math.min(25, Math.max(1, Number.isNaN(parsedLimit) ? 10 : parsedLimit))

        const [rows] = await pool.query(
            `SELECT player_name AS name, score, islands_completed AS islandsCompleted, created_at AS createdAt
             FROM scores
             ORDER BY score DESC, created_at ASC
             LIMIT ?`,
            [limit]
        )

        res.json(rows)
    } catch (err) {
        next(err)
    }
})

export default router
