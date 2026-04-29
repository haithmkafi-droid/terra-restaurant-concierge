import { v } from "convex/values";
import { query } from "./_generated/server";

export const getDailyStats = query({
  args: { date: v.string() }, // YYYY-MM-DD
  handler: async (ctx, args) => {
    const reservations = await ctx.db
      .query("reservations")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .collect();

    const totalBookings = reservations.length;
    const totalGuests = reservations.reduce((acc, res) => acc + res.party_size, 0);
    const pendingCount = reservations.filter(r => r.status === "pending").length;
    const confirmedCount = reservations.filter(r => r.status === "confirmed").length;

    // Hourly distribution
    const hourlyDistribution: Record<string, number> = {};
    // Party size distribution
    const partySizeDistribution: Record<string, number> = {};
    
    reservations.forEach(res => {
      const hour = res.time.split(":")[0];
      hourlyDistribution[hour] = (hourlyDistribution[hour] || 0) + 1;
      
      const size = res.party_size.toString();
      partySizeDistribution[size] = (partySizeDistribution[size] || 0) + 1;
    });

    return {
      totalBookings,
      totalGuests,
      pendingCount,
      confirmedCount,
      hourlyDistribution,
      partySizeDistribution,
    };
  },
});
