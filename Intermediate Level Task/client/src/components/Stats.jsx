const STATS = [
  { icon: '🏆', title: 'Trophies', value: '5 IPL + 2 CLT20', detail: 'Most successful IPL franchise', highlight: true, imageUrl: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=200&h=200&fit=crop' },
  { icon: '', title: 'Top Run Scorer', value: 'Rohit Sharma', detail: '5,100+ runs for MI' },
  { icon: '', title: 'Highest Wicket Taker', value: 'Lasith Malinga', detail: '170 wickets for MI' },
  { icon: '', title: 'Best Season', value: '2020', detail: 'Champions in UAE' }
];

export default function Stats() {
  return (
    <section id="stats" className="section stats">
      <div className="container">
        <h2 className="section-title">Team <span className="accent">Stats</span></h2>
        <p className="section-subtitle">Records that define greatness</p>

        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div key={i} className={`stat-card ${stat.highlight ? 'highlight' : ''}`}>
              {stat.imageUrl && (
                <div className="stat-img">
                  <img src={stat.imageUrl} alt="" loading="lazy" />
                </div>
              )}
              {stat.icon && !stat.imageUrl && <div className="stat-icon">{stat.icon}</div>}
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-detail">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
