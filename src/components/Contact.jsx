import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const LINKS = [
  { icon: Mail, label: 'Email', value: 'bhuvanesh@email.com', href: 'mailto:bhuvanesh@email.com' },
  { icon: Github, label: 'GitHub', value: 'github.com/bhuvanesh', href: 'https://github.com/bhuvanesh' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/bhuvanesh', href: 'https://linkedin.com/in/bhuvanesh' },
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
    <section id="contact" className="py-28 relative bg-[#080810]">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-600/7 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <p className="text-violet-400 text-sm font-medium tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight max-w-xl">
            Let's build something great together
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div>
            <motion.p {...fadeUp(0.1)} className="text-white/50 text-base leading-relaxed mb-10">
              I'm actively open to full-time roles, freelance projects, and technical collaborations. Whether you have a project in mind or just want to connect — I'd love to hear from you.
            </motion.p>

            <div className="flex flex-col gap-4">
              {LINKS.map(({ icon: Icon, label, value, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  {...fadeUp(0.15 + i * 0.07)}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white/35 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-white/80 text-sm group-hover:text-white transition-colors">{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <motion.form
            {...fadeUp(0.2)}
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/50 text-sm mb-2" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-white/50 text-sm mb-2" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/50 text-sm mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white placeholder-white/25 text-sm focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200 resize-none"
              />
            </div>

            {/* Status message */}
            {state === 'success' && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <CheckCircle size={16} />
                Message sent! I'll get back to you soon.
              </div>
            )}
            {state === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                Something went wrong. Please try emailing directly.
              </div>
            )}

            <button
              type="submit"
              disabled={state === 'sending'}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20 hover:shadow-violet-500/25"
            >
              {state === 'sending' ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
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
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}