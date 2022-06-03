import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import { GET_POST_BY_POST_ID } from '../graphql/queries'
import Post from './Post'

type Props = {
  postId: string
}

function Test({ postId }: Props) {
  const router = useRouter()
  const { data, error, loading } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: postId,
    },
  })

  const post: Post = data?.getPostListByPostId

  console.log(post);

  return (
    <div>
      <Post post={post} />
    </div>
  )
}

export default Test
