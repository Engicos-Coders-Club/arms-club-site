"use client"
import { useState } from "react"
import { useQuery } from "convex/react"
import { useUser } from "@clerk/nextjs"
import { api } from "../../../convex/_generated/api"
import FeedbackForm from "@/components/FeedbackForm"
import type { Id } from "../../../convex/_generated/dataModel"

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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please sign in to view feedback options</h1>
        </div>
      </div>
    )
  }

  if (!userDetail) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 mt-16">Event Feedback</h1>

        {pastEvents && pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={
                    event.image && event.image.startsWith("http")
                      ? event.image
                      : "https://makebot.in/images/news/Events-1.png"
                  }
                  alt={event.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{new Date(event.date).toDateString()}</span>
                    <span className="text-sm text-gray-500">By {event.organiser}</span>
                  </div>
                  <button
                    onClick={() => setSelectedEvent({ _id: event._id, name: event.name })}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Give Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600 mb-4">No past events found</h2>
            <p className="text-gray-500">
              You haven't attended any events yet, or there are no completed events to provide feedback for.
            </p>
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
