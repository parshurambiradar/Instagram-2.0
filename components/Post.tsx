import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Moment from 'react-moment'
const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  const [likes, setLikes] = useState([])
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )
  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  )

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session?.user?.uid), {
        username: session?.user?.username,
      })
    }
  }
  const sendComment = async (e) => {
    e.preventDefault()
    const commentToSend = comment
    setComment('')
    await addDoc(collection(db, 'posts', id, 'comments'), {
      comment: commentToSend,
      username: session?.user?.username,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
    })
  }
  return (
    <div className=" my-7 rounded-sm border bg-white">
      {/* Header */}
      <div className="flex items-center p-5 ">
        <img
          src={userImg}
          alt=""
          className="mr-3 h-12 w-12 rounded-full border object-contain "
        />
        <p className="flex-1 text-sm font-bold">{username}</p>

        <DotsHorizontalIcon className="h-4 w-4" />
      </div>
      {/* img */}
      <img src={img} className=" w-full object-cover" alt="" />
      {/* buttons */}
      {session && (
        <div className="flex items-center justify-between px-4 pt-4">
          <div className=" flex items-center space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="btn text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}

            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-45" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}
      {/* caption */}
      <p className="truncate p-5">
        {likes.length > 0 && (
          <p className="mb-1 font-bold ">{likes.length} likes</p>
        )}
        <span className="mr-1 font-bold">{username}</span> {caption}
      </p>
      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll pr-4 scrollbar-thin scrollbar-thumb-black">
          {comments?.map((comment) => (
            <div key={comment?.id} className="mb-3 flex items-center space-x-2">
              <img
                className="mr-2 h-7 rounded-full object-contain"
                src={comment?.data()?.userImg}
              />
              <p className="flex-1 text-sm">
                <span className="mr-2 font-bold">
                  {comment?.data()?.username}
                </span>
                {comment?.data()?.comment}
              </p>
              <Moment fromNow className="text-sm">
                {comment?.data()?.timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7 text-gray-700" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className=" flex-1 border-none outline-none focus:ring-0"
            name=""
            id=""
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="cursor-pointer font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
