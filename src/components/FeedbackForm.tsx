"use client"
import type React from "react"
import { useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import type { Id } from "../../convex/_generated/dataModel"
import { Star } from "lucide-react"

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
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Feedback Already Submitted</h2>
          <p className="text-gray-600 mb-6">
            You have already submitted feedback for "{eventName}". Thank you for your input!
          </p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
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
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} type="button" onClick={() => onChange(star)} className="focus:outline-none">
            <Star className={`w-6 h-6 ${star <= value ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Feedback: {eventName}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
            <textarea
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              rows={4}
              className="w-full p-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your thoughts about the event..."
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.wouldRecommend}
                onChange={(e) => setFormData({ ...formData, wouldRecommend: e.target.checked })}
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">I would recommend this event to others</span>
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
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
