export default function Hero() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="section hero">
      <div className="hero-bg">
        <img
          src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1920&q=80"
          alt=""
          className="hero-bg-img"
          loading="eager"
        />
      </div>
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-accent">Mumbai</span> Indians
        </h1>
        <p className="hero-tagline">One Family • Five Champions</p>
        <p className="hero-desc">
          India's most successful IPL franchise. Celebrating cricket excellence since 2008.
        </p>
        <div className="hero-badges">
          <span className="badge">5× Champions</span>
          <span className="badge">2013 • 2015 • 2017 • 2019 • 2020</span>
        </div>
        <a href="#squad" className="btn btn-primary" onClick={(e) => scrollTo(e, '#squad')}>
          Meet the Squad
        </a>
      </div>
      <div className="scroll-indicator">
        <span />
      </div>
    </section>
  );
}
