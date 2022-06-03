import React from 'react'
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import SubredditRow from './SubredditRow'

function TopCommunitites() {
  const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  })

  const subreddits: Subreddit[] = data?.getSubredditListLimit

  console.log(data?.getSubredditListLimit)
  return (
    <div className="boder-gray-300 sticky top-36 mx-5 mt-5 mr-0 hidden h-fit min-w-[300px] rounded-md bg-white lg:inline">
      <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communitites</p>
      <div>
        {subreddits?.map((subreddit, i) => (
          <SubredditRow key={subreddit.id} index={i} topic={subreddit.topic} />
        ))}
      </div>
    </div>
  )
}

export default TopCommunitites
