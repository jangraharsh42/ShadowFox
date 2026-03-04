const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#squad', label: 'Squad' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#stats', label: 'Stats' },
  { href: '#news', label: 'News' },
  { href: '#fanzone', label: 'Fan Zone' }
];

export default function Footer() {
  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-text">MI</span>
            <p>Mumbai Indians Fan Hub</p>
            <p className="footer-note">Unofficial fan website. All rights belong to Mumbai Indians.</p>
          </div>
          <div className="footer-links">
            {LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={(e) => scrollTo(e, href)}>
                {label}
              </a>
            ))}
          </div>
        </div>
        <p className="footer-copy">© 2025 Mumbai Indians Fan Hub • Built with 💙 for MI fans</p>
      </div>
    </footer>
  );
}
