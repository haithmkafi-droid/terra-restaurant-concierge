"use client";

import MenuAssistant from "@/components/ai/MenuAssistant";
import { Navbar } from "@/components/ui/Navbar";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navbar />
      <MenuAssistant />
    </main>
  );
}
