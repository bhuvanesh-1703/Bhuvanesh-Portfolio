import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowUpRight } from "lucide-react";
import { sendMessageToGemini } from "../../services/gemini";
import ChatMessage from "./ChatMessage";
import { HERO, CONTACT } from "../../data/portfolio";

const SUGGESTED_PROMPTS = [
  "What projects has Bhuvanesh built?",
  "What's his tech stack?",
  "Tell me about FarmAura",
  "How can I contact him?",
];

export default function AIChatWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content:
        "👋 Welcome to my portfolio!\n\nI'm Bhuvanesh's AI Assistant.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus input after opening animation
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build history for context (exclude the initial greeting)
      const history = messages
        .filter((m) => m.role !== "error")
        .map((m) => ({
          role: m.role === "ai" ? "model" : "user",
          content: m.content,
        }));

      const response = await sendMessageToGemini(text.trim(), history);
      setMessages((prev) => [...prev, { role: "ai", content: response }]);
    } catch (error) {
      console.error("Chat error:", error);

      // Fallback: direct them to resume/GitHub
      const fallbackMessage = `I'm having trouble connecting right now. In the meantime, you can:\n\n- 📄 [View Resume](${HERO.resume.href})\n- 💻 [Browse GitHub](${CONTACT.github})\n- ✉️ [Email Bhuvanesh](mailto:${CONTACT.email})`;

      setMessages((prev) => [
        ...prev,
        { role: "error", content: fallbackMessage },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-24 right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[420px] max-h-[70vh] bg-bg-primary border border-border-subtle shadow-2xl shadow-black/40 flex flex-col rounded-sm overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border-subtle bg-bg-secondary shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#C6FF1A]/15 flex items-center justify-center border border-[#C6FF1A]/30">
                <span className="text-[#C6FF1A] text-xs font-bold">AI</span>
              </div>
              <div>
                <h3 className="font-sans text-sm font-semibold text-white tracking-wide">
                  Portfolio Assistant
                </h3>
                <p className="font-mono text-[8px] uppercase tracking-widest text-text-tertiary">
                  Gemini API + RAG over project docs
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}

            {isLoading && (
              <div className="flex gap-3 self-start">
                <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center mt-1 bg-[#C6FF1A]/20 text-[#C6FF1A]">
                  <span className="text-[10px] font-bold">AI</span>
                </div>
                <div className="p-3 rounded-xl bg-bg-secondary border border-border-subtle rounded-tl-none">
                  <div className="flex gap-1">
                    <motion.span
                      className="w-2 h-2 rounded-full bg-text-tertiary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        delay: 0,
                      }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-text-tertiary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        delay: 0.2,
                      }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-text-tertiary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2,
                        delay: 0.4,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-1.5 shrink-0">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  disabled={isLoading}
                  className="px-2.5 py-1.5 border border-border-subtle text-[10px] font-mono text-text-secondary hover:text-[#C6FF1A] hover:border-[#C6FF1A]/40 transition-colors disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border-subtle bg-bg-secondary shrink-0">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, experience..."
                disabled={isLoading}
                className="w-full bg-bg-primary border border-border-subtle px-4 py-2.5 pr-12 text-sm text-white placeholder-text-tertiary focus:outline-none focus:border-[#C6FF1A] transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 text-text-secondary hover:text-[#C6FF1A] disabled:opacity-30 disabled:hover:text-text-secondary transition-colors"
              >
                <Send size={16} />
              </button>
            </form>

            {/* Tech credit */}
            <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-widest text-text-tertiary">
              Built with Gemini API + RAG over my project docs
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
