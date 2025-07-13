import path from 'node:path'
import url from 'node:url'
import * as fs from 'node:fs'
import express from 'express'
import { trpcMiddleWare } from './trpc'

const PORT =
  typeof process.env.PORT !== 'undefined'
    ? parseInt(process.env.PORT, 10)
    : 3000

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const createServer = async (
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
) => {
  const app = express()

  app.use('/trpc', trpcMiddleWare)

  if (!isProd) {
    const vite = await import('vite')
    const viteServer = await vite.createServer({
      root,
      logLevel: 'info',
      server: {
        middlewareMode: true,
      },
      appType: 'custom',
    })

    // Use vite's connect instance as middleware
    app.use(viteServer.middlewares)

    // Handle any requests that don't match an API route by serving the React app's index.html
    app.get('*', async (req, res, next) => {
      try {
        let html = fs.readFileSync(path.resolve(root, 'index.html'), 'utf-8')

        // Transform HTML using Vite plugins.
        html = await viteServer.transformIndexHtml(req.url, html)

        res.send(html)
      } catch (e) {
        return next(e)
      }
    })

    return { app }
  } else {
    app.use(express.static(path.resolve(__dirname, '../client')))

    // Handle any requests that don't match an API route by serving the React app's index.html
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client', 'index.html'))
    })
  }

  return { app }
}

createServer().then(({ app }) =>
  app.listen(PORT, () => {
    console.info(`Server available at: http://localhost:${PORT}`)
  }),
)
