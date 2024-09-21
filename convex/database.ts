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
      isCompleted: args.isCompleted,
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
      isCompleted: args.isCompleted,
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

    if (!event.participants) {
      event.participants = [];
    }

    if (event.participants.includes(args.userId)) {
      throw new Error("User already attending the event");
    }

    event.participants.push(args.userId);
    await ctx.db.replace(args.eventId, event);
    return true;
  },
});
