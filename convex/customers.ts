import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getOrCreate = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    preferred_language: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("customers")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();

    if (existing) {
      if (args.name !== existing.name || args.email || args.preferred_language) {
        await ctx.db.patch(existing._id, {
          name: args.name,
          email: args.email ?? existing.email,
          preferred_language: args.preferred_language ?? existing.preferred_language,
        });
      }
      return existing._id;
    }

    const customerId = await ctx.db.insert("customers", {
      ...args,
      created_at: Date.now(),
    });
    return customerId;
  },
});

export const getByPhone = query({
  args: { phone: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("customers")
      .withIndex("by_phone", (q) => q.eq("phone", args.phone))
      .first();
  },
});
