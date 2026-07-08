import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Add class to body to hide default cursor
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Update position via translate3d for GPU-accelerated performance
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Check if hovering interactive elements using fast query selector matching
      const target = e.target;
      if (target) {
        const isHovering = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer');
        
        if (isHovering) {
          if (cursorRef.current) {
            cursorRef.current.style.width = '40px';
            cursorRef.current.style.height = '40px';
            cursorRef.current.style.borderColor = 'rgba(224, 122, 95, 0.6)';
            cursorRef.current.style.backgroundColor = 'rgba(224, 122, 95, 0.08)';
          }
          if (glowRef.current) {
            glowRef.current.style.width = '120px';
            glowRef.current.style.height = '120px';
          }
        } else {
          if (cursorRef.current) {
            cursorRef.current.style.width = '12px';
            cursorRef.current.style.height = '12px';
            cursorRef.current.style.borderColor = 'rgba(224, 122, 95, 0.35)';
            cursorRef.current.style.backgroundColor = 'rgba(224, 122, 95, 0.15)';
          }
          if (glowRef.current) {
            glowRef.current.style.width = '200px';
            glowRef.current.style.height = '200px';
          }
        }
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
      if (glowRef.current) glowRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <>
      {/* Glow */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[9999] top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-300 ease-out opacity-0"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(224, 122, 95, 0.04) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
      {/* Dot */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[10000] top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,border-color,background-color] duration-200 ease-out opacity-0"
        style={{
          width: '12px',
          height: '12px',
          border: '2px solid rgba(224, 122, 95, 0.35)',
          background: 'rgba(224, 122, 95, 0.15)',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
