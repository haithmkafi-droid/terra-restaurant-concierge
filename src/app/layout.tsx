import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Navbar } from "@/components/ui/Navbar";
import { StructuredData } from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: {
    default: "Terra Restaurant | Luxury Dining Concierge",
    template: "%s | Terra Restaurant"
  },
  description: "Experience the finest cinematic dining at Terra. Our AI-powered concierge handles reservations in English, Russian, and Armenian.",
  keywords: ["luxury dining", "Terra restaurant", "AI concierge", "fine dining Yerevan", "multilingual reservations"],
  authors: [{ name: "Terra Digital Concierge" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://terra-restaurant.com",
    title: "Terra Restaurant | Luxury Dining Concierge",
    description: "Experience the finest cinematic dining at Terra. Our AI-powered concierge handles reservations.",
    siteName: "Terra Restaurant",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Terra Restaurant Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terra Restaurant | Luxury Dining Concierge",
    description: "Experience the finest cinematic dining at Terra.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://terra-restaurant.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-charcoal text-foreground`}
      >
        <StructuredData />
        <ConvexClientProvider>
          <div className="relative min-h-screen flex flex-col">
            {/* Elegant Border Overlay */}
            <div className="fixed inset-0 border-[12px] border-gold/5 pointer-events-none z-50" />
            
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <footer className="py-20 border-t border-white/5 text-center space-y-8">
              <div className="text-3xl font-serif tracking-[0.3em] text-gold uppercase">
                Terra
              </div>
              <div className="flex justify-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
                <a href="#" className="hover:text-gold transition-colors">Instagram</a>
                <a href="#" className="hover:text-gold transition-colors">Facebook</a>
                <a href="#" className="hover:text-gold transition-colors">TripAdvisor</a>
              </div>
              <div className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
                &copy; {new Date().getFullYear()} Terra Restaurant. All rights reserved.
              </div>
            </footer>
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

