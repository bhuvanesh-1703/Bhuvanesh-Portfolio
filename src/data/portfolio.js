export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  greeting: "Hello, I'm",
  name: "Bhuvanesh",
  roles: ["MERN Stack Developer", "Frontend Engineer", "Passionate Builder"],
  tagline:
    "I build clean, responsive, and user-friendly web applications using React, Node.js, and modern UI/UX practices. Focused on writing readable code and solving problems.",
  cta: { label: "View Projects", href: "#projects" },
  resume: { label: "Get Resume", href: "/resume.pdf" },
  social: {
    github: "https://github.com/bhuvanesh-1703",
    linkedin: "https://linkedin.com/in/bhuvanesh-raja",
    email: "mailto:bhuvaneshmahi2003@gmail.com",
  },
};

export const ABOUT = {
  intro:
    "I am a self-driven full-stack developer based in Tamil Nadu, India, with a strong focus on the MERN stack. I enjoy turning complex problems into elegant, readable web applications.",
  paragraphs: [
    "My learning path is fueled by curiosity and hands-on build experience. I focus on understanding how databases communicate with APIs and how to translate design concepts into pixel-perfect, accessible frontends.",
    "Rather than just learning syntax, I focus on project-based learning — building applications with real-world requirements like authentication, state management, and responsive structures.",
  ],
  stats: [
    { value: "8+", label: "Projects Built" },
    { value: "500+", label: "GitHub Commits" },
    { value: "100%", label: "Self-Driven Study" },
  ],
};

export const PROJECTS = [
  {
    id: 1,
    title: "FarmAura",
    summary: "Farmer-to-customer multi-vendor marketplace.",
    description:
      "A multi-vendor e-commerce platform that connects local farmers directly with customers, eliminating broker fees. Features secure role-based registration, dashboard insights, and location-based discovery.",
    features: [
      "Separate tailored dashboards for farmers (listings) and buyers",
      "Dynamic location checks to discover nearby produce",
      "Automated SMTP notifications for order confirmations via Nodemailer",
      "Responsive design with smooth image loading and clean workflows",
    ],
    tech: ["React", "Node.js", "Express.js", "MySQL", "Tailwind CSS"],
    github: "https://github.com/bhuvanesh-1703",
    demo: "https://final-former-websites.vercel.app",
    color: "#81b29a", // Sage accent
    featured: true,
  },
  {
    id: 2,
    title: "Real-Time Chat Platform",
    summary: "Instant messaging app with WebSocket synchronization.",
    description:
      "A responsive chat application supporting live messages, online/offline presence tracking, sound indicators, and persistent chat histories.",
    features: [
      "Low-latency message routing via custom Socket.io listeners",
      "Stateless session authentication with JSON Web Tokens (JWT)",
      "Database schema designed for thread lookups and message logs",
      "Active status indicator and smooth visual state transitions",
    ],
    tech: ["React", "Node.js", "Express.js", "Socket.io", "MongoDB"],
    github: "https://github.com/bhuvanesh-1703",
    demo: "https://real-time-chat-front-end-two.vercel.app/",
    color: "#e07a5f", // Terracotta accent
    featured: true,
  },
  {
    id: 3,
    title: "Developer Blog CMS",
    summary: "Headless blog publisher with Markdown formatting.",
    description:
      "A personal CMS that parses MDX content, generates SEO metadata tags, supports code syntax highlighting, and provides a secure admin page for writing drafts.",
    features: [
      "Dynamic MDX parser for publishing responsive technical articles",
      "Optimized static asset delivery using Cloudinary API integration",
      "Automatic sitemap generation and schema tags for search engines",
      "Clean tag filtration and reading-time estimations",
    ],
    tech: ["Next.js", "MongoDB", "Cloudinary", "MDX", "Tailwind CSS"],
    github: "https://github.com/bhuvanesh-1703",
    demo: "https://github.com/bhuvanesh-1703",
    color: "#d4a373", // Warm Sand accent
    featured: false,
  },
];

export const SKILLS = [
  {
    category: "Frontend Tools",
    icon: "⬡",
    items: [
      "React",
      "JavaScript (ES6+)",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "HTML5 & CSS3",
    ],
  },
  {
    category: "Backend Engine",
    icon: "⬡",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Socket.io",
      "JWT & Auth",
      "Nodemailer",
    ],
  },
  {
    category: "Database & Cloud",
    icon: "⬡",
    items: [
      "MongoDB",
      "MySQL",
      "PostgreSQL",
      "Cloudinary",
      "Render / Vercel Deploy",
    ],
  },
  {
    category: "Developer Workflow",
    icon: "⬡",
    items: [
      "Git & GitHub",
      "Vite Config",
      "Postman API client",
      "npm / package locks",
    ],
  },
  {
    category: "Deployment Tools",
    icon: "⬡",
    items: ["Vercel", "Netlify", "Render", "Mongodb Atlas"],
  },
];

export const JOURNEY = [
  {
    period: "2022 - 2026",
    title: "Bachelor of Computer Science",
    institution: "S.M.S College Of Arts And Science,Sivakasi",
    description:
      "Acquired core academic foundations in computer science, including Data Structures, Database Management Systems (DBMS), and Software Engineering principles.",
  },
  {
    period: "2023 - 2025",
    title: "Master Degree in Computer Science",
    institution: "S.M.S College Of Arts And Science,Sivakasi",
    description:
      "Acquired core academic foundations in computer science, including Data Structures, Database Management Systems (DBMS), and Software Engineering principles.",
  },
  {
    period: "2036",
    title: "MERN Stack Deep Dive",
    institution: "Anjana Infotech, Rajapalayam",
    description:
      "Learned modern JavaScript building APIs. Mastered core concepts like async request routing, REST architectural patterns, stateless JWT sessions, and document schemas.",
  },
  {
    period: "2026",
    title: "Building & Launching Projects",
    institution: "Practical Code Implementations",
    description:
      "Designed, coded, and launched FarmAura and the Real-Time Chat Platform. Focused on handling real database integrations, deployment processes, and responsive styling challenges.",
  },
  {
    period: "2026 (Present)",
    title: "Modern Tooling & Quality Focus",
    institution: "Continuous Growth",
    description:
      "Currently learning TypeScript typing patterns, testing tools, and improving codebase structure for cleaner, recruiter-friendly readability.",
  },
];

export const CONTACT = {
  email: "bhuvaneshmahi2003@gmail.com",
  github: "https://github.com/bhuvanesh-1703",
  linkedin: "https://linkedin.com/in/bhuvanesh-raja",
};
