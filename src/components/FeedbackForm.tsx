"use client"
import type React from "react"
import { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"
import { Star, X } from "lucide-react"

interface FeedbackFormProps {
  eventId: Id<"events">
  userId: Id<"users">
  eventName: string
  onClose: () => void
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ eventId, userId, eventName, onClose }) => {
  const submitFeedback = useMutation(api.database.submitFeedback)
  const existingFeedback = useQuery(api.database.getUserFeedback, {
    eventId,
    userId,
  })

  const [formData, setFormData] = useState({
    rating: 0,
    organization: 0,
    content: 0,
    venue: 0,
    overallExperience: 0,
    comments: "",
    wouldRecommend: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  if (existingFeedback) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Feedback Already Submitted</h2>
            <p className="text-gray-600 mb-6">
              You have already submitted feedback for "{eventName}". Thank you for your input!
            </p>
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  const StarRating = ({
    value,
    onChange,
    label,
  }: {
    value: number
    onChange: (rating: number) => void
    label: string
  }) => (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none transition-transform duration-200 hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= value ? "text-yellow-400 fill-current" : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate that all ratings are provided
    if (
      !formData.rating ||
      !formData.organization ||
      !formData.content ||
      !formData.venue ||
      !formData.overallExperience
    ) {
      alert("Please provide ratings for all categories")
      return
    }

    setIsSubmitting(true)
    try {
      await submitFeedback({
        eventId,
        userId,
        ...formData,
      })
      alert("Thank you for your feedback!")
      onClose()
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Event Feedback</h2>
            <p className="text-gray-600">{eventName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <StarRating
            value={formData.rating}
            onChange={(rating) => setFormData({ ...formData, rating })}
            label="Overall Event Rating"
          />

          <StarRating
            value={formData.organization}
            onChange={(organization) => setFormData({ ...formData, organization })}
            label="Event Organization"
          />

          <StarRating
            value={formData.content}
            onChange={(content) => setFormData({ ...formData, content })}
            label="Content Quality"
          />

          <StarRating
            value={formData.venue}
            onChange={(venue) => setFormData({ ...formData, venue })}
            label="Venue & Facilities"
          />

          <StarRating
            value={formData.overallExperience}
            onChange={(overallExperience) => setFormData({ ...formData, overallExperience })}
            label="Overall Experience"
          />

          <div className="mb-6 text-black">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Additional Comments</label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              rows={4}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Share your thoughts about the event..."
            />
          </div>

          <div className="mb-8">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.wouldRecommend}
                onChange={(e) => setFormData({ ...formData, wouldRecommend: e.target.checked })}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">I would recommend this event to others</span>
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-4 bg-black text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FeedbackForm
