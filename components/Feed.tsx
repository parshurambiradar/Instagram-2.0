import { useSession } from 'next-auth/react'
import MiniProfile from './MiniProfile'
import Posts from './Posts'
import Stories from './Stories'
import Suggestions from './Suggestions'

const Feed = () => {
  const { data: session } = useSession()
  return (
    <main
      className={`mx-auto grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3 ${
        !session && '!max-w-3xl !grid-cols-1'
      }`}
    >
      {/* section */}
      <section className=" col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}

        <Posts />
      </section>

      {session && (
        <section className="hidden md:col-span-1 xl:inline-grid">
          <div className=" fixed top-20">
            {/* mini profile */}
            <MiniProfile />
            {/* suggestions */}
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  )
}

export default Feed
