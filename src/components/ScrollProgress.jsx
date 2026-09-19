import { motion, useScroll, useSpring } from 'framer-motion';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  return (
    <motion.div
      className="fixed top-0 left-0 z-[60] h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #6fd400, #91ff00)',
        boxShadow: '0 0 8px rgba(145, 255, 0, 0.4)',
        width: '100%',
      }}
    />
  );
}

export default ScrollProgress;
