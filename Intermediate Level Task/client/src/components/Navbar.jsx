import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#squad', label: 'Squad' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#stats', label: 'Stats' },
  { href: '#news', label: 'News' },
  { href: '#fanzone', label: 'Fan Zone' }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className="navbar" id="navbar">
      <a href="#home" className="nav-brand" onClick={(e) => scrollTo(e, '#home')}>
        <span className="brand-text">MI</span>
        <span className="brand-sub">Mumbai Indians</span>
      </a>
      <button
        className={`nav-toggle ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
      <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a href={href} className="nav-link" onClick={(e) => scrollTo(e, href)}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="theme-icon sun">☀️</span>
            <span className="theme-icon moon">🌙</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
