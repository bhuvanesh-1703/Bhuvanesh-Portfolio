export const portfolioData = {
  hero: {
    greeting: "👋 Hello, I'm",
    name: "Bhuvanesh",
    role: "MERN Stack Developer",
    tagline: "I build modern full stack web applications.",
    resumePath: "/resume.pdf",
  },

  //About
  about: {
    stats: [
      { label: "Projects Built", number: "5+" },
      { label: "Technologies", number: "4+" },
      { label: "Passion", number: "100%" },
    ],
  },

  //Education
  education: [
    {
      degree: "B.Sc. Computer Science",
      college: "S.M.S. College of Arts and Science",
      period: "GRADUATED 2023",
      icon: "bi-mortarboard-fill",
      type: "graduation",
    },
    {
      degree: "M.Sc. Computer Science",
      college: "S.M.S. College of Arts and Science",
      period: "GRADUATED 2025",
      icon: "bi-mortarboard-fill",
      type: "graduation",
    },
    {
      degree: "MERN Stack Certification",
      college: "Full-Stack Web Development — MongoDB, Express, React, Node.js",
      period: "CERTIFIED",
      icon: "bi-file-earmark-text-fill",
      type: "certification",
    },
  ],

  //Skills
  skills: [
    {
      title: "Frontend",
      icon: "bi-window-stack",
      items: [
        { name: "HTML", icon: "bi-filetype-html" },
        { name: "CSS", icon: "bi-filetype-css" },
        { name: "JavaScript", icon: "bi-filetype-js" },
        { name: "React", icon: "bi-filetype-jsx" },
        { name: "Bootstrap", icon: "bi-bootstrap" },
      ],
    },
    {
      title: "Backend",
      icon: "bi-hdd-rack",
      items: [
        { name: "Node.js", icon: "bi-node-plus" },
        { name: "Express.js", icon: "bi-server" },
      ],
    },
    {
      title: "Database",
      icon: "bi-database",
      items: [
        { name: "MongoDB", icon: "bi-database-fill" },
        { name: "SQL", icon: "bi-table" },
      ],
    },
    {
      title: "Tools",
      icon: "bi-tools",
      items: [
        { name: "Git", icon: "bi-git" },
        { name: "Postman", icon: "bi-send" },
      ],
    },
  ],

  //Projects

  projects: [
    {
      title: "Real-Time Chat Application",
      icon: "bi-chat-dots",
      desc: "A full-stack real-time messaging application that enables users to communicate instantly through a modern chat interface using WebSocket technology.",
      features: [
        "Real-time messaging implemented using Socket.io",
        "Secure user authentication and login system",
        "Instant message delivery without page refresh",
        "Online user status tracking",
      ],
      tech: ["React", "Node.js", "Express.js", "Socket.io", "MongoDB"],
      github: "#",
      live: "https://real-time-chat-front-end-two.vercel.app/",
    },
    {
      title: "Farmer Multi-Vendor Platform",
      icon: "bi-shop",
      desc: "A platform connecting farmers directly with customers, enabling location-based product discovery and eliminating middlemen from the supply chain.",
      features: [
        "Farmers can add & manage products",
        "Customers view nearby products",
        "Direct farmer-to-customer supply",
        "When a user registers or places an order, an email notification will be sent to the user using Nodemailer.",
      ],
      tech: ["React", "Node.js", "Express", "SQL"],
      github: "#",
      live: "https://final-former-websites.vercel.app",
    },
    {
      title: "E-Commerce Web Application",
      icon: "bi-cart4",
      desc: "A full-featured online shopping platform with complete user authentication, product catalog, shopping cart, and order management system.",
      features: [
        "Product listing & search",
        "Add to cart & checkout",
        "User authentication & authorization",
        "Order management dashboard",
      ],
      tech: ["React", "Node.js", "Express", "MongoDB"],
      github: "#",
      live: "https://ecommerce-mini-project-nine.vercel.app/",
    },
  ],

  //Contact
  contact: {
    email: "bhuvaneshmahi2003@gmail.com",
    github: "https://github.com/bhuvanesh-1703",
    linkedin: "https://linkedin.com/in/bhuvanesh-raja",
  },
};
