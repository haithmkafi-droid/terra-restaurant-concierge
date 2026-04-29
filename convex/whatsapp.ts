import { v } from "convex/values";
import { action } from "./_generated/server";

const WHATSAPP_API_VERSION = "v17.0";
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

async function sendWhatsAppMessage(to: string, text: string) {
  if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
    console.error("WhatsApp credentials not configured");
    return { success: false, error: "Credentials missing" };
  }

  const response = await fetch(
    `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "text",
        text: { preview_url: false, body: text },
      }),
    }
  );

  const result = await response.json();
  if (!response.ok) {
    console.error("WhatsApp API error:", result);
    return { success: false, error: result.error?.message || "Unknown error" };
  }

  return { success: true, messageId: result.messages?.[0]?.id };
}

export const sendMessage = action({
  args: {
    to: v.string(),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await sendWhatsAppMessage(args.to, args.text);
  },
});

export const sendReservationNotificationToStaff = action({
  args: {
    staffPhone: v.string(),
    customerName: v.string(),
    date: v.string(),
    time: v.string(),
    partySize: v.number(),
    specialRequests: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const text = `🛎️ *New Reservation Confirmed*\n\n` +
      `Name: ${args.customerName}\n` +
      `Date: ${args.date}\n` +
      `Time: ${args.time}\n` +
      `Party Size: ${args.partySize}\n` +
      `Special Requests: ${args.specialRequests || "None"}\n\n` +
      `Please prepare the table.`;
    
    return await sendWhatsAppMessage(args.staffPhone, text);
  },
});
