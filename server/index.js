import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { byId, cardOf, detailOf, genres, homePayload, searchTitles, similarTo, titles } from './catalog.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')
const port = Number(process.env.PORT) || 3000

const app = express()
app.disable('x-powered-by')

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'orion-streaming', titles: titles.length })
})

app.get('/api/home', (_req, res) => {
  res.json(homePayload())
})

app.get('/api/genres', (_req, res) => {
  res.json({ genres })
})

app.get('/api/titles', (req, res) => {
  const { q, type, genre, sort, ids, limit } = req.query

  if (typeof ids === 'string' && ids.trim()) {
    const requested = ids
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)
    const items = requested.map((id) => byId.get(id)).filter(Boolean).map(cardOf)
    res.json({ total: items.length, items })
    return
  }

  const results = searchTitles({
    q: typeof q === 'string' ? q : '',
    type: type === 'movie' || type === 'series' ? type : 'all',
    genre: typeof genre === 'string' && genre !== '' ? genre : 'all',
    sort: typeof sort === 'string' ? sort : 'relevance',
  }).map(cardOf)

  const max = Number(limit)
  const items = Number.isFinite(max) && max > 0 ? results.slice(0, max) : results

  res.json({ total: results.length, items })
})

app.get('/api/titles/:id', (req, res) => {
  const title = byId.get(req.params.id)
  if (!title) {
    res.status(404).json({ error: 'title_not_found' })
    return
  }
  res.json({ title: detailOf(title), similar: similarTo(title) })
})

app.use(
  express.static(distDir, {
    index: false,
    maxAge: '1h',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache')
      }
    },
  }),
)

// SPA fallback: entrega index.html para rotas do cliente (inclusive a raiz "/").
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    next()
    return
  }
  if (req.path.startsWith('/api/')) {
    next()
    return
  }
  res.sendFile(path.join(distDir, 'index.html'), (error) => {
    if (error) next(error)
  })
})

app.use((req, res) => {
  res.status(404).json({ error: 'not_found', path: req.path })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`ORION+ disponível em http://0.0.0.0:${port} (${titles.length} títulos)`)
})
