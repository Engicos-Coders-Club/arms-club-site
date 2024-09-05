import Link from 'next/link'
import {events} from '../../../public/events'

const page = () => {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-8 text-center text-black">Upcoming and Past Events</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Link href={`/events/${event.id}`} key={event.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-black">{event.name}</h2>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-500">Organizer: {event.organizer}</p>
              <p className="text-gray-500">Attendees: {event.attendees}</p>
            </div>
            <p className="text-gray-400 text-sm">{new Date(event.date).toDateString()}</p>
          </div>
        </Link>
      ))}
    </div>
  </main>
  )
}

export default page