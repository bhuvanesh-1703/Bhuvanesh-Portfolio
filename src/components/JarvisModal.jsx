import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, Cpu } from "lucide-react";
import { HERO, SKILLS, PROJECTS } from "../data/portfolio";

// Simulated AI Logic
function generateJarvisResponse(input) {
  const lowercaseInput = input.toLowerCase();
  
  if (lowercaseInput.includes("skill") || lowercaseInput.includes("tech")) {
    const allSkills = SKILLS.flatMap(cat => cat.items.map(i => i.name)).join(", ");
    return `I am proficient in a wide range of technologies including ${allSkills}. Is there a specific framework you're interested in?`;
  }
  
  if (lowercaseInput.includes("project") || lowercaseInput.includes("work") || lowercaseInput.includes("portfolio")) {
    return `I have built several high-end projects, including ${PROJECTS.map(p => p.title).join(", ")}. You can check them out in the Projects section.`;
  }

  if (lowercaseInput.includes("contact") || lowercaseInput.includes("hire") || lowercaseInput.includes("email")) {
    return `You can reach out to me directly at ${HERO.contact.email} or connect with me on LinkedIn.`;
  }

  if (lowercaseInput.includes("experience") || lowercaseInput.includes("journey") || lowercaseInput.includes("education")) {
    return `I have a strong background in software engineering, continuously learning and building robust systems. Check out my Learning Journey section for details!`;
  }
  
  if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi") || lowercaseInput.includes("hey")) {
    return "Hello! I am Jarvis, Bhuvanesh's AI assistant. How can I help you today?";
  }

  return "That's an interesting question! I am a simulated AI assistant built specifically to answer questions about Bhuvanesh's portfolio. Try asking me about his skills, projects, or how to contact him.";
}

export default function JarvisModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hello, I am Jarvis. How can I help you learn more about Bhuvanesh?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      const response = generateJarvisResponse(userMessage);
      setMessages(prev => [...prev, { role: "system", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1000); // 800ms to 1800ms delay
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl bg-bg-primary border border-border-subtle shadow-2xl rounded-sm overflow-hidden flex flex-col h-[70vh] max-h-[700px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-secondary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-lime/10 flex items-center justify-center border border-accent-lime/30">
                  <Cpu size={16} className="text-accent-lime" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-white tracking-wide">JARVIS AI</h3>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary">Portfolio Assistant</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border ${
                    msg.role === "user" 
                      ? "bg-bg-secondary border-border-subtle text-text-secondary" 
                      : "bg-accent-lime/10 border-accent-lime/30 text-accent-lime"
                  }`}>
                    {msg.role === "user" ? <User size={14} /> : <Cpu size={14} />}
                  </div>
                  <div className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary mb-2">
                      {msg.role === "user" ? "You" : "Jarvis"}
                    </span>
                    <div className={`px-5 py-3.5 font-sans text-sm leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-white text-black" 
                        : "bg-bg-secondary border border-border-subtle text-text-secondary"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center border bg-accent-lime/10 border-accent-lime/30 text-accent-lime">
                    <Cpu size={14} />
                  </div>
                  <div className="flex flex-col items-start max-w-[80%]">
                     <span className="font-mono text-[9px] uppercase tracking-widest text-text-tertiary mb-2">
                      Jarvis
                    </span>
                    <div className="px-5 py-3.5 font-sans text-sm leading-relaxed bg-bg-secondary border border-border-subtle text-text-secondary flex gap-1">
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
                      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-bg-secondary border-t border-border-subtle">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Jarvis about my work..."
                  className="w-full bg-bg-primary border border-border-subtle px-4 py-3 pr-12 text-sm text-white placeholder-text-tertiary focus:outline-none focus:border-accent-lime focus:ring-1 focus:ring-accent-lime transition-all"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 p-2 text-text-secondary hover:text-accent-lime disabled:opacity-50 disabled:hover:text-text-secondary transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
