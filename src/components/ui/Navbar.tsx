"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LuxuryButton } from "./LuxuryButton";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Menu", href: "#menu" },
    { name: "Reservations", href: "#reservations" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? "bg-charcoal/90 backdrop-blur-md h-16 border-b border-white/5" : "bg-transparent h-24"
        }`}
      >
        <div className="h-full max-w-7xl mx-auto px-8 lg:px-16 flex items-center justify-between">
          <div className="text-2xl font-serif tracking-[0.2em] text-gold uppercase cursor-pointer">
            Terra
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.3em] font-light">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-gold transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <LuxuryButton variant="outline" className="px-6 py-2">
              Book a Table
            </LuxuryButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gold p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-charcoal flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xl uppercase tracking-[0.4em] text-gold font-serif"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <LuxuryButton className="mt-4" onClick={() => setIsMobileMenuOpen(false)}>
              Book a Table
            </LuxuryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
