
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  greeting: "Hello, I'm",
  name: "Bhuvanesh",
  roles: ["Full-Stack Engineer", "MERN Developer", "UI/UX Enthusiast"],
  tagline:
    "I build production-grade web applications — from real-time systems to multi-vendor platforms — with clean architecture and seamless user experiences.",
  cta: { label: "View My Work", href: "#projects" },
  resume: { label: "Download Resume", href: "/resume.pdf" },
  social: {
    github: "https://github.com/bhuvanesh",
    linkedin: "https://linkedin.com/in/bhuvanesh",
    email: "mailto:bhuvanesh@email.com",
  },
};

export const ABOUT = {
  intro:
    "A full-stack developer based in Tamil Nadu, India, with a deep focus on the MERN stack. I specialize in building scalable, real-world applications that solve genuine problems.",
  paragraphs: [
    "I approach every project with an engineering mindset — thinking through architecture, performance, and developer experience before writing the first line of code.",
    "When I'm not building web apps, I'm exploring system design, contributing to open-source, or sharpening my problem-solving skills through competitive programming.",
  ],
  stats: [
    { value: "10+", label: "Projects Shipped" },
    { value: "1.5+", label: "Years Experience" },
    { value: "5+", label: "Happy Clients" },
  ],
};

export const PROJECTS = [
  {
    title: "FarmAura",
    summary: "Scalable farmer-to-customer multi-vendor marketplace.",
    description:
      "Scalable farmer-to-customer multi-vendor marketplace with authentication, order management, and location-based architecture.",
    features: [
      "Multi-role dashboards: customized farmer and customer panels",
      "Location-based discovery to find nearby fresh produce options",
      "Automated transactional SMTP email notifications via Nodemailer",
      "Direct peer-to-peer farmer to customer commerce routing",
    ],
    tech: ["React", "Node.js", "Express.js", "MySQL", "Tailwind CSS"],
    metrics: {
      architecture: "Multi-vendor",
      auth: "Secure",
      notifications: "Automated",
    },
    github: "https://github.com/bhuvanesh-1703",
    live: "https://final-former-websites.vercel.app",
    color: "#10b981",
  },
  {
    title: "Real-Time Chat App",
    summary: "Low-latency WebSocket-powered messaging platform.",
    description:
      "Low-latency WebSocket-powered messaging platform built using MERN + Socket.IO.",
    features: [
      "Instant message exchange using custom Socket.IO listeners",
      "Real-time online/offline presence tracking",
      "Secure stateless authentication via JSON Web Tokens",
      "Dynamic chat interface with sound indicators and message history",
    ],
    tech: ["React", "Node.js", "Express.js", "Socket.IO", "MongoDB"],
    metrics: {
      latency: "<100ms",
      sockets: "Bidirectional",
      state: "Persistent",
    },
    github: "https://github.com/bhuvanesh-1703",
    live: "https://real-time-chat-front-end-two.vercel.app/",

    color: "#10b981",
  },
  {
    title: "Portfolio Website",
    summary: "Luxury Antigravity-inspired portfolio website.",
    description:
      "Luxury Antigravity-inspired portfolio built using React, Tailwind, and Framer Motion.",
    features: [
      "Fluid mouse-based card tilt physics and micro-animations",
      "Interactive retro-futuristic developer terminal interface",
      "Curated dark matte color palette with soft metallic gold glow",
      "Fully accessible semantic markup with responsive layouts",
    ],
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    metrics: {
      animations: "Apple-like",
      performance: "99+",
      design: "2026 Level",
    },
    github: "https://github.com/bhuvanesh-1703",
    live: "https://github.com/bhuvanesh-1703",
    color: "#f59e0b",
  },
  {
    id: 4,
    featured: false,
    title: "Developer Blog CMS",
    description:
      "A headless CMS with markdown support, syntax highlighting, SEO optimization, and a custom admin panel for publishing technical content.",
    tech: ["Next.js", "MongoDB", "Cloudinary", "MDX", "Tailwind"],
    github: "https://github.com/bhuvanesh/dev-blog",
    demo: "https://devblog.vercel.app",
    color: "#ec4899",
  },
];

export const SKILLS = [
  {
    category: "Frontend",
    icon: "⬡",
    items: [
      { name: "React", level: 90 },
      { name: "JavaScript (ES2024)", level: 88 },
      { name: "TypeScript", level: 75 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    category: "Backend",
    icon: "⬡",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "Socket.io", level: 80 },
      { name: "JWT & Auth", level: 85 },
    ],
  },
  {
    category: "Database & Cloud",
    icon: "⬡",
    items: [
      { name: "MongoDB", level: 88 },
      { name: "PostgreSQL", level: 72 },
      { name: "Redis", level: 70 },
      { name: "AWS S3", level: 75 },
      { name: "Docker", level: 68 },
    ],
  },
  {
    category: "Tools & Workflow",
    icon: "⬡",
    items: [
      { name: "Git & GitHub", level: 92 },
      { name: "Vite / Webpack", level: 80 },
      { name: "Figma", level: 70 },
      { name: "Postman", level: 88 },
      { name: "Linux / Bash", level: 72 },
    ],
  },
];
 contact: {
    email: "bhuvaneshmahi2003@gmail.com",
    github: "https://github.com/bhuvanesh-1703",
    linkedin: "https://linkedin.com/in/bhuvanesh-raja",
  },