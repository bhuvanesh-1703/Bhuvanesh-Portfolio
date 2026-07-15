import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X } from "lucide-react";

const AIChatWindow = lazy(() => import("./AIChatWindow"));

// Helper to play a soft, modern notification "pop" using Web Audio API
const playNotificationSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    // High pitch dropping quickly for a "pop"
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.2);
  } catch (e) {
    // Ignore audio context or autoplay restriction errors
  }
};

export default function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hasInteracted = sessionStorage.getItem("chat_interacted");

    let popupTimer;
    let hideTimer;

    if (!hasInteracted) {
      popupTimer = setTimeout(() => {
        // Double check in case it changed
        const stillNotInteracted = sessionStorage.getItem("chat_interacted");
        if (!stillNotInteracted && !isOpen) {
          setShowPopup(true);
          setIsAnimating(true);
          playNotificationSound();
          
          hideTimer = setTimeout(() => {
            setShowPopup(false);
            setIsAnimating(false);
          }, 8000); // auto-hide after 8 seconds
        }
      }, 3000); // 3 seconds delay
    }

    const handleOpenChat = () => {
      setIsOpen(true);
      setShowPopup(false);
      setIsAnimating(false);
      sessionStorage.setItem("chat_interacted", "true");
    };

    window.addEventListener("open-chat", handleOpenChat);

    return () => {
      window.removeEventListener("open-chat", handleOpenChat);
      clearTimeout(popupTimer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  const toggleChat = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      setShowPopup(false);
      setIsAnimating(false);
      sessionStorage.setItem("chat_interacted", "true");
    }
  };

  const dismissPopup = (e) => {
    e.stopPropagation();
    setShowPopup(false);
    setIsAnimating(false);
    sessionStorage.setItem("chat_interacted", "true");
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="mb-4 relative w-[260px] bg-bg-secondary/80 backdrop-blur-md border border-border-subtle shadow-2xl p-4 rounded-[18px]"
            >
              <div className="flex flex-col gap-2">
                <p className="font-sans text-sm text-text-primary leading-relaxed">
                  👋 Welcome!<br/>
                  Need help exploring my portfolio?<br/>
                  <span className="text-text-secondary text-[11px] mt-1 block">Ask me anything about my projects, skills, or resume.</span>
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={toggleChat}
                    className="flex-1 bg-[#C6FF1A] text-black text-[11px] font-semibold py-2 rounded-lg hover:bg-[#C6FF1A]/90 transition-colors"
                  >
                    Open Chat
                  </button>
                  <button
                    onClick={dismissPopup}
                    className="flex-1 bg-transparent border border-border-subtle text-text-secondary text-[11px] font-semibold py-2 rounded-lg hover:text-white hover:bg-border-subtle/50 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              
              {/* CSS Triangle pointing to the FAB */}
              <div className="absolute -bottom-2 right-5 w-4 h-4 bg-bg-secondary/80 backdrop-blur-md border-b border-r border-border-subtle rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: isAnimating ? [0, -15, 0] : 0 
          }}
          transition={{ 
            y: { duration: 0.5, ease: "easeOut" }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className={`relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors duration-300 ${
            isOpen
              ? "bg-bg-secondary border border-[#C6FF1A] text-[#C6FF1A]"
              : "bg-[#C6FF1A] text-black hover:bg-[#C6FF1A]/90"
          }`}
          aria-label="Toggle AI Assistant"
        >
          {/* Pulse Glow Effect */}
          {isAnimating && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#C6FF1A]"
              animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bot size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <Suspense fallback={null}>
        <AIChatWindow isOpen={isOpen} onClose={() => {
          setIsOpen(false);
          sessionStorage.setItem("chat_interacted", "true");
        }} />
      </Suspense>
    </>
  );
}
