"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { useUser } from "@clerk/nextjs"
import type { Id } from "../../convex/_generated/dataModel"
import { api } from "../../convex/_generated/api"
import FeedbackForm from "./FeedbackForm"

const EventPage = ({
  params,
  userId,
}: {
  params: { events: Id<"events"> }
  userId: string
}) => {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const { isSignedIn, user } = useUser()
  const createUser = useMutation(api.database.createUser)
  const attendEvents = useMutation(api.database.attendEvent)
  const unAttendEvents = useMutation(api.database.unattendEvent)

  const [formData, setFormData] = useState({
    name: user?.fullName,
    email: user?.emailAddresses[0].emailAddress,
    branch: "",
    year: 1,
    rollNumber: "",
  })

  const event = useQuery(api.database.getSingleEvent, { Id: params.events })
  const userIdNew = userId as Id<"users">
  const userDetail = useQuery(api.database.getSingleUSer, { Id: userIdNew })

  // Check if event is in the past
  const isEventPast = event ? new Date(event.date) < new Date() || event.isCompleted : false

  // Check if user was a participant
  const wasParticipant = userDetail?._id && event?.participants.includes(userDetail._id)

  const handleBackClick = () => {
    router.back()
  }

  const updateFormData = () => {
    setFormData((prevData) => ({
      ...prevData,
      name: userDetail?.name || "",
      email: userDetail?.email || "",
      branch: userDetail?.branch || "",
      year: userDetail?.year || 1,
      rollNumber: userDetail?.rollNo || "",
    }))
  }

  useEffect(() => {
    if (isSignedIn) {
      updateFormData()
    }
  }, [userDetail])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  if (!event) {
    return (
      <main className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold">Event not found</h1>
      </main>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!userDetail?.detailsExist) {
        await createUser({
          userId: userId,
          name: formData.name || "",
          email: formData.email || "",
          branch: formData.branch,
          year: formData.year,
          rollNo: formData.rollNumber,
          detailsExist: true,
        })
      }
      if (userDetail?._id) {
        await attendEvents({ eventId: event._id, userId: userDetail._id })
      }
      setShowForm(false)
    } catch (error) {
      if (error) {
        console.error("Error attending event", error)
      }
      setShowForm(false)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl p-6 mx-auto overflow-hidden bg-white rounded-lg shadow-lg min-w-96">
        <div className="p-4">
          <button onClick={handleBackClick} className="font-semibold text-blue-500 cursor-pointer hover:text-blue-700">
            &larr; Back
          </button>
        </div>
        <img
          src={
            event.image && event.image.startsWith("http") ? event.image : "https://makebot.in/images/news/Events-1.png"
          }
          alt={event.name}
          className="object-cover w-full h-60"
        />
        <div className="p-6">
          <h1 className="mb-4 text-4xl font-bold text-black">{event.name}</h1>
          <p className="mb-4 text-gray-600">{event.description}</p>
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg text-gray-500">Organiser: {event.organiser}</p>
            <p className="text-lg text-gray-500">Attendees: {event.participants.length}</p>
            {!isEventPast && (
              <p className="text-lg text-gray-500">Seats Left : {event.attendees - event.participants.length}</p>
            )}
          </div>

          <p className="mt-4 text-sm text-gray-400">Date: {new Date(event.date).toDateString()}</p>

          {isEventPast && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md">
              <p className="text-yellow-800 text-sm">This event has ended.</p>
            </div>
          )}
        </div>

        <div className="px-6 pb-6 space-y-3">
          {/* Registration/Unregistration buttons for upcoming events */}
          {!isEventPast && event.attendees - event.participants.length > 0 && (
            <div>
              {userDetail?._id && event.participants.includes(userDetail._id) ? (
                <button
                  className="px-4 py-2 text-white transition duration-300 bg-green-500 rounded-md hover:bg-green-600"
                  onClick={() => {
                    unAttendEvents({ eventId: event._id, userId: userDetail._id })
                  }}
                >
                  UnRegister
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (isSignedIn) {
                      setShowForm(true)
                    } else {
                      router.push("/sign-in")
                    }
                  }}
                  className="px-4 py-2 text-white transition duration-300 bg-yellow-500 rounded-md hover:bg-yellow-600"
                >
                  Register
                </button>
              )}
            </div>
          )}

          {/* Feedback button for past events */}
          {isEventPast && wasParticipant && isSignedIn && (
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Give Feedback
            </button>
          )}
        </div>

        {/* Registration Form */}
        {showForm && isSignedIn && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
              <h2 className="mb-4 text-2xl font-semibold text-black">Register for the Event</h2>
              <form
                className="max-w-lg p-10 mx-auto space-y-6 text-black bg-white rounded-lg shadow-md"
                onSubmit={handleSubmit}
              >
                <input
                  name="name"
                  onChange={handleChange}
                  placeholder="Name"
                  value={formData?.name || ""}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Branch
                  </option>
                  <option value="CSE">Computer</option>
                  <option value="ECE">Electronics</option>
                  <option value="ME">Electrical</option>
                  <option value="CE">Civil</option>
                  <option value="EE">Mechanical</option>
                  <option value="VL">Vlsi</option>
                </select>
                <select
                  name="year"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year: Number(e.target.value),
                    })
                  }
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  <option value={1}>1st</option>
                  <option value={2}>2nd</option>
                  <option value={3}>3rd</option>
                  <option value={4}>4th</option>
                </select>
                <input
                  name="rollNumber"
                  placeholder="Roll Number"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Register
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={() => setShowForm(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Feedback Form */}
        {showFeedbackForm && userDetail?._id && (
          <FeedbackForm
            eventId={event._id}
            userId={userDetail._id}
            eventName={event.name}
            onClose={() => setShowFeedbackForm(false)}
          />
        )}
      </div>
    </main>
  )
}

export default EventPage
