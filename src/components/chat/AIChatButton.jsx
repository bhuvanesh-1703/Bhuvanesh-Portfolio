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

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      300,
      audioCtx.currentTime + 0.1,
    );

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + 0.2,
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.2);
  } catch {
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

    const triggerPopup = () => {
      const stillNotInteracted = sessionStorage.getItem("chat_interacted");
      if (!stillNotInteracted && !isOpen && !showPopup) {
        setShowPopup(true);
        setIsAnimating(true);
        playNotificationSound();

        hideTimer = setTimeout(() => {
          setShowPopup(false);
          setIsAnimating(false);
        }, 8000);
      }
    };

    if (!hasInteracted) {
      // 10 second idle delay so it doesn't compete with Hero scroll animation
      popupTimer = setTimeout(triggerPopup, 10000);

      // Or trigger after scrolling past Hero section (800px)
      const onScroll = () => {
        if (window.scrollY > 800) {
          triggerPopup();
          window.removeEventListener("scroll", onScroll);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        clearTimeout(popupTimer);
        clearTimeout(hideTimer);
      };
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
  }, [isOpen, showPopup]);

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
              className="mb-4 relative w-[260px] bg-[#0b0b0b]/90 backdrop-blur-md border border-white/10 shadow-2xl p-4 rounded-[18px]"
            >
              <div className="flex flex-col gap-2">
                <p className="font-sans text-sm text-white leading-relaxed">
                  👋 Welcome!
                  <br />
                  Need help exploring my portfolio?
                  <br />
                  <span className="text-white/60 text-[11px] mt-1 block">
                    Ask me anything about my projects, skills, or resume.
                  </span>
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={toggleChat}
                    className="flex-1 bg-accent text-black text-[11px] font-bold py-2 rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Open Chat
                  </button>
                  <button
                    onClick={dismissPopup}
                    className="flex-1 bg-transparent border border-white/10 text-white/70 text-[11px] font-semibold py-2 rounded-lg hover:text-white hover:bg-white/10 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>

              {/* CSS Triangle pointing to the FAB */}
              <div className="absolute -bottom-2 right-5 w-4 h-4 bg-[#0b0b0b] border-b border-r border-white/10 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: isAnimating ? [0, -15, 0] : 0,
          }}
          transition={{
            y: { duration: 0.5, ease: "easeOut" },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleChat}
          className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-[#0b0b0b] border border-accent text-accent"
              : "bg-accent text-black hover:scale-105"
          }`}
          aria-label="Toggle AI Assistant"
        >
          {/* Pulse Glow Effect */}
          {isAnimating && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-accent"
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
        <AIChatWindow
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            sessionStorage.setItem("chat_interacted", "true");
          }}
        />
      </Suspense>
    </>
  );
}
