import { useState, useEffect } from 'react';
import { fetchNews } from '../api';

const GRADIENTS = [
  'linear-gradient(135deg, var(--mi-blue) 0%, var(--mi-gold) 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, var(--mi-blue) 100%)',
  'linear-gradient(135deg, var(--mi-gold) 0%, #ff6b35 100%)'
];

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then(setNews)
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="news" className="section news">
      <div className="container">
        <h2 className="section-title">News & <span className="accent">Updates</span></h2>
        <p className="section-subtitle">Latest from the MI camp</p>

        <div className="news-grid">
          {loading ? (
            <p className="loading-text">Loading news...</p>
          ) : (
            news.map((item, i) => (
              <article key={item.id} className="news-card">
                <div className="news-img" style={{ background: GRADIENTS[i % GRADIENTS.length] }}>
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt="" loading="lazy" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                  )}
                </div>
                <div className="news-body">
                  <span className="news-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <a href="#" className="news-link">Read more →</a>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
