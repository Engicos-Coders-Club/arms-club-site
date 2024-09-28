'use client'
import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const page = () => {
  const events = useQuery(api.database.getEvent)
  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-center text-black">Events</h1>
      <div className="mb-12">
      <h2 className="mb-4 text-2xl font-bold text-black">Upcoming Events</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events?.filter(event => !event.isCompleted).map((event) => (
        <Link href={`/events/${event._id}`} key={event._id} className="overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl">
          <img
          src={event.image && event.image.startsWith('http') ? event.image : 'https://makebot.in/images/news/Events-1.png'}
          alt={event.name}
          className="object-cover w-full h-40"
          />
          <div className="p-6">
          <h2 className="mb-2 text-2xl font-semibold text-black">{event.name}</h2>
          <p className="mb-4 text-gray-600">{event.description}</p>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500">Organizer: {event.organiser}</p>
            <p className="text-gray-500">Attendees: {event.attendees}</p>
          </div>
          <p className="text-sm text-gray-400">{new Date(event.date).toDateString()}</p>
          </div>
        </Link>
        ))}
      </div>
      </div>
      <div>
      <h2 className="mb-4 text-2xl font-bold text-black">Past Events</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events?.filter(event => event.isCompleted).map((event) => (
        <Link href={`/events/${event._id}`} key={event._id} className="overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-2xl">
          <img
          src={event.image && event.image.startsWith('http') ? event.image : 'https://makebot.in/images/news/Events-1.png'}
          alt={event.name}
          className="object-cover w-full h-40"
          />
          <div className="p-6">
          <h2 className="mb-2 text-2xl font-semibold text-black">{event.name}</h2>
          <p className="mb-4 text-gray-600">{event.description}</p>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500">Organizer: {event.organiser}</p>
            <p className="text-gray-500">Attendees: {event.attendees}</p>
          </div>
          <p className="text-sm text-gray-400">{new Date(event.date).toDateString()}</p>
          </div>
        </Link>
        ))}
      </div>
      </div>
    </main>
  )
}

export default page