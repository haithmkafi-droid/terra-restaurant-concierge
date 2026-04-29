import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("menu_items")
        .withIndex("by_category", (q) => q.eq("category", args.category))
        .collect();
    }
    return await ctx.db.query("menu_items").collect();
  },
});

export const searchByIngredient = query({
  args: { ingredient: v.string() },
  handler: async (ctx, args) => {
    const allItems = await ctx.db.query("menu_items").collect();
    return allItems.filter(item => 
      item.ingredients.some(ing => 
        ing.toLowerCase().includes(args.ingredient.toLowerCase())
      )
    );
  },
});

export const getById = query({
  args: { id: v.id("menu_items") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const addMenuItem = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("menu_items", args);
  },
});
