import { faker } from '@faker-js/faker'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Story from './Story'
const Stories = () => {
  const { data: session } = useSession()
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.userCard(),
      avatar: faker.image.avatar(),
      id: i,
    }))
    setSuggestions(suggestions)
  }, [])
  return (
    <div className="mt-8 flex space-x-2 overflow-x-scroll scroll-smooth rounded-sm border border-gray-200 bg-white p-6  scrollbar-thin scrollbar-thumb-black">
      {session && (
        <Story
          key={session?.user?.uid}
          image={session?.user?.image}
          username={session?.user?.username}
        />
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          image={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  )
}

export default Stories
