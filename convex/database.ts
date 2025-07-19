import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    userId: v.string(), // necessary
    email: v.string(),
    name: v.string(),
    branch: v.optional(v.string()), // optional
    year: v.optional(v.number()), // optional
    rollNo: v.optional(v.string()), // optional
    detailsExist: v.optional(v.boolean()), // optional
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      throw new Error("User with the same userId or email already exists");
    }

    await ctx.db.insert("users", {
      userId: args.userId,
      email: args.email,
      name: args.name,
      branch: args.branch,
      year: args.year,
      rollNo: args.rollNo,
      detailsExist: args.detailsExist || false,
    });

    return true;
  },
});

export const createEvent = mutation({
  args: {
    name: v.string(),
    organiser: v.string(),
    attendees: v.number(),
    isCompleted: v.boolean(),
    description: v.string(),
    image: v.string(),
    payment: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("events", {
      name: args.name,
      organiser: args.organiser,
      attendees: args.attendees,
      date: args.date,
      description: args.description,
      image: args.image,
      payment: args.payment,
      isCompleted: args.isCompleted,
      participants: []
    });
    return true;
  },
});

export const getPass = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("admins").take(10);
  },
});

export const getUserById = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getMultipleUsers = query({
  args: { userIds: v.array(v.string()) },
  handler: async (ctx, args) => {
    const users = await Promise.all(
      args.userIds.map(userId => 
        ctx.db
          .query("users")
          .filter(q => q.eq(q.field("userId"), userId))
          .first()
      )
    );
    return users.filter(user => user !== null);
  },
});

export const getEvent = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});

export const getProduct = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const deleteById = mutation({
  args: {
    storageId: v.id("events"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.storageId);
  },
});

export const update = mutation({
  args: {
    storageId: v.id("events"),
    name: v.string(),
    organiser: v.string(),
    attendees: v.number(),
    isCompleted: v.boolean(),
    description: v.string(),
    image: v.string(),
    payment: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.replace(args.storageId, {
      name: args.name,
      organiser: args.organiser,
      attendees: args.attendees,
      date: args.date,
      description: args.description,
      image: args.image,
      payment: args.payment,
      isCompleted: args.isCompleted,
      participants: []
    });
    return true;
  },
});

export const createProduct = mutation({
  args: {
    title: v.string(),
    price: v.number(),
    description: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("products", {
      title: args.title,
      price: args.price,
      description: args.description,
      image: args.image,
    });
    return true;
  },
});

export const getSingleProduct = query({
  args: { Id: v.id("products") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.Id);
    return task;
  },
});

export const getSingleEvent = query({
  args: { Id: v.id("events") },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.Id);
    return event;
  },
});

export const getSingleUSer = query({
  args: { Id: v.string() },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.Id))
      .first();
    return existingUser;
  },
});

export const updateProduct = mutation({
  args: {
    storageId: v.id("products"),
    title: v.string(),
    price: v.number(),
    description: v.string(),
    image: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.replace(args.storageId, {
      title: args.title,
      price: args.price,
      description: args.description,
      image: args.image,
    });
    return true;
  },
});

export const deleteProductId = mutation({
  args: {
    storageId: v.id("products"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.storageId);
  },
});

export const attendEvent = mutation({
  args: {
    eventId: v.id("events"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Initialize participants array if it doesn't exist
    const participants = event.participants || [];

    // Check if user is already registered
    if (participants.includes(args.userId)) {
      throw new Error("User already attending the event");
    }

    // Check if event is full
    if (participants.length >= event.attendees) {
      throw new Error("Event is full");
    }

    // Add user to participants
    const updatedParticipants = [...participants, args.userId];

    // Update event with new participants array
    await ctx.db.replace(args.eventId, {
      ...event,
      participants: updatedParticipants
    });

    return true;
  },
});

export const unattendEvent = mutation({
  args: {
    eventId: v.id("events"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Initialize participants array if it doesn't exist
    const participants = event.participants || [];

    // Check if user is actually attending
    if (!participants.includes(args.userId)) {
      throw new Error("User is not attending the event");
    }

    // Remove user from participants
    const updatedParticipants = participants.filter(id => id !== args.userId);

    // Update event with new participants array
    await ctx.db.replace(args.eventId, {
      ...event,
      participants: updatedParticipants
    });

    return true;
  },
});


// Feedback related functions
export const submitFeedback = mutation({
  args: {
    eventId: v.id("events"),
    userId: v.id("users"),
    rating: v.number(),
    organization: v.number(),
    content: v.number(),
    venue: v.number(),
    overallExperience: v.number(),
    comments: v.string(),
    wouldRecommend: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Check if user already submitted feedback for this event
    const existingFeedback = await ctx.db
      .query("feedback")
      .filter((q) => q.and(q.eq(q.field("eventId"), args.eventId), q.eq(q.field("userId"), args.userId)))
      .first()

    if (existingFeedback) {
      throw new Error("You have already submitted feedback for this event")
    }

    // Verify user was a participant
    const event = await ctx.db.get(args.eventId)
    if (!event || !event.participants.includes(args.userId)) {
      throw new Error("You must have attended the event to submit feedback")
    }

    await ctx.db.insert("feedback", {
      eventId: args.eventId,
      userId: args.userId,
      rating: args.rating,
      organization: args.organization,
      content: args.content,
      venue: args.venue,
      overallExperience: args.overallExperience,
      comments: args.comments,
      wouldRecommend: args.wouldRecommend,
      submittedAt: new Date().toISOString(),
    })

    return true
  },
})

export const getUserFeedback = query({
  args: {
    eventId: v.id("events"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("feedback")
      .filter((q) => q.and(q.eq(q.field("eventId"), args.eventId), q.eq(q.field("userId"), args.userId)))
      .first()
  },
})

export const getEventFeedback = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("feedback")
      .filter((q) => q.eq(q.field("eventId"), args.eventId))
      .collect()
  },
})

export const getUserPastEvents = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const allEvents = await ctx.db.query("events").collect()
    const currentDate = new Date()

    // Filter events where user was a participant and event is in the past
    const pastEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date)
      const isPastEvent = eventDate < currentDate || event.isCompleted
      const wasParticipant = event.participants.includes(args.userId)
      return isPastEvent && wasParticipant
    })

    return pastEvents
  },
})