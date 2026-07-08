import { motion } from 'framer-motion';
import { JOURNEY } from '../data/portfolio';
import { SectionWrapper, SectionHeader, animationConfig } from './DesignSystem';

export default function Journey() {
  return (
    <SectionWrapper id="journey" hasBackground={true}>
      <SectionHeader title="TRAJECTORY" subtitle="Learning Journey" />

      <div className="relative z-10 w-full mt-16 md:mt-24">
        {/* Timeline Layout */}
        <div className="flex flex-col">
          {JOURNEY.map((item, index) => {
            return (
              <motion.div
                key={index}
                variants={animationConfig.fadeUp}
                custom={index * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="group relative flex flex-col md:flex-row md:items-start gap-6 md:gap-16 border-t border-border-subtle py-12 transition-colors duration-500 hover:bg-bg-secondary"
              >
                {/* Left side: Period and Institution */}
                <div className="w-full md:w-1/3 flex flex-col gap-2 md:pl-6">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-text-secondary group-hover:text-accent-lime transition-colors">
                    {item.period}
                  </span>
                  <span className="text-text-primary font-sans font-medium text-lg">
                    {item.institution}
                  </span>
                </div>
                
                {/* Right side: Title and Description */}
                <div className="w-full md:w-2/3 flex flex-col gap-4 md:pr-6">
                  <h3 className="text-text-primary font-sans font-bold text-2xl md:text-3xl tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary font-sans font-light text-base md:text-lg leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
