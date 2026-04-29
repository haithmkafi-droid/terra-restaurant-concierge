"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LuxuryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline";
}

export function LuxuryButton({ children, onClick, className, variant = "primary" }: LuxuryButtonProps) {
  const baseStyles = "px-8 py-3 uppercase tracking-widest text-xs transition-all duration-500 relative overflow-hidden group";
  
  const variants = {
    primary: "bg-terracotta text-white hover:bg-terracotta/90",
    outline: "border border-gold/30 text-gold hover:bg-gold/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      <span className="relative z-10">{children}</span>
      <motion.div 
        className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"
        initial={false}
      />
    </motion.button>
  );
}
