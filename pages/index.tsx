import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Header from '../components/Header'
import PostBox from '../components/PostBox'
import TopCommunitites from '../components/TopCommunitites'

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit Clone</title>
        <link rel="icon" href="/redditLogo.svg" />
      </Head>

      {/* Post Box */}
      <PostBox />

      <div className="flex">
        {/* Feed */}
        <Feed />
        <TopCommunitites />
      </div>
    </div>
  )
}

export default Home
