'use client'
import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const page = () => {
  const events = useQuery(api.database.getEvent)
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Events</h1>
      <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-black">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.filter(event => !event.isCompleted).map((event) => (
        <Link href={`/events/${event._id}`} key={event._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl">
          <img
          src={event.image && event.image.startsWith('http') ? event.image : 'https://makebot.in/images/news/Events-1.png'}
          alt={event.name}
          className="w-full h-40 object-cover"
          />
          <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2 text-black">{event.name}</h2>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500">Organizer: {event.organiser}</p>
            <p className="text-gray-500">Attendees: {event.attendees}</p>
          </div>
          <p className="text-gray-400 text-sm">{new Date(event.date).toDateString()}</p>
          </div>
        </Link>
        ))}
      </div>
      </div>
      <div>
      <h2 className="text-2xl font-bold mb-4 text-black">Past Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.filter(event => event.isCompleted).map((event) => (
        <Link href={`/events/${event._id}`} key={event._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl">
          <img
          src={event.image && event.image.startsWith('http') ? event.image : 'https://makebot.in/images/news/Events-1.png'}
          alt={event.name}
          className="w-full h-40 object-cover"
          />
          <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2 text-black">{event.name}</h2>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500">Organizer: {event.organiser}</p>
            <p className="text-gray-500">Attendees: {event.attendees}</p>
          </div>
          <p className="text-gray-400 text-sm">{new Date(event.date).toDateString()}</p>
          </div>
        </Link>
        ))}
      </div>
      </div>
    </main>
  )
}

export default page