import { motion, useScroll, useSpring } from 'framer-motion';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <motion.div
      className="fixed top-0 left-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--color-accent-terracotta), var(--color-accent-sage))',
        boxShadow: '0 0 8px rgba(224, 122, 95, 0.3)',
        width: '100%',
      }}
    />
  );
}

export default ScrollProgress;
