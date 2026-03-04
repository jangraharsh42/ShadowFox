const ACHIEVEMENTS = [
  { number: '5', label: 'IPL Titles', icon: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=120&h=120&fit=crop' },
  { number: '2', label: 'CLT20 Titles', icon: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=120&h=120&fit=crop' },
  { number: '150+', label: 'Matches Won', icon: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=120&h=120&fit=crop' },
  { number: '2008', label: 'Founded', icon: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=120&h=120&fit=crop' }
];

export default function Achievements() {
  return (
    <section className="achievements-strip">
      <div className="container">
        <div className="achievements-grid">
          {ACHIEVEMENTS.map(({ number, label, icon }) => (
            <div key={label} className="achieve-card">
              {icon && (
                <div className="achieve-icon">
                  <img src={icon} alt="" loading="lazy" />
                </div>
              )}
              <span className="achieve-number">{number}</span>
              <span className="achieve-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
