import Image from 'next/image'
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from '@heroicons/react/outline'

import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
const Header = () => {
  const { data: session, status } = useSession()

  const router = useRouter()
  const [open, setOpen] = useRecoilState(modalState)
  return (
    <div className=" sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-5 flex max-w-6xl items-center justify-between lg:mx-auto">
        {/* left */}
        <div
          className=" relative hidden h-24 w-24 cursor-pointer lg:inline-grid"
          onClick={() => router.push('/')}
        >
          <Image
            objectFit="contain"
            layout="fill"
            alt="logo"
            src={'/images/instagram_title_logo.png'}
          />
        </div>
        <div className=" relative  h-10 w-10 flex-shrink-0 cursor-pointer lg:hidden">
          <Image
            objectFit="contain"
            layout="fill"
            alt="logo"
            src={'/images/instagram_logo.png'}
          />
        </div>
        {/* Middle search input field*/}
        <div className=" max-w-xs">
          <div className="relative mt-1 rounded-md p-3">
            <div className=" pointer-events-none absolute top-5 flex items-center pl-3  ">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className=" block w-full rounded-md border-gray-300  bg-gray-50 pl-10  focus:border-black focus:ring-black sm:text-sm"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        {/* right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push('/')} className="navBtn" />
          <MenuIcon className=" h-6 cursor-pointer md:hidden" />
          {session ? (
            <>
              <div className=" navBtn relative">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-2 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={() => signOut()}
                src={session?.user?.image || '/images/instagram_logo.png'}
                alt="profile"
                title={session?.user?.name || ''}
                className=" h-10 cursor-pointer rounded-full"
              />
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className=" text-sm font-semibold text-blue-400"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
