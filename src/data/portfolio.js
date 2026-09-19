import farmauraImg from "../assets/farmaura.webp";
import chatPlatformImg from "../assets/chat_platform.webp";
import ecommerceImg from "../assets/ecommerce.webp";
import templateStoreImg from "../assets/template_store.webp";
import aiServiceImg from "../assets/Ai.webp";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  greeting: "Creative",
  name: "MERN STACK",
  roles: [
    "Full Stack Engineer",
    "MERN Developer",
    "AI Enthusiast",
    "Problem Solver",
  ],
  tagline:
    "Building high-performance digital experiences and scalable web architectures with a modern, editorial approach to code.",
  cta: { label: "Work With Me", href: "#contact" },
  resume: { label: "View Resume", href: "/resume.pdf" },
  social: {
    github: "https://github.com/bhuvanesh-1703",
    linkedin: "https://linkedin.com/in/bhuvanesh-raja",
    email: "mailto:bhuvaneshmahi2003@gmail.com",
  },
};

export const ABOUT = {
  intro:
    "I'm a Full Stack Engineer who ships. In the last year I've taken 5 MERN apps from empty repo to live production — including an AI support platform that cut response times by 80% and a real-time chat app holding sub-50ms latency at 100 concurrent connections. I care as much about the Lighthouse score as the pixel.",
  paragraphs: [
    "Specializing in React, Node.js, MongoDB, and Tailwind CSS, I architect seamless interfaces and resilient microservices. I focus on clean state management, modular component design, and optimized database queries for production-grade reliability.",
    "Engineered for performance. Built for scale.",
  ],
  stats: [
    { value: "8+", label: "Projects Built" },
    { value: "5+", label: "Live Deployments" },
  ],
};


// PROJECTS

export const PROJECTS = [
  {
    id: 1,
    title: "AI Service",
    summary: "AI-powered customer support platform and Management System",
    description:
      "A full-stack AI-powered SaaS application that enables businesses to provide instant customer support through an intelligent chatbot. Users can manage conversations, monitor analytics, customize chatbot behavior, and securely access role-based dashboards. The platform integrates modern AI APIs to deliver contextual and real-time responses.",
    impact:
      "Reduced customer support response time by 80% and automated over 500+ standard inquiries during beta testing.",
    image: aiServiceImg,

    features: [
      "JWT-based authentication with secure user accounts",
      "AI-powered chatbot using Gemini/OpenAI API",
      "Conversation history and chat management",
      "Dashboard with chatbot usage analytics",
      "Responsive UI optimized for desktop and mobile",
      "Cloudinary integration for file/image uploads",
    ],

    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Gemini API",
      "Cloudinary",
      "JWT",
      "Vercel",
      "Render",
    ],
    github: "https://github.com/bhuvanesh-1703/Ac-Service-Website",
    liveUrl: "https://serviceai-website-zeta.vercel.app/",

    color: "#4f46e5",
    year: "2026",
    featured: true,
  },
  {
    id: 2,
    title: "FarmAura",
    summary: "Farmer-to-customer multi-vendor marketplace.",
    description:
      "Developed a full-stack MERN e-commerce marketplace with three role-based portals (User, Vendor, Admin), featuring a secure vendor approval workflow and admin dashboard for product moderation and order tracking.",
    impact:
      "Connected 50+ local farmers directly with consumers, processing $2k+ in mock agricultural transactions.",
    image: farmauraImg,
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
    frontendUrl: "https://github.com/bhuvanesh-1703/FrontEnd-former.git",
    backendUrl: "https://github.com/bhuvanesh-1703/backend-farmer.git",
    liveUrl: "https://final-former-websites.vercel.app/",
    color: "#e07a5f",
    year: "2026",
    featured: true,
  },
  {
    id: 3,
    title: "Real-Time Chat Platform",
    summary: "Instant messaging application powered by WebSockets.",
    description:
      "A real-time communication platform built using Socket.IO that enables seamless messaging between users. The application provides secure authentication, online status tracking, and persistent message storage for a modern chat experience.",
    impact:
      "Achieved sub-50ms message latency supporting up to 100 concurrent WebSocket connections.",
    image: chatPlatformImg,
    features: [
      "Instant message delivery with Socket.IO",
      "JWT-based secure authentication and authorization",
      "Online/offline presence tracking",
      "Persistent chat history using MongoDB",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Vercel", "Render"],
    frontendUrl:
      "https://github.com/bhuvanesh-1703/real-time-chat-Front-End.git",
    backendUrl: "https://github.com/bhuvanesh-1703/real-time-chat-backend.git",
    liveUrl: "https://real-time-chat-front-end-two.vercel.app/",
    color: "#e07a5f",
    year: "2026",
    featured: true,
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    summary: "Complete MERN-based online shopping solution.",
    description:
      "A scalable e-commerce application featuring product management, shopping cart functionality, secure authentication, and role-based administration. Designed to deliver a seamless shopping experience with modern UI and efficient backend architecture.",
    impact:
      "Optimized MongoDB aggregation pipelines to reduce product query times by 40%.",
    image: ecommerceImg,
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
    frontendUrl:
      "https://github.com/bhuvanesh-1703/ecommerce-mini-project-nine",
    backendUrl: "https://github.com/bhuvanesh-1703/Ecommerce-Backend",
    liveUrl: "https://ecommerce-mini-project-nine.vercel.app/",
    color: "#d4a373",
    year: "2026",
    featured: false,
  },
  {
    id: 5,
    title: "SaaS Template Store",
    summary: "Marketplace for premium SaaS website templates.",
    description:
      "A modern digital marketplace where users can browse, preview, and purchase professionally designed SaaS website templates. The platform focuses on delivering high-quality UI templates with secure user access and streamlined management features.",
    impact:
      "Built a fully responsive and accessible UI that scored 98+ on Lighthouse performance and accessibility audits.",
    image: templateStoreImg,
    features: [
      "Template browsing with category-based filtering",
      "Live preview and detailed template showcase",
      "User authentication and account management",
      "Add to Favorites / Remove from Favorites",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/bhuvanesh-1703/fullstack-intern-task.git",
    demo: "https://fullstack-intern-task-mu.vercel.app/",
    color: "#d4a373",
    year: "2025",
    featured: false,
  },
];

//SKILLS

export const SKILLS = [
  {
    category: "Frontend Tools",
    items: [
      { name: "React", level: "strong", tag: "daily driver", tier: "w-full" },
      { name: "JavaScript (ES6+)", level: "strong", tier: "w-full" },
      { name: "Tailwind CSS", level: "strong", tag: "shipped in prod", tier: "w-full" },
      { name: "Bootstrap 5", level: "comfortable", tier: "w-2/3" },
      { name: "HTML5 & CSS3", level: "strong", tier: "w-full" },
    ],
  },
  {
    category: "Backend Engine",
    items: [
      { name: "Node.js", level: "strong", tag: "daily driver", tier: "w-full" },
      { name: "Express.js", level: "strong", tier: "w-full" },
      { name: "REST APIs", level: "strong", tier: "w-full" },
      { name: "Socket.io", level: "comfortable", tag: "shipped in prod", tier: "w-2/3" },
      { name: "JWT & Auth", level: "comfortable", tier: "w-2/3" },
      { name: "Nodemailer", level: "comfortable", tier: "w-2/3" },
    ],
  },
  {
    category: "Database & Cloud",
    items: [
      { name: "MongoDB", level: "strong", tag: "daily driver", tier: "w-full" },
      { name: "MySQL", level: "comfortable", tier: "w-2/3" },
      { name: "Render / Vercel Deploy", level: "strong", tier: "w-full" },
      { name: "Docker", level: "learning", tag: "learning", tier: "w-1/3" },
    ],
  },
  {
    category: "Developer Workflow",
    items: [
      { name: "Git & GitHub", level: "strong", tag: "daily driver", tier: "w-full" },
      { name: "Vite Config", level: "comfortable", tier: "w-2/3" },
      { name: "Postman API client", level: "comfortable", tier: "w-2/3" },
      { name: "npm / package locks", level: "comfortable", tier: "w-2/3" },
    ],
  },
  {
    category: "Deployment Tools",
    items: [
      { name: "Vercel", level: "strong", tag: "production", tier: "w-full" },
      { name: "Netlify", level: "comfortable", tier: "w-2/3" },
      { name: "Render", level: "strong", tag: "cloud backend", tier: "w-full" },
      { name: "MongoDB Atlas", level: "comfortable", tier: "w-2/3" },
    ],
  },
  {
    category: "AI-Assisted Development",
    items: [
      { name: "ChatGPT", level: "comfortable", tier: "w-2/3" },
      { name: "Gemini", level: "comfortable", tag: "daily driver", tier: "w-2/3" },
      { name: "GitHub Copilot", level: "comfortable", tier: "w-2/3" },
      { name: "Cursor AI", level: "comfortable", tier: "w-2/3" },
      { name: "Claude AI", level: "comfortable", tier: "w-2/3" },
      { name: "DeepSeek", level: "learning", tag: "exploring", tier: "w-1/3" },
    ],
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
  phone: "9092743327",
  github: "https://github.com/bhuvanesh-1703",
  linkedin: "https://linkedin.com/in/bhuvanesh-raja",
};
