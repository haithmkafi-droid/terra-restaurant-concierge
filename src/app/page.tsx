"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryButton } from "@/components/ui/LuxuryButton";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MenuCard } from "@/components/ui/MenuCard";
import BookingChat from "@/components/ai/BookingChat";
import { X } from "lucide-react";
import Link from "next/link";

const featuredItems = [
  {
    name: "Grilled Octopus",
    description: "Saffron-infused potatoes, chorizo oil, smoked paprika foam.",
    price: 34.0,
    category: "Appetizer",
  },
  {
    name: "Aged Ribeye",
    description: "45-day dry-aged beef, bone marrow crust, truffle jus.",
    price: 58.0,
    category: "Main Course",
  },
  {
    name: "Gold Leaf Risotto",
    description: "Acquerello rice, 24k edible gold, champagne reduction.",
    price: 42.0,
    category: "Signature",
  },
];

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070')] bg-cover bg-center opacity-20 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />
        
        <div className="relative z-10 max-w-5xl px-8 text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.8em" }}
            transition={{ duration: 1.5 }}
            className="text-gold uppercase text-xs md:text-sm font-light"
          >
            Taste the Extraordinary
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-6xl md:text-9xl font-serif text-white leading-tight"
          >
            Terra <br />
            <span className="italic text-gold/60 text-5xl md:text-8xl">Restaurant</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            A cinematic culinary journey where earthy traditions meet modern luxury.
            Reservations handled by our multilingual AI concierge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8"
          >
            <Link href="/menu">
              <LuxuryButton>
                Explore Menu
              </LuxuryButton>
            </Link>
            <LuxuryButton variant="outline" onClick={() => setIsBookingOpen(true)}>
              Book Experience
            </LuxuryButton>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gold/30 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/30 to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-8 lg:px-16 bg-charcoal">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <SectionTitle 
              subtitle="Our Philosophy" 
              title="The Art of Earthly Dining" 
              align="left"
            />
            <p className="text-white/60 leading-loose font-light">
              Terra is born from a desire to reconnect fine dining with the raw beauty of the earth. 
              Our name represents the foundation of everything we serve—from the volcanic soils of our 
              vineyards to the artisanal clay plates that hold our creations.
            </p>
            <p className="text-white/60 leading-loose font-light">
              We've integrated state-of-the-art AI technology to ensure your journey begins 
              with the same level of care and precision as our kitchen provides. 
              Speak to us in your preferred language—English, Russian, or Armenian.
            </p>
            <LuxuryButton variant="outline" className="mt-4">
              Learn Our Story
            </LuxuryButton>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 border border-gold/20 translate-x-6 translate-y-6" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="menu" className="py-32 px-8 lg:px-16 bg-black/20">
        <div className="max-w-7xl mx-auto space-y-20">
          <SectionTitle 
            subtitle="Curated Selection" 
            title="Chef's Tasting Menu" 
            description="A seasonal collection of our most distinguished creations."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredItems.map((item, index) => (
              <MenuCard key={index} {...item} />
            ))}
          </div>
          
          <div className="text-center">
            <LuxuryButton variant="outline">View Full Menu</LuxuryButton>
          </div>
        </div>
      </section>

      {/* Reservation CTA Section */}
      <section id="reservations" className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966842-28474600e121?q=80&w=2071')] bg-cover bg-fixed bg-center opacity-10" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center space-y-10">
          <SectionTitle 
            subtitle="Reservations" 
            title="Secure Your Table" 
          />
          <p className="text-xl text-white/60 font-light">
            Our AI Concierge is available 24/7 to handle your bookings and answer questions 
            about our seasonal menu and ingredients.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <LuxuryButton className="px-16" onClick={() => setIsBookingOpen(true)}>
              Book via AI Agent
            </LuxuryButton>
            <Link href="/menu">
              <LuxuryButton variant="outline" className="px-16">
                View Menu Assistant
              </LuxuryButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-charcoal rounded-lg shadow-2xl border border-white/10 overflow-hidden"
            >
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white z-50 p-2"
              >
                <X size={20} />
              </button>
              <BookingChat />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
