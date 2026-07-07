import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import mysql from 'mysql2/promise'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const host = process.env.DB_HOST ?? '127.0.0.1'
const port = Number(process.env.DB_PORT ?? 3306)
const user = process.env.DB_USER ?? 'root'
const password = process.env.DB_PASSWORD ?? ''
const database = process.env.DB_NAME ?? 'portfolio_game'

async function main() {
    const connection = await mysql.createConnection({ host, port, user, password, multipleStatements: true })

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`)
    await connection.changeUser({ database })

    const schema = await readFile(path.join(__dirname, '..', 'schema.sql'), 'utf8')
    await connection.query(schema)

    await connection.end()
    console.log(`Database "${database}" is ready.`)
}

main().catch((err) => {
    console.error('Setup failed:', err.message)
    process.exit(1)
})
