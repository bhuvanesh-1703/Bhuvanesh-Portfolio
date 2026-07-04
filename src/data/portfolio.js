import farmauraImg from "../assets/farmaura.png";
import chatPlatformImg from "../assets/chat_platform.png";
import ecommerceImg from "../assets/ecommerce.png";
import templateStoreImg from "../assets/template_store.png";
import aiServiceImg from "../assets/Ai.png";

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
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

// ABOUT

export const ABOUT = {
  intro:
    "I'm a Full Stack Engineer dedicated to crafting authentic digital experiences that connect. From eye-catching frontend interfaces to robust backend architectures, I bring technical visions to life with code that inspires and scales.",
  paragraphs: [
    "Specializing in the MERN stack, I weave intricate databases and seamless React interfaces into cohesive applications. I thrive in evolving environments, quickly adapting to new trends and frameworks to stay at the cutting edge of web development.",
    "Let's create something unforgettable together.",
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
    title: "AI Service",
    summary: "AI-powered customer support platform and Management System",
    description:
      "A full-stack AI-powered SaaS application that enables businesses to provide instant customer support through an intelligent chatbot. Users can manage conversations, monitor analytics, customize chatbot behavior, and securely access role-based dashboards. The platform integrates modern AI APIs to deliver contextual and real-time responses.",

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
    featured: true,
  },
  {
    id: 2,
    title: "FarmAura",
    summary: "Farmer-to-customer multi-vendor marketplace.",
    description:
      "Developed a full-stack MERN e-commerce marketplace with three role-based portals (User, Vendor, Admin), featuring a secure vendor approval workflow and admin dashboard for product moderation and order tracking.",
    image: farmauraImg,
    features: [
      "Role-based authentication for Admin,Vendor and Customer",
      "Product listing, inventory management, and Add to Cart",
      "Email notifications for order confirmations using Nodemailer",
      "Responsive user experience optimized for desktop and mobile devices",
    ],
    tech: [
      "React.js",
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
    featured: true,
  },
  {
    id: 3,
    title: "Real-Time Chat Platform",
    summary: "Instant messaging application powered by WebSockets.",
    description:
      "A real-time communication platform built using Socket.IO that enables seamless messaging between users. The application provides secure authentication, online status tracking, and persistent message storage for a modern chat experience.",
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
    featured: true,
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    summary: "Complete MERN-based online shopping solution.",
    description:
      "A scalable e-commerce application featuring product management, shopping cart functionality, secure authentication, and role-based administration. Designed to deliver a seamless shopping experience with modern UI and efficient backend architecture.",
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
    featured: false,
  },
  {
    id: 5,
    title: "SaaS Template Store",
    summary: "Marketplace for premium SaaS website templates.",
    description:
      "A modern digital marketplace where users can browse, preview, and purchase professionally designed SaaS website templates. The platform focuses on delivering high-quality UI templates with secure user access and streamlined management features.",
    image: templateStoreImg,
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
