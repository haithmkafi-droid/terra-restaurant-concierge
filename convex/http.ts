import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

// WhatsApp Webhook Verification (GET)
http.route({
  path: "/whatsapp",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      console.log("Webhook verified");
      return new Response(challenge, { status: 200 });
    }

    return new Response("Forbidden", { status: 403 });
  }),
});

// Incoming WhatsApp Messages (POST)
http.route({
  path: "/whatsapp",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    
    // Check if it's a valid WhatsApp message structure
    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          if (change.value.messages) {
            for (const message of change.value.messages) {
              if (message.type === "text") {
                await ctx.runMutation(internal.messages.saveIncoming, {
                  from: message.from,
                  text: message.text.body,
                  whatsappId: message.id,
                  timestamp: parseInt(message.timestamp) * 1000,
                });
              }
            }
          }
        }
      }
      return new Response("OK", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  }),
});

export default http;
