"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Calendar, Clock, Users, CheckCircle2, Loader2 } from "lucide-react";
import { LuxuryButton } from "../ui/LuxuryButton";
import { useMutation, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: "text" | "component";
  componentType?: "date" | "time" | "party" | "form" | "confirmation";
};

export default function BookingChat() {
  const createReservation = useMutation(api.reservations.create);
  const notifyStaff = useAction(api.whatsapp.sendReservationNotificationToStaff);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Welcome to Terra. I am your digital concierge. How can I assist you today? I can help you book a table in English, Armenian, or Russian.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    partySize: "",
    name: "",
    phone: "",
    email: "",
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (role: "user" | "assistant", content: string, type: "text" | "component" = "text", componentType?: Message["componentType"]) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role,
      content,
      type,
      componentType,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const simulateResponse = (text: string, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage("assistant", text);
      setStep((prev) => prev + 1);
    }, delay);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    addMessage("user", userText);
    setInput("");

    // Simple flow logic
    if (step === 0) {
      simulateResponse("I'd be happy to help you with a reservation. For what date would you like to book a table?");
      setTimeout(() => {
        addMessage("assistant", "Please select a date:", "component", "date");
      }, 2000);
    } else {
      simulateResponse("I understand. Let me check our availability...");
    }
  };

  const selectDate = (date: string) => {
    addMessage("user", date);
    setBookingData({ ...bookingData, date });
    simulateResponse("Excellent. What time would you prefer?");
    setTimeout(() => {
      addMessage("assistant", "Please select a time:", "component", "time");
    }, 2000);
  };

  const selectTime = (time: string) => {
    addMessage("user", time);
    setBookingData({ ...bookingData, time });
    simulateResponse("Perfect. And for how many guests?");
    setTimeout(() => {
      addMessage("assistant", "Select party size:", "component", "party");
    }, 2000);
  };

  const selectParty = (size: string) => {
    addMessage("user", `${size} guests`);
    setBookingData({ ...bookingData, partySize: size });
    simulateResponse("Almost there. I just need a few details to finalize the booking.");
    setTimeout(() => {
      addMessage("assistant", "Please provide your contact information:", "component", "form");
    }, 2000);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;

    setBookingData({ ...bookingData, name, phone, email });
    addMessage("user", `Name: ${name}, Phone: ${phone}`);
    
    setIsTyping(true);
    
    try {
      // 1. Create reservation in Convex
      await createReservation({
        customer_name: name,
        customer_phone: phone,
        customer_email: email || undefined,
        date: bookingData.date,
        time: bookingData.time,
        party_size: parseInt(bookingData.partySize) || 2,
      });

      // 2. Notify staff via WhatsApp
      await notifyStaff({
        staffPhone: "+37400000000", // Default staff phone, would be config-driven in production
        customerName: name,
        date: bookingData.date,
        time: bookingData.time,
        partySize: parseInt(bookingData.partySize) || 2,
      });

      setIsTyping(false);
      addMessage("assistant", "Your table has been reserved! We look forward to serving you.", "component", "confirmation");
    } catch (error) {
      console.error("Booking error:", error);
      setIsTyping(false);
      addMessage("assistant", "I apologize, but there was an error processing your reservation. Please try again or call us directly.");
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-charcoal border border-white/10 rounded-lg overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-black/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-terracotta/20 flex items-center justify-center border border-terracotta/30">
            <Bot size={20} className="text-terracotta" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold tracking-wider uppercase">Terra Concierge</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-white/40 uppercase tracking-tighter">AI Assistant Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                  m.role === "user" ? "bg-gold/10 border-gold/30" : "bg-white/5 border-white/10"
                }`}>
                  {m.role === "user" ? <User size={14} className="text-gold" /> : <Bot size={14} className="text-terracotta" />}
                </div>
                
                <div className="space-y-2">
                  {m.type === "text" ? (
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user" 
                        ? "bg-gold text-charcoal rounded-tr-none font-medium" 
                        : "bg-white/5 border border-white/10 text-white/80 rounded-tl-none"
                    }`}>
                      {m.content}
                    </div>
                  ) : (
                    <div className="bg-black/40 border border-white/10 p-4 rounded-xl space-y-4 min-w-[280px]">
                      {m.componentType === "date" && (
                        <div className="grid grid-cols-3 gap-2">
                          {["May 1", "May 2", "May 3", "May 4", "May 5", "May 6"].map((d) => (
                            <button 
                              key={d} 
                              onClick={() => selectDate(d)}
                              className="p-2 border border-white/10 hover:border-gold/50 rounded text-xs transition-colors"
                            >
                              {d}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {m.componentType === "time" && (
                        <div className="grid grid-cols-3 gap-2">
                          {["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].map((t) => (
                            <button 
                              key={t}
                              onClick={() => selectTime(t)}
                              className="p-2 border border-white/10 hover:border-gold/50 rounded text-xs transition-colors"
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      )}

                      {m.componentType === "party" && (
                        <div className="grid grid-cols-4 gap-2">
                          {["1", "2", "3", "4", "5", "6", "7", "8+"].map((s) => (
                            <button 
                              key={s}
                              onClick={() => selectParty(s)}
                              className="p-2 border border-white/10 hover:border-gold/50 rounded text-xs transition-colors"
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}

                      {m.componentType === "form" && (
                        <form onSubmit={handleSubmitForm} className="space-y-3">
                          <input 
                            name="name"
                            required
                            placeholder="Full Name" 
                            className="w-full bg-white/5 border border-white/10 p-2 text-xs rounded focus:border-gold outline-none"
                          />
                          <input 
                            name="phone"
                            required
                            placeholder="Phone Number" 
                            className="w-full bg-white/5 border border-white/10 p-2 text-xs rounded focus:border-gold outline-none"
                          />
                          <LuxuryButton className="w-full py-2 text-[10px]">Confirm Details</LuxuryButton>
                        </form>
                      )}

                      {m.componentType === "confirmation" && (
                        <div className="text-center space-y-3 py-2">
                          <CheckCircle2 className="mx-auto text-emerald-500" size={32} />
                          <div>
                            <p className="text-xs text-white/60">Booking Reference</p>
                            <p className="text-lg font-mono font-bold text-gold tracking-widest uppercase">TERRA-8492</p>
                          </div>
                          <div className="flex justify-between text-[10px] text-white/40 pt-2 border-t border-white/5">
                            <span>{bookingData.date}</span>
                            <span>{bookingData.time}</span>
                            <span>{bookingData.partySize} Guests</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Bot size={14} className="text-terracotta" />
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-white/40 rounded-full"></motion.span>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/40 rounded-full"></motion.span>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/40 rounded-full"></motion.span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 bg-black/20 border-t border-white/10">
        <div className="relative flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm focus:border-gold/50 focus:outline-none transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 p-2 text-gold hover:text-gold/80 disabled:text-white/20 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-white/20 text-center mt-3 uppercase tracking-widest">
          Terra Restaurant &bull; High-End AI Concierge
        </p>
      </div>
    </div>
  );
}
