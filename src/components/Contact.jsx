import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { CONTACT } from '../data/portfolio';
import { Github, Linkedin, Mail } from './Icons';
import { SectionWrapper, SectionHeader } from './DesignSystem';

const LINKS = [
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Github, label: 'GitHub', value: CONTACT.github.replace('https://', ''), href: CONTACT.github },
  { icon: Linkedin, label: 'LinkedIn', value: CONTACT.linkedin.replace('https://', ''), href: CONTACT.linkedin },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState('idle'); // idle | sending | success | error
  const reduceMotion = useReducedMotion();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState('sending');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        { from_name: form.name, from_email: form.email, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );
      setState('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setState('error');
    }
  };

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <SectionWrapper id="contact">
      <div className="max-w-[1400px] mx-auto py-24 md:py-32 lg:py-40 px-5 sm:px-10 md:px-16 lg:px-20">
        <SectionHeader title="LET'S TALK" subtitle="05 — CONTACT" />

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start relative z-10 mt-12">
          {/* Left Side: Contact Information */}
          <div>
            <motion.p
              {...motionProps}
              className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-md font-body font-light"
            >
              I am actively open to full-time roles, freelance projects, and architectural collaborations. Whether you have a position to fill or an ambitious idea to build — my inbox is open.
            </motion.p>

            <div className="flex flex-col gap-5">
              {LINKS.map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  {...motionProps}
                  className="group flex items-center gap-6 p-6 border border-white/10 bg-white/[0.02] hover:border-accent hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 text-white/80 group-hover:text-accent group-hover:scale-110 transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-accent text-xs font-mono uppercase tracking-[0.2em] mb-1 font-bold">{label}</p>
                    <p className="text-white text-sm font-mono font-medium">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side: Message Form */}
          <motion.form
            {...motionProps}
            onSubmit={handleSubmit}
            className="p-8 sm:p-10 border border-white/10 bg-[#080808] flex flex-col gap-6 shadow-2xl"
          >
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-white/70 text-xs font-mono uppercase tracking-widest mb-3" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-0 py-3 bg-transparent border-b border-white/15 focus:border-accent focus:outline-none text-white placeholder-white/30 text-base font-body transition-colors duration-200 rounded-none"
                />
              </div>
              <div>
                <label className="block text-white/70 text-xs font-mono uppercase tracking-widest mb-3" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-0 py-3 bg-transparent border-b border-white/15 focus:border-accent focus:outline-none text-white placeholder-white/30 text-base font-body transition-colors duration-200 rounded-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-xs font-mono uppercase tracking-widest mb-3" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or role..."
                className="w-full px-0 py-3 bg-transparent border-b border-white/15 focus:border-accent focus:outline-none text-white placeholder-white/30 text-base font-body transition-colors duration-200 resize-none rounded-none"
              />
            </div>

            {/* Notification messages */}
            {state === 'success' && (
              <div className="flex items-center gap-3 text-accent text-sm font-mono tracking-widest bg-accent/10 p-4 border border-accent/30">
                <CheckCircle size={18} />
                Message sent successfully. I will get back to you shortly!
              </div>
            )}
            {state === 'error' && (
              <div className="flex items-center gap-3 text-red-400 text-sm font-mono tracking-widest bg-red-500/10 p-4 border border-red-500/30">
                <AlertCircle size={18} />
                Error sending message. Please email me directly at {CONTACT.email}.
              </div>
            )}

            <button
              type="submit"
              disabled={state === 'sending'}
              className="group relative overflow-hidden rounded-none border border-accent px-8 py-4 mt-4 text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase transition-colors duration-300 hover:text-black disabled:opacity-50"
            >
              <div className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <span className="relative z-10 flex items-center justify-center gap-3">
                {state === 'sending' ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full group-hover:border-black/30 group-hover:border-t-black"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </span>
            </button>
          </motion.form>
        </div>
      </div>
    </SectionWrapper>
  );
}
