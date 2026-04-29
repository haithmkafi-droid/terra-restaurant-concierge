import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  reservations: defineTable({
    customer_name: v.string(),
    customer_phone: v.string(),
    customer_email: v.optional(v.string()),
    date: v.string(), // YYYY-MM-DD
    time: v.string(), // HH:mm
    party_size: v.number(),
    special_requests: v.optional(v.string()),
    table_number: v.optional(v.number()),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
      v.literal("completed")
    ),
    created_at: v.number(),
  }).index("by_customer_phone", ["customer_phone"])
    .index("by_status", ["status"])
    .index("by_date", ["date"]),

  customers: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    preferred_language: v.optional(v.string()), // 'en', 'ru', 'am'
    created_at: v.number(),
  }).index("by_phone", ["phone"]),

  menu_items: defineTable({
    name: v.string(),
    name_am: v.string(),
    name_ru: v.string(),
    description: v.string(),
    description_am: v.string(),
    description_ru: v.string(),
    price: v.number(),
    category: v.string(),
    image_url: v.optional(v.string()),
    ingredients: v.array(v.string()),
    dietary_info: v.array(v.string()),
  }).index("by_category", ["category"]),

  incoming_messages: defineTable({
    from: v.string(),
    text: v.string(),
    whatsapp_id: v.string(),
    timestamp: v.number(),
    processed: v.boolean(),
  }).index("by_from", ["from"]),
});
