import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { CONTACT } from '../data/portfolio';
import { Github, Linkedin, Mail } from './Icons';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const LINKS = [
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Github, label: 'GitHub', value: CONTACT.github.replace('https://', ''), href: CONTACT.github },
  { icon: Linkedin, label: 'LinkedIn', value: CONTACT.linkedin.replace('https://', ''), href: CONTACT.linkedin },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState('idle'); // idle | sending | success | error

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

  return (
    <section id="contact" className="py-24 md:py-28 relative bg-bg-primary">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-accent-terracotta/3 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-14">
          <p className="text-accent-terracotta text-xs font-semibold tracking-[3px] uppercase mb-4 font-mono">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight max-w-xl">
            Let's build something great together
          </h2>
          <div className="w-12 h-1 bg-accent-terracotta rounded-full mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Contact Information */}
          <div>
            <motion.p {...fadeUp(0.1)} className="text-text-secondary text-sm sm:text-base leading-relaxed mb-10 max-w-md">
              I am actively open to full-time roles, projects, and collaboration opportunities. Whether you have a specific role in mind, need a developer, or just want to say hi — feel free to drop a message.
            </motion.p>

            <div className="flex flex-col gap-4">
              {LINKS.map(({ icon: Icon, label, value, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  {...fadeUp(0.15 + i * 0.07)}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-bg-secondary border border-border-subtle hover:border-accent-terracotta/25 hover:bg-accent-terracotta/[0.01] transition-all duration-300 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-terracotta/10 border border-accent-terracotta/20 group-hover:border-accent-terracotta/30 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                    <Icon size={18} className="text-accent-terracotta" />
                  </div>
                  <div>
                    <p className="text-text-tertiary text-[10px] font-mono uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-text-secondary text-xs sm:text-sm group-hover:text-text-primary transition-colors duration-200">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side: Message Form */}
          <motion.form
            {...fadeUp(0.2)}
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-bg-secondary border border-border-subtle flex flex-col gap-5 shadow-sm"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-text-secondary text-xs font-mono mb-2" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-bg-primary border border-border-subtle hover:border-accent-terracotta/20 focus:border-accent-terracotta focus:outline-none focus:ring-1 focus:ring-accent-terracotta/25 rounded-xl text-text-primary placeholder-text-tertiary text-sm transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-xs font-mono mb-2" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-bg-primary border border-border-subtle hover:border-accent-terracotta/20 focus:border-accent-terracotta focus:outline-none focus:ring-1 focus:ring-accent-terracotta/25 rounded-xl text-text-primary placeholder-text-tertiary text-sm transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-text-secondary text-xs font-mono mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                className="w-full px-4 py-3 bg-bg-primary border border-border-subtle hover:border-accent-terracotta/20 focus:border-accent-terracotta focus:outline-none focus:ring-1 focus:ring-accent-terracotta/25 rounded-xl text-text-primary placeholder-text-tertiary text-sm transition-all duration-200 resize-none"
              />
            </div>

            {/* Notification messages */}
            {state === 'success' && (
              <div className="flex items-center gap-2 text-accent-sage text-sm font-medium">
                <CheckCircle size={16} />
                Message sent! I'll get back to you shortly.
              </div>
            )}
            {state === 'error' && (
              <div className="flex items-center gap-2 text-accent-terracotta text-sm font-medium">
                <AlertCircle size={16} />
                Something went wrong. Please try emailing directly.
              </div>
            )}

            <button
              type="submit"
              disabled={state === 'sending'}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-accent-terracotta hover:bg-accent-terracotta/90 disabled:bg-accent-terracotta/60 text-bg-primary font-semibold text-sm rounded-xl transition-all duration-300 shadow-md shadow-accent-terracotta/10 hover:shadow-lg cursor-pointer"
            >
              {state === 'sending' ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-bg-primary/30 border-t-bg-primary rounded-full"
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
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}