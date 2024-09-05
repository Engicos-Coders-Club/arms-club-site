import React from 'react'
import {events} from '../../../../public/events'

const page = ({ params }: { params: { events: string } }) => {
  const postId = Number(params.events);
  const post = events.find((post) => post.id === postId);
  console.log(post)
  return (
    <div>page</div>
  )
}

export default page