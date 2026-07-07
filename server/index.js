import express from 'express'
import cors from 'cors'
import gameRoutes from './routes/game.js'

const app = express()
const port = Number(process.env.API_PORT ?? 4000)

app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({ ok: true })
})

app.use('/api/game', gameRoutes)

app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Not found' })
})

// eslint-disable-next-line no-unused-vars -- Express identifies error middleware by arity (4 params)
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
})

app.listen(port, () => {
    console.log(`Game API listening on http://localhost:${port}`)
})
