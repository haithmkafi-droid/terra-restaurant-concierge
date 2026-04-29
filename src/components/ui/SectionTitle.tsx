"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  subtitle: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionTitle({ subtitle, title, description, align = "center" }: SectionTitleProps) {
  return (
    <div className={`space-y-4 ${align === "center" ? "text-center mx-auto" : "text-left"}`}>
      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.2em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-gold uppercase text-xs md:text-sm block"
      >
        {subtitle}
      </motion.span>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl md:text-5xl font-serif text-white leading-tight"
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/40 max-w-2xl mx-auto font-light"
        >
          {description}
        </motion.p>
      )}
      
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "80px" }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className={`h-px bg-gold/30 mt-8 ${align === "center" ? "mx-auto" : ""}`}
      />
    </div>
  );
}
