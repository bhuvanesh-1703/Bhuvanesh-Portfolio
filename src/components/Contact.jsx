import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { CONTACT } from '../data/portfolio';
import { Github, Linkedin, Mail, Phone } from './Icons';
import { SectionWrapper, SectionHeader, animationConfig } from './DesignSystem';

const LINKS = [
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Phone, label: 'Phone', value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
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
    <SectionWrapper id="contact">
      <SectionHeader title="Let's Talk" subtitle="Contact" />

      <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start relative z-10 mt-12">
        {/* Left Side: Contact Information */}
        <div>
          <motion.p
            variants={animationConfig.fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-text-secondary text-lg sm:text-xl leading-relaxed mb-16 max-w-md font-light"
          >
            I am actively open to full-time roles, projects, and collaboration opportunities. Whether you have a specific role in mind, need a developer, or just want to say hi — feel free to drop a message.
          </motion.p>

          <div className="flex flex-col gap-6">
            {LINKS.map(({ icon: Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                variants={animationConfig.fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group flex items-center gap-6 p-6 rounded-none border border-border-subtle hover:border-text-primary bg-transparent transition-all duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={24} className="text-text-primary" />
                </div>
                <div>
                  <p className="text-text-tertiary text-xs font-mono uppercase tracking-[0.2em] mb-1">{label}</p>
                  <p className="text-text-primary text-sm font-medium">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Side: Message Form */}
        <motion.form
          variants={animationConfig.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="p-8 sm:p-12 border border-border-subtle bg-bg-secondary flex flex-col gap-8 shadow-2xl shadow-black/5"
        >
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-text-secondary text-xs font-mono uppercase tracking-widest mb-3" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-0 py-3 bg-transparent border-b border-border-subtle focus:border-text-primary focus:outline-none text-text-primary placeholder-text-tertiary text-base transition-colors duration-300 rounded-none"
              />
            </div>
            <div>
              <label className="block text-text-secondary text-xs font-mono uppercase tracking-widest mb-3" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-0 py-3 bg-transparent border-b border-border-subtle focus:border-text-primary focus:outline-none text-text-primary placeholder-text-tertiary text-base transition-colors duration-300 rounded-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-secondary text-xs font-mono uppercase tracking-widest mb-3" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className="w-full px-0 py-3 bg-transparent border-b border-border-subtle focus:border-text-primary focus:outline-none text-text-primary placeholder-text-tertiary text-base transition-colors duration-300 resize-none rounded-none"
            />
          </div>

          {/* Notification messages */}
          {state === 'success' && (
            <div className="flex items-center gap-3 text-text-primary text-sm font-mono tracking-widest">
              <CheckCircle size={18} />
              Message sent successfully.
            </div>
          )}
          {state === 'error' && (
            <div className="flex items-center gap-3 text-text-primary text-sm font-mono tracking-widest">
              <AlertCircle size={18} />
              Error sending message.
            </div>
          )}

          <button
            type="submit"
            disabled={state === 'sending'}
            className="group relative overflow-hidden rounded-none border border-text-primary px-8 py-4 mt-4 text-sm font-medium tracking-[0.2em] text-text-primary uppercase transition-colors duration-300 hover:text-bg-primary disabled:opacity-50"
          >
            <div className="absolute inset-0 -translate-y-full bg-text-primary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              {state === 'sending' ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-text-primary/30 border-t-text-primary rounded-full group-hover:border-bg-primary/30 group-hover:border-t-bg-primary"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </span>
          </button>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
