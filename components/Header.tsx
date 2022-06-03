import Image from 'next/image'
import React from 'react'
import RedditLogo from '../public/redditLogo.svg'
import RedditWord from '../public/redditWord.svg'
import Link from 'next/link'
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from '@heroicons/react/solid'
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'

import { signIn, signOut, useSession } from 'next-auth/react'

function Header() {
  const { data: session } = useSession() // rename data to session

  return (
    <div className="sticky top-0 z-50 flex items-center  bg-white px-4 py-2 shadow-sm">
      <div className="inline-flex cursor-pointer flex-row items-center">
        <Link href="/">
          <div className="relative my-2 mr-1 h-8 w-8">
            <Image objectFit="contain" src={RedditLogo} layout="fill" />
          </div>
        </Link>
        <Link href="/">
          <div className="relative h-6 w-12">
            <Image objectFit="contain" src={RedditWord} layout="fill" />
          </div>
        </Link>
      </div>

      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <div className="flex flex-1 cursor-pointer items-center">
          <p className="ml-2 hidden flex-1 lg:inline">Home</p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>

      {/* Search box */}
      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden></button>
      </form>

      {/* Icons */}
      <div className="items-center text-gray-500 lg:mx-5 lg:inline-flex lg:space-x-2">
        <SparklesIcon className="icon hidden lg:block" />
        <GlobeIcon className="icon hidden lg:block" />
        <VideoCameraIcon className="icon hidden lg:block" />
        <hr className="hidden h-10 border text-gray-100 lg:block" />
        <ChatIcon className="icon hidden lg:block" />
        <BellIcon className="icon hidden lg:block" />
        <PlusIcon className="icon hidden lg:block" />
        <SpeakerphoneIcon className="icon hidden lg:block" />
      </div>

      {/* Sign in Sign out button */}

      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          {' '}
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              layout="fill"
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          {' '}
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              objectFit="contain"
              src="https://links.papareact.com/23l"
              layout="fill"
            />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}

      {/* Menu Icon */}
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>
    </div>
  )
}

export default Header
