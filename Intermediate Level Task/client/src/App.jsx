import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Achievements from './components/Achievements';
import Squad from './components/Squad';
import Schedule from './components/Schedule';
import Stats from './components/Stats';
import News from './components/News';
import FanZone from './components/FanZone';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById('navbar');
      if (window.scrollY > 100) nav?.classList.add('scrolled');
      else nav?.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Achievements />
        <Squad />
        <Schedule />
        <Stats />
        <News />
        <FanZone />
      </main>
      <Footer />
    </>
  );
}

export default App;
