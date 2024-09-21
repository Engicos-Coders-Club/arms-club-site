import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  events: defineTable({
    name: v.string(),
    organiser: v.string(),
    attendees:v.number(),
    isCompleted: v.boolean(),
    description: v.string(),
    image: v.string(),
    date: v.string(),
    participants: v.optional(v.array(v.id("users"))),
  }),

  users:defineTable({
    userId: v.string(), // necessary
    email: v.string(),  // necessary
    name:v.string(), //necessary
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
  })

});