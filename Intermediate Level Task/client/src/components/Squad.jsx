import { useState, useEffect } from 'react';
import { fetchPlayers } from '../api';

const ROLE_LABELS = {
  batsman: 'Batsman',
  bowler: 'Bowler',
  'all-rounder': 'All-Rounder',
  keeper: 'Wicket-Keeper'
};

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'batsman', label: 'Batsmen' },
  { value: 'bowler', label: 'Bowlers' },
  { value: 'all-rounder', label: 'All-Rounders' },
  { value: 'keeper', label: 'Wicket-Keepers' }
];

function PlayerCard({ player }) {
  const imageUrl = player.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&size=400&background=004BA0&color=FFD141`;
  const showDetails = player.nationality || player.matches;
  return (
    <article className="player-card" data-role={player.role}>
      <div className="player-img">
        <span className="player-img-fallback">{player.emoji}</span>
        <img src={imageUrl} alt={player.name} loading="lazy" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
      </div>
      <div className="player-body">
        <div className="player-header">
          <h3 className="player-name">{player.name}</h3>
          <span className="player-jersey">{player.jersey}</span>
        </div>
        <p className="player-role">{ROLE_LABELS[player.role]}</p>
        <p className="player-stats">{player.stats}</p>
        <p className="player-bio">{player.bio}</p>
        {showDetails && (
          <div className="player-details">
            {player.nationality && <span title="Nationality">🇺🇳 {player.nationality}</span>}
            {player.birthDate && <span title="Date of Birth">📅 {player.birthDate}</span>}
            {player.battingStyle && player.role !== 'bowler' && <span title="Batting">🏏 {player.battingStyle}</span>}
            {player.bowlingStyle && (player.role === 'bowler' || player.role === 'all-rounder') && <span title="Bowling">🎯 {player.bowlingStyle}</span>}
            {player.iplDebut && <span title="IPL Debut">⭐ {player.iplDebut}</span>}
            {player.matches != null && <span title="IPL Matches">🎮 {player.matches}</span>}
            {player.runs != null && player.runs > 0 && <span title="Runs">📊 {player.runs} runs</span>}
            {player.wickets != null && player.wickets > 0 && <span title="Wickets">🔄 {player.wickets} wkts</span>}
            {player.highestScore && player.highestScore !== '-' && <span title="Highest Score">🔥 {player.highestScore}</span>}
            {player.bestBowling && player.bestBowling !== '-' && (player.role === 'bowler' || player.role === 'all-rounder') && <span title="Best Bowling">⭐ {player.bestBowling}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Squad() {
  const [players, setPlayers] = useState([]);
  const [role, setRole] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPlayers(role)
      .then(data => { if (!cancelled) setPlayers(data); })
      .catch(() => setPlayers([]))
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [role]);

  return (
    <section id="squad" className="section squad">
      <div className="container">
        <h2 className="section-title">Our <span className="accent">Squad</span></h2>
        <p className="section-subtitle">Meet the players who wear the blue & gold with pride</p>

        <div className="filter-bar">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              className={`filter-btn ${role === value ? 'active' : ''}`}
              onClick={() => setRole(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="player-grid">
          {loading ? (
            <p className="loading-text">Loading squad...</p>
          ) : (
            players.map(player => <PlayerCard key={player.id} player={player} />)
          )}
        </div>
      </div>
    </section>
  );
}
