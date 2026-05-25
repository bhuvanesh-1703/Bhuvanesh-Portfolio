import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";
import { portfolioData } from "../data/portfolio.js";
import {
  SectionHeader,
  SectionWrapper,
  PremiumCard,
} from "./DesignSystem";

function Education() {
  const educationData = portfolioData.education;

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 },
    }),
  };

  const getIcon = (type) => {
    return type === "certification" ? Award : GraduationCap;
  };

  return (
    <SectionWrapper id="education">
      {/* Background ambient glow */}
      <div className="absolute left-1/4 bottom-1/4 w-80 h-80 bg-accent-teal/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          label="Journey"
          title="Education & Certifications"
          description="Building expertise through continuous learning and professional development."
        />

        {/* Centered Timeline Layout */}
        <div className="max-w-3xl mx-auto relative mt-16">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-teal/30 via-white/10 to-transparent" />

          <div className="space-y-8">
            {educationData.map((item, i) => {
              const Icon = getIcon(item.type);
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  custom={i}
                  variants={fadeUp}
                  className="relative flex gap-8 items-start sm:items-center"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-accent-teal/30 flex items-center justify-center text-accent-teal z-10 shadow-[0_10px_30px_rgba(20,184,166,0.15)] transition-all duration-300 hover:border-accent-teal/50 hover:shadow-[0_15px_40px_rgba(20,184,166,0.25)]"
                  >
                    <Icon size={18} />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="flex-1"
                  >
                    <PremiumCard className="p-5 sm:p-6 md:p-7">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                        <h3 className="text-base sm:text-lg font-display font-extrabold text-text-primary tracking-tight">
                          {item.degree}
                        </h3>
                        <span className="inline-flex items-center gap-2 text-[10px] font-bold text-accent-teal bg-accent-teal/10 border border-accent-teal/25 px-3 py-1.5 rounded-full whitespace-nowrap font-mono shadow-sm">
                          <CheckCircle2 size={11} />
                          {item.period}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                        {item.institution}
                      </p>
                    </PremiumCard>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Education;
