"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, X, MessageSquare, ChefHat, Leaf, Flame, Sparkles } from "lucide-react";
import { MenuCard } from "../ui/MenuCard";
import { LuxuryButton } from "../ui/LuxuryButton";

const categories = ["Appetizers", "Main Courses", "Desserts", "Drinks", "Wine"];

const menuItems = [
  {
    id: 1,
    name: "Truffle Infused Burrata",
    description: "Creamy burrata heart, black truffle shavings, heirloom tomatoes, and aged balsamic glaze.",
    price: 24,
    category: "Appetizers",
    ingredients: ["Burrata Cheese", "Black Truffle", "Heirloom Tomatoes", "Balsamic Glaze", "Basil Oil"],
    dietary: ["Vegetarian", "Gluten-Free"],
    allergens: ["Dairy"],
  },
  {
    id: 2,
    name: "Seared Scallops",
    description: "Pan-seared Hokkaido scallops with cauliflower purée and crispy pancetta.",
    price: 32,
    category: "Appetizers",
    ingredients: ["Scallops", "Cauliflower", "Pancetta", "Lemon Butter", "Microgreens"],
    dietary: [],
    allergens: ["Shellfish", "Dairy"],
  },
  {
    id: 3,
    name: "Terra Prime Rib",
    description: "24-hour slow-cooked prime rib served with truffle mash and red wine reduction.",
    price: 58,
    category: "Main Courses",
    ingredients: ["Prime Rib", "Truffle", "Potato", "Red Wine", "Bone Marrow"],
    dietary: ["Gluten-Free"],
    allergens: ["Dairy"],
  },
  {
    id: 4,
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, seasonal wild mushrooms, parmesan reggiano, and herb oil.",
    price: 36,
    category: "Main Courses",
    ingredients: ["Arborio Rice", "Porcini Mushrooms", "Parmesan", "Shallots", "White Wine"],
    dietary: ["Vegetarian", "Gluten-Free"],
    allergens: ["Dairy"],
  },
  {
    id: 5,
    name: "Gold Leaf Fondant",
    description: "Dark chocolate fondant topped with edible 24K gold leaf and vanilla bean gelato.",
    price: 18,
    category: "Desserts",
    ingredients: ["70% Cocoa Chocolate", "24K Gold Leaf", "Vanilla Bean", "Eggs", "Butter"],
    dietary: ["Vegetarian"],
    allergens: ["Dairy", "Eggs", "Gluten"],
  },
];

export default function MenuAssistant() {
  const [activeCategory, setActiveCategory] = useState("Appetizers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<typeof menuItems[0] | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hello! I'm your menu assistant. Ask me anything about our ingredients, flavors, or wine pairings." }
  ]);
  const [chatInput, setChatInput] = useState("");

  const filteredItems = menuItems.filter(item => 
    item.category === activeCategory && 
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);
    setChatInput("");
    
    // Simple simulated menu Q&A
    setTimeout(() => {
      let response = "That's a great question about our menu. Our chefs use only the finest locally sourced ingredients combined with luxury imports like our Italian truffles.";
      if (chatInput.toLowerCase().includes("truffle")) {
        response = "We use premium Black Winter Truffles in our Burrata and Prime Rib. They are known for their intense, earthy aroma and complex flavor profile.";
      } else if (chatInput.toLowerCase().includes("vegan") || chatInput.toLowerCase().includes("vegetarian")) {
        response = "We have several excellent vegetarian options, including the Burrata and Wild Mushroom Risotto. Our chef can also adapt many dishes to be vegan upon request.";
      } else if (chatInput.toLowerCase().includes("wine")) {
        response = "I recommend a full-bodied Cabernet Sauvignon to pair with our Prime Rib, or a crisp Chardonnay for the Seared Scallops.";
      }
      setChatMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-charcoal text-white pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gold">
              <ChefHat size={20} />
              <span className="uppercase tracking-[0.3em] text-xs font-bold">Culinary Experience</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif">The Terra Menu</h1>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:border-gold outline-none transition-all"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-12 gap-8 no-scrollbar border-b border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap uppercase tracking-widest text-xs font-bold transition-all relative pb-4 ${
                activeCategory === cat ? "text-gold" : "text-white/40 hover:text-white"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                />
              )}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} onClick={() => setSelectedItem(item)} className="cursor-pointer">
              <MenuCard 
                name={item.name}
                description={item.description}
                price={item.price}
                category={item.category}
              />
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-xl">
            <p className="text-white/40 uppercase tracking-widest text-sm">No items found in this category</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-charcoal border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white z-10"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-black/40">
                  <div className="absolute inset-0 flex items-center justify-center text-gold/20 flex-col gap-4">
                    <Sparkles size={48} />
                    <span className="uppercase tracking-[0.5em] text-[10px]">Cinematic Visual Placeholder</span>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 p-8 md:p-12 space-y-8">
                  <div>
                    <div className="flex items-center gap-2 text-gold mb-4">
                      <span className="text-[10px] uppercase tracking-widest px-2 py-1 border border-gold/20">Signature Dish</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif mb-4">{selectedItem.name}</h2>
                    <p className="text-white/60 leading-relaxed">{selectedItem.description}</p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold">Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.ingredients.map(ing => (
                        <span key={ing} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/80">{ing}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-6">
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold">Dietary</h4>
                      <div className="flex flex-col gap-2">
                        {selectedItem.dietary.map(d => (
                          <div key={d} className="flex items-center gap-2 text-xs text-white/60">
                            {d === "Vegetarian" ? <Leaf size={14} className="text-emerald-500" /> : <Flame size={14} className="text-orange-500" />}
                            {d}
                          </div>
                        ))}
                        {selectedItem.dietary.length === 0 && <span className="text-xs text-white/20 italic">None specified</span>}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-widest text-gold font-bold">Allergens</h4>
                      <div className="flex flex-col gap-2">
                        {selectedItem.allergens.map(a => (
                          <div key={a} className="flex items-center gap-2 text-xs text-white/60">
                            <Info size={14} className="text-blue-500" />
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 flex items-center justify-between">
                    <span className="text-3xl font-serif text-gold">${selectedItem.price.toFixed(2)}</span>
                    <LuxuryButton onClick={() => { setSelectedItem(null); setShowChat(true); }}>Ask AI Assistant</LuxuryButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Chat Panel */}
      <div className="fixed bottom-8 right-8 z-40">
        <button 
          onClick={() => setShowChat(!showChat)}
          className="w-16 h-16 bg-gold rounded-full shadow-2xl flex items-center justify-center text-charcoal hover:scale-110 transition-transform active:scale-95"
        >
          {showChat ? <X size={28} /> : <MessageSquare size={28} />}
        </button>

        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-charcoal border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4 bg-black/40 border-b border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Sparkles size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest">Menu Assistant</h4>
                  <p className="text-[10px] text-emerald-500 uppercase font-bold tracking-tighter">Powered by Terra AI</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                      m.role === 'user' 
                        ? 'bg-gold text-charcoal font-medium rounded-tr-none' 
                        : 'bg-white/5 border border-white/10 text-white/80 rounded-tl-none'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-black/20 border-t border-white/10">
                <div className="relative">
                  <input 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about ingredients or pairings..."
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-4 pr-10 text-xs focus:border-gold outline-none"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gold"
                  >
                    <Search size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
