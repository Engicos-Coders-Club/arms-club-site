import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  events: defineTable({
    name: v.string(),
    organiser: v.string(),
    attendees: v.number(),
    isCompleted: v.boolean(),
    description: v.string(),
    image: v.string(),
    payment: v.optional(v.string()),
    date: v.string(),
    participants: v.array(v.id("users")),
  }),

  users: defineTable({
    userId: v.string(), // necessary
    email: v.string(),  // necessary
    name: v.string(), // necessary
    detailsExist: v.boolean(), // necessary
    branch: v.optional(v.string()), // optional
    year: v.optional(v.number()), // optional
    rollNo: v.optional(v.string()), // optional
  }),

  admins: defineTable({
    userId: v.string(),
  }),

  products: defineTable({
    title: v.string(),
    price: v.number(),
    description: v.string(),
    image: v.string(),
  }),

  feedback: defineTable({
    eventId: v.id("events"),
    userId: v.id("users"),
    rating: v.number(), // 1-5 rating
    organization: v.number(), // 1-5 rating
    content: v.number(), // 1-5 rating
    venue: v.number(), // 1-5 rating
    overallExperience: v.number(), // 1-5 rating
    comments: v.string(),
    wouldRecommend: v.boolean(),
    submittedAt: v.string(),
  }),

});