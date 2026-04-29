"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MenuCardProps {
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

export function MenuCard({ name, description, price, image, category }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="group bg-charcoal border border-white/5 hover:border-gold/20 p-4 transition-all duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-black/20">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/10 uppercase tracking-widest text-xs">
            Terra Signature
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-charcoal/80 text-gold text-[10px] uppercase tracking-widest backdrop-blur-sm border border-gold/10">
            {category}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 text-center">
        <h3 className="text-xl font-serif text-white group-hover:text-gold transition-colors duration-500">
          {name}
        </h3>
        <p className="text-sm text-white/40 font-light line-clamp-2 px-4">
          {description}
        </p>
        <div className="pt-4 flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-gold/20" />
          <span className="text-gold font-serif">
            ${price.toFixed(2)}
          </span>
          <div className="h-px w-8 bg-gold/20" />
        </div>
      </div>
    </motion.div>
  );
}
