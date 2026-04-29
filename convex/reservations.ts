import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";

export const create = mutation({
  args: {
    customer_name: v.string(),
    customer_phone: v.string(),
    customer_email: v.optional(v.string()),
    date: v.string(),
    time: v.string(),
    party_size: v.number(),
    special_requests: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const reservationId = await ctx.db.insert("reservations", {
      ...args,
      status: "pending",
      created_at: Date.now(),
    });
    return reservationId;
  },
});

export const list = query({
  args: {
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
      v.literal("completed")
    )),
    date: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("reservations");
    
    if (args.date && args.status) {
      return await query
        .withIndex("by_date", (q) => q.eq("date", args.date))
        .filter((q) => q.eq(q.field("status"), args.status))
        .collect();
    }
    
    if (args.date) {
      return await query
        .withIndex("by_date", (q) => q.eq("date", args.date))
        .collect();
    }

    if (args.status) {
      return await query
        .withIndex("by_status", (q) => q.eq("status", args.status))
        .collect();
    }

    return await query.collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("reservations"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
      v.literal("completed")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const assignTable = mutation({
  args: {
    id: v.id("reservations"),
    table_number: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { table_number: args.table_number });
  },
});

export const confirmAndNotify = action({
  args: {
    id: v.id("reservations"),
  },
  handler: async (ctx, args) => {
    const reservation = await ctx.runQuery(api.reservations.getById, { id: args.id });
    if (!reservation) throw new Error("Reservation not found");

    await ctx.runMutation(api.reservations.updateStatus, {
      id: args.id,
      status: "confirmed",
    });

    const message = `Hello ${reservation.customer_name}! Your reservation at Terra Restaurant for ${reservation.date} at ${reservation.time} has been confirmed. We look forward to seeing you!`;
    
    await ctx.runAction(api.whatsapp.sendMessage, {
      to: reservation.customer_phone,
      text: message,
    });
  },
});

export const getById = query({
  args: { id: v.id("reservations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
