import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
// import client from '../../apollo-client'
import Post from '../../components/Post'
import { GET_POST_BY_POST_ID } from '../../graphql/queries'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ADD_COMMENT } from '../../graphql/mutations'
import toast from 'react-hot-toast'
import { closeSync } from 'fs'
import Avatar from '../../components/Avatar'
import TimeAgo from 'react-timeago'

type FormData = {
  comment: string
}

function PostPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostListByPostId'],
  })

  const { data, error, loading } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const notification = toast.loading('Posting your comment ...')
    // post comment here
    try {
      // insert comment into comment table
      const {
        data: { insertComment: newComment },
      } = await addComment({
        variables: {
          post_id: router.query.postId,
          username: session?.user?.name,
          text: data.comment,
        },
      })

      console.log('New comment is added')
      console.log(newComment)

      setValue('comment', '')

      toast.success('Comment Successfully Posted', {
        id: notification,
      })
    } catch (error) {
      toast.error('Whoops something went wrong', {
        id: notification,
      })

      console.log('error from creating a new comment', error)
    }
  }

  const post: Post = data?.getPostListByPostId

  console.log(data)

  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} singleMode />

      {/* Rendering the rest if the post is fetched  */}
      {post && (
        <>
          <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
            <p className="text-sm">
              Comment as{' '}
              <span className="text-red-500">{session?.user?.name}</span>
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-2"
            >
              <textarea
                {...register('comment')}
                className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
                disabled={!session}
                placeholder={
                  session
                    ? 'What are your thoughts'
                    : 'Please sign in to comment'
                }
              />

              <button
                disabled={!session}
                type="submit"
                className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
              >
                Comment
              </button>
            </form>
          </div>

          <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
            <hr className="py-2" />
            {post?.comments?.map((comment) => (
              <div
                className="relative flex items-center space-y-5 space-x-2"
                key={comment.id}
              >
                <hr className="absolute top-10 left-7 h-16 border" />
                <div className="z-50">
                  <Avatar seed={comment.username} />
                </div>

                <div className="flex flex-col">
                  <p className="py-2 text-xs text-gray-400">
                    <span className="font-semibold text-gray-600">
                      {comment.username}
                    </span>{' '}
                    <TimeAgo date={comment.created_at} />
                  </p>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// export async function getServerSideProps(context: any) {
//   const {
//     data: { getPostListByPostId },
//   } = await client.query({
//     query: GET_POST_BY_POST_ID,
//     variables: {
//       post_id: context.params.postId,
//     },
//   })

//   return {
//     props: { post: getPostListByPostId },
//   }
// }

export default PostPage
