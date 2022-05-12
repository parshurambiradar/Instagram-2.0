import faker from '@faker-js/faker'
import { useEffect, useState } from 'react'

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.userCard(),
      avatar: faker.image.avatar(),
      id: i,
    }))
    setSuggestions(suggestions)
  }, [])
  return (
    <div className="mt-4 ml-10">
      <div className=" tex-sm mb-5 flex justify-between">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className=" font-semibold text-gray-600">See All</button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className=" mt-3 flex items-center justify-between"
        >
          <img
            src={profile.avatar}
            alt=""
            className="h-10 w-10 rounded-full border object-contain p-[2px]"
          />
          <div className="ml-4 flex-1">
            <h2 className=" text-sm font-semibold">{profile.username}</h2>
            <h3 className="truncate text-xs text-gray-400">
              Works at {profile?.company?.name}
            </h3>
          </div>
          <button className="text-sm font-semibold text-blue-400">
            Follow
          </button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions
