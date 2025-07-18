/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as PostsPostIdRouteImport } from './routes/posts.$postId'

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const PostsPostIdRoute = PostsPostIdRouteImport.update({
  id: '/posts/$postId',
  path: '/posts/$postId',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/posts/$postId': typeof PostsPostIdRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/posts/$postId': typeof PostsPostIdRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/posts/$postId': typeof PostsPostIdRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/posts/$postId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/posts/$postId'
  id: '__root__' | '/' | '/posts/$postId'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PostsPostIdRoute: typeof PostsPostIdRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/posts/$postId': {
      id: '/posts/$postId'
      path: '/posts/$postId'
      fullPath: '/posts/$postId'
      preLoaderRoute: typeof PostsPostIdRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PostsPostIdRoute: PostsPostIdRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
