import * as React from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { trpc } from '../router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ context: { trpc, queryClient }, params: { postId } }) => {
    await queryClient.ensureQueryData(trpc.post.queryOptions(postId))
  },
  pendingComponent: () => (
    <div className="p-2">Post data is pending from Route loader...</div>
  ),
  component: DashboardPostsPostIdComponent,
})

function DashboardPostsPostIdComponent() {
  const { postId } = Route.useParams()
  const { data: post, isPending } = useQuery(trpc.post.queryOptions(postId))

  if (isPending) {
    return (
      <div className="p-2">
        This pending state inside the component should never show
      </div>
    )
  }

  if (!post) {
    return <div className="p-2">Post not found</div>
  }

  return (
    <div className={'p-2'}>
      <Link to={'/'} className="text-blue-700">
        {'<-'} Back to Overview
      </Link>
      <div className="space-y-2 mt-2" key={post.id}>
        <div className="space-y-2">
          <h2 className="font-bold text-lg">
            <input
              defaultValue={post.id}
              className="border border-opacity-50 rounded p-2 w-full"
              disabled
            />
          </h2>
          <div>
            <textarea
              defaultValue={post.title}
              rows={6}
              className="border border-opacity-50 p-2 rounded w-full"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  )
}
