import { v } from "convex/values";
import { mutation, internalMutation } from "./_generated/server";

export const saveIncoming = internalMutation({
  args: {
    from: v.string(),
    text: v.string(),
    whatsappId: v.string(),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("incoming_messages", {
      from: args.from,
      text: args.text,
      whatsappId: args.whatsappId,
      timestamp: args.timestamp,
      processed: false,
    });
    return messageId;
  },
});

export const markProcessed = mutation({
  args: { id: v.id("incoming_messages") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { processed: true });
  },
});
