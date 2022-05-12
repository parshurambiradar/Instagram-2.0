import faker from '@faker-js/faker'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'

const Posts = () => {
  const [posts, setPosts] = useState([])
  // useEffect(() => {
  //   const posts = [...Array(20)].map((_, i) => ({
  //     ...faker.helpers.userCard(),
  //     userImg: faker.image.avatar(),
  //     img: faker.image.people(640, 480, true),
  //     caption: faker.name.jobTitle(),
  //     id: i,
  //   }))
  //    console.log(posts)
  //   setPosts(posts)
  // }, [])
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs)
        }
      ),
    [db]
  )
  // console.log('snapshot.docs', posts)
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  )
}

export default Posts
