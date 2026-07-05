import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { HoveredSkillProvider } from './components/SkillContext';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary antialiased overflow-x-hidden">
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
