import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { trpc } from '../router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  const postsQuery = useQuery(trpc.posts.queryOptions())
  const posts = postsQuery.data || []
  return (
    <div className={`p-2`}>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <Link
              to="/posts/$postId"
              params={{ postId: post.id }}
              preload={false}
              className="block py-2 px-3 text-blue-700"
            >
              #{post.id} - {post.title}{' '}
            </Link>
          </div>
        )
      })}
    </div>
  )
}
