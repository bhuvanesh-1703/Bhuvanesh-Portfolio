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
  roles: [
    "MERN Stack Developer",
    "Full-Stack Web Developer",
    "React.js Developer",
    "Node.js Developer",
  ],
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

// ABOUT

export const ABOUT = {
  intro:
    "I'm a MERN Stack Developer dedicated to building high-performance web applications that combine clean design, seamless user experiences, and scalable backend architecture. I enjoy solving real-world problems through modern web technologies.",

  paragraphs: [
    "With a strong foundation in full-stack development, I work extensively with React.js, Node.js, Express.js, MongoDB, and MySQL to create reliable and maintainable applications. My focus is on writing clean code, optimizing performance, and delivering intuitive user experiences.",

    "I have built and deployed several full-stack applications, including marketplace platforms, e-commerce solutions, and real-time communication systems. These projects strengthened my expertise in API development, authentication, database design, and cloud deployment.",
  ],
  stats: [
    { value: "8+", label: "Projects Built" },
    { value: "5+", label: "Live Deployments" },
    { value: "1+", label: "Years Learning" },
  ],
};

// PROJECTS

export const PROJECTS = [
  {
    id: 1,
    title: "FarmAura",
    summary: "Farmer-to-customer multi-vendor marketplace.",
    description:
      "A full-stack agricultural marketplace that connects farmers directly with consumers, reducing intermediary costs and enabling fair pricing. The platform supports secure authentication, product management, order tracking, and role-based dashboards for both farmers and customers.",
    features: [
      "Role-based authentication for Admin,Vendor and Customer",
      "Product listing, inventory management, and Add to Cart",
      "Email notifications for order confirmations using Nodemailer",
      "Responsive user experience optimized for desktop and mobile devices",
    ],
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MySQL",
      "Bootstrap",
      "Vercel",
      "Render",
    ],
    github: "https://github.com/bhuvanesh-1703",
    demo: "https://final-former-websites.vercel.app/",
    color: "#e07a5f",
    featured: true,
  },
  {
    id: 2,
    title: "Real-Time Chat Platform",
    summary: "Instant messaging application powered by WebSockets.",
    description:
      "A real-time communication platform built using Socket.IO that enables seamless messaging between users. The application provides secure authentication, online status tracking, and persistent message storage for a modern chat experience.",
    features: [
      "Instant message delivery with Socket.IO",
      "JWT-based secure authentication and authorization",
      "Online/offline presence tracking",
      "Persistent chat history using MongoDB",
    ],
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "Socket.io",
      "MongoDB",
      "Vercel",
      "Render",
    ],
    github: "https://github.com/bhuvanesh-1703",
    demo: "https://real-time-chat-front-end-two.vercel.app/",
    color: "#e07a5f",
    featured: true,
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    summary: "Complete MERN-based online shopping solution.",
    description:
      "A scalable e-commerce application featuring product management, shopping cart functionality, secure authentication, and role-based administration. Designed to deliver a seamless shopping experience with modern UI and efficient backend architecture.",
    features: [
      "Product catalog with advanced filtering",
      "Shopping cart and order management workflow",
      "Admin dashboard for product and user management",
      "JWT authentication with protected routes",
    ],
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Vercel",
      "Render",
    ],
    github: "https://github.com/bhuvanesh-1703",
    demo: "https://ecommerce-mini-project-nine.vercel.app/",
    color: "#d4a373",
    featured: false,
  },
  {
    id: 4,
    title: "SaaS Template Store",
    summary: "Marketplace for premium SaaS website templates.",
    description:
      "A modern digital marketplace where users can browse, preview, and purchase professionally designed SaaS website templates. The platform focuses on delivering high-quality UI templates with secure user access and streamlined management features.",
    features: [
      "Template browsing with category-based filtering",
      "Live preview and detailed template showcase",
      "User authentication and account management",
      "Add to Favorite and Remove to Favorite",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/bhuvanesh-1703/fullstack-intern-task.git",
    demo: "https://fullstack-intern-task-mu.vercel.app/",
    color: "#d4a373",
    featured: false,
  },
];

//SKILLS

export const SKILLS = [
  {
    category: "Frontend Tools",
    icon: "⬡",
    items: [
      "React",
      "JavaScript (ES6+)",
      "Tailwind CSS v4",
      "Bootsrap 5",
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
    items: ["MongoDB", "MySQL", "Render / Vercel Deploy"],
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
  {
    category: "AI-Assisted Development",
    icon: "⬡",
    items: ["ChatGPT", "GitHub Copilot", "Cursor AI", "Claude AI", "DeepSeek"],
  },
];


// Journey
export const JOURNEY = [
  {
    period: "2020 - 2023",
    title: "Bachelor of Science in Computer Science",
    institution: "S.M.S College Of Arts And Science, Sivakasi",
    description:
      "Built a strong foundation in programming, data structures, database management systems, computer networks, and software development fundamentals through academic coursework and practical assignments.",
  },
  {
    period: "2023 - 2025",
    title: "Master of Science in Computer Science",
    institution: "S.M.S College Of Arts And Science, Sivakasi",
    description:
      "Specialized in advanced software development concepts, web technologies, database design, and full-stack application development while working on real-world projects and modern development practices.",
  },
  {
    period: "2025",
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

//Contact

export const CONTACT = {
  email: "bhuvaneshmahi2003@gmail.com",
  github: "https://github.com/bhuvanesh-1703",
  linkedin: "https://linkedin.com/in/bhuvanesh-raja",
};
