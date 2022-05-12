import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'

const Home: NextPage = () => {
  return (
    <div className=" min-h-screen bg-gray-50">
      <Head>
        <title>INSTAGRAM 2.0</title>
        <link rel="icon" href="/images/instagram_logo.png" />
      </Head>

      {/* Header */}
      <Header />
      {/* Feed */}
      <Feed />
      {/* Modal */}

      <Modal />
    </div>
  )
}

export default Home
