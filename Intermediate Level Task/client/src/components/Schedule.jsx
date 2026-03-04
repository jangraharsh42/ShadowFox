import { useState, useEffect } from 'react';
import { fetchUpcomingMatches, fetchResults } from '../api';

function MatchCard({ match, isResult }) {
  return (
    <div className="match-card">
      {match.venueImg && (
        <div className="match-venue-img">
          <img src={match.venueImg} alt={match.venue} loading="lazy" />
        </div>
      )}
      <div className="match-teams">
      <div className="match-team mi">
        <span className="team-name">Mumbai Indians</span>
      </div>
      <div className="match-vs">vs</div>
      <div className="match-team opponent">
        <span className="team-name">{match.opponent}</span>
      </div>
      </div>
      <div className="match-info">
        {isResult ? (
          <>
            <span className="match-result">{match.result}</span>
            <br />
            {match.date} • {match.venue}
          </>
        ) : (
          <>
            {match.date} • {match.time}
            <br />
            <small>{match.venue}</small>
          </>
        )}
      </div>
    </div>
  );
}

export default function Schedule() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcoming, setUpcoming] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchUpcomingMatches(), fetchResults()])
      .then(([u, r]) => {
        setUpcoming(u);
        setResults(r);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="schedule" className="section schedule">
      <div className="container">
        <h2 className="section-title">Match <span className="accent">Schedule</span></h2>
        <p className="section-subtitle">IPL 2025 Fixtures & Results</p>

        <div className="schedule-tabs">
          <button
            className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            Results
          </button>
        </div>

        <div className="schedule-content">
          <div className={`tab-panel ${activeTab === 'upcoming' ? 'active' : ''}`}>
            {loading ? (
              <p className="loading-text">Loading...</p>
            ) : (
              <div className="match-cards">
                {upcoming.map(m => <MatchCard key={m.id} match={m} isResult={false} />)}
              </div>
            )}
          </div>
          <div className={`tab-panel ${activeTab === 'results' ? 'active' : ''}`}>
            {loading ? (
              <p className="loading-text">Loading...</p>
            ) : (
              <div className="match-cards">
                {results.map(m => <MatchCard key={m.id} match={m} isResult />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
