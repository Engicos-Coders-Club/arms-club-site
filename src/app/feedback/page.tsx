"use client"
import { useState } from "react"
import { useQuery } from "convex/react"
import { useUser } from "@clerk/nextjs"
import { api } from "../../../convex/_generated/api"
import FeedbackForm from "@/components/FeedbackForm"
import type { Id } from "../../../convex/_generated/dataModel"
import { MessageSquare, Calendar, User, Star } from "lucide-react"

const FeedbackPage = () => {
  const { user } = useUser()
  const [selectedEvent, setSelectedEvent] = useState<{
    _id: Id<"events">
    name: string
  } | null>(null)

  // Get user details
  const userDetail = useQuery(api.database.getSingleUSer, user?.id ? { Id: user.id } : "skip")

  // Get past events where user was a participant
  const pastEvents = useQuery(api.database.getUserPastEvents, userDetail?._id ? { userId: userDetail._id } : "skip")

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100 max-w-md">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h1>
          <p className="text-gray-600 mb-6">Please sign in to view and submit event feedback</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Sign In
          </button>
        </div>
      </div>
    )
  }

  if (!userDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 mt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Event Feedback
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Help us improve future events by sharing your experience and feedback
          </p>
        </div>

        {pastEvents && pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <div
                key={event._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl sm:transition-all duration-300 sm:transform sm:hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      event.image && event.image.startsWith("http")
                        ? event.image
                        : "https://makebot.in/images/news/Events-1.png"
                    }
                    alt={event.name}
                    className="w-full h-48 object-cover sm:group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Completed
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {event.name}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{event.description}</p>

                  <div className="space-y-2 mb-6">
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
                      <User className="w-4 h-4 mr-2 text-purple-500" />
                      Organized by {event.organiser}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedEvent({ _id: event._id, name: event.name })}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Give Feedback</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Star className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">No Past Events Found</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              You haven't attended any events yet, or there are no completed events to provide feedback for.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Browse Events
            </button>
          </div>
        )}

        {selectedEvent && userDetail._id && (
          <FeedbackForm
            eventId={selectedEvent._id}
            userId={userDetail._id}
            eventName={selectedEvent.name}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  )
}

export default FeedbackPage
