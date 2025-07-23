"use client"
import Link from "next/link"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { Calendar, Users, MapPin, Clock } from "lucide-react"

const page = () => {
  const events = useQuery(api.database.getEvent)

  // Get current date for comparison
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0) // Reset time to start of day for accurate comparison

  // Filter events based on date
  const upcomingEvents = events?.filter((event) => {
    const eventDate = new Date(event.date)
    eventDate.setHours(0, 0, 0, 0)
    return eventDate >= currentDate && !event.isCompleted
  })

  const pastEvents = events?.filter((event) => {
    const eventDate = new Date(event.date)
    eventDate.setHours(0, 0, 0, 0)
    return eventDate < currentDate || event.isCompleted
  })

  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => (
    <Link
      href={`/events/${event._id}`}
      className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
    >
      <div className="relative overflow-hidden">
        <img
          src={
            event.image && event.image.startsWith("http") ? event.image : "https://makebot.in/images/news/Events-1.png"
          }
          alt={event.name}
          className="w-full h-48 object-cover sm:group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isPast ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-700"
            }`}
          >
            {isPast ? "Completed" : "Upcoming"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {event.name}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2 text-purple-500" />
            {event.participants?.length || 0} / {event.attendees} participants
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 text-green-500" />
            Organized by {event.organiser}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
            View Details →
          </span>
          {!isPast && (
            <div className="flex items-center text-sm text-orange-600">
              <Clock className="w-4 h-4 mr-1" />
              {event.attendees - (event.participants?.length || 0)} spots left
            </div>
          )}
        </div>
      </div>
    </Link>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 mt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Events
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover exciting robotics events, workshops, and competitions
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
            </div>
          </div>

          {upcomingEvents && upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Upcoming Events</h3>
              <p className="text-gray-500">Stay tuned for exciting new events!</p>
            </div>
          )}
        </div>

        {/* Past Events */}
        <div>
          <div className="flex items-center mb-8">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
              <h2 className="text-3xl font-bold text-gray-800">Past Events</h2>
            </div>
          </div>

          {pastEvents && pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <EventCard key={event._id} event={event} isPast={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Past Events</h3>
              <p className="text-gray-500">Past events will appear here once completed.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default page
