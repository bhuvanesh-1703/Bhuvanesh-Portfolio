import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { HoveredSkillProvider } from "./components/SkillContext";


export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary antialiased overflow-x-hidden">
      {/* Skip to content — visible only on keyboard focus */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#e07a5f] focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <HoveredSkillProvider>
          <Projects />
          <Skills />
        </HoveredSkillProvider>
        <Journey />
        <Contact />
      </main>
      <Footer />

    </div>
  );
}
