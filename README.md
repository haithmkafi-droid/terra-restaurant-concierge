# Terra Restaurant AI Concierge

This is the shared repository for the Terra Restaurant AI Concierge system.

## Stack
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion
- **Backend**: Convex (Database, Serverless Functions, Auth)
- **Messaging**: WhatsApp Business Cloud API

## Shared Directory Structure
- `convex/`: Backend schema and functions
  - `schema.ts`: Database definition
  - `reservations.ts`: Booking logic & Management API
  - `customers.ts`: Profile management
  - `menu.ts`: Multilingual menu data
  - `whatsapp.ts`: Messaging actions
  - `analytics.ts`: Dashboard stats
- `src/`: Next.js application source
  - `app/`: Pages and layouts
  - `components/`: UI components (Luxury design)
  - `providers/`: Context providers (Convex, etc.)

## Management API
The following endpoints are available for the staff dashboard:
- `reservations:confirmAndNotify`: Confirms a booking and sends a WhatsApp alert.
- `reservations:assignTable`: Tracks physical table assignments.
- `analytics:getDailyStats`: Aggregates booking data for a given date.

## WhatsApp Setup
Required environment variables in Convex:
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_VERIFY_TOKEN`

## Getting Started
1. `npm install`
2. `npx convex dev`
