import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter(
        (q) =>
          q.eq(q.field("userId"), args.userId) ||
          q.eq(q.field("email"), args.email)
      )
      .first();

    if (existingUser) {
      throw new Error("User with the same userId or email already exists");
    }

    await ctx.db.insert("users", {
      userId: args.userId,
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      detailsExist: false,
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
    return task
  },
});