import { initTRPC } from '@trpc/server'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'

const createTRPContext = ({ req, res }: CreateExpressContextOptions) => ({})

type TRPCContext = Awaited<ReturnType<typeof createTRPContext>>

const t = initTRPC.context<TRPCContext>().create()

const POSTS = [
  { id: '1', title: 'First post' },
  { id: '2', title: 'Second post' },
]

export const appRouter = t.router({
  posts: t.procedure.query((_) => {
    return POSTS
  }),
  post: t.procedure.input(String).query(async (req) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return POSTS.find((p) => p.id === req.input)
  }),
})

export const trpcMiddleWare = createExpressMiddleware({
  router: appRouter,
  createContext: createTRPContext,
})

export type AppRouter = typeof appRouter
