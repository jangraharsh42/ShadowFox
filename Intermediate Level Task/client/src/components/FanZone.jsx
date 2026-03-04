import { useState, useEffect } from 'react';
import { fetchComments, postComment, fetchPoll, votePoll } from '../api';

const POLL_OPTIONS = [
  { value: 'bumrah', label: 'Jasprit Bumrah' },
  { value: 'kishan', label: 'Ishan Kishan' },
  { value: 'surya', label: 'Suryakumar Yadav' },
  { value: 'hardik', label: 'Hardik Pandya' }
];

export default function FanZone() {
  const [comments, setComments] = useState([]);
  const [pollVotes, setPollVotes] = useState({ bumrah: 0, kishan: 0, surya: 0, hardik: 0 });
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedMvp, setSelectedMvp] = useState('');

  useEffect(() => {
    Promise.all([fetchComments(), fetchPoll()])
      .then(([c, p]) => {
        setComments(c);
        setPollVotes(p);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) return;
    try {
      const comment = await postComment(text.trim(), author.trim());
      setComments(prev => [comment, ...prev]);
      setText('');
      setAuthor('');
    } catch (err) {
      alert('Failed to post comment');
    }
  };

  const handlePollSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMvp) {
      alert('Please select an option');
      return;
    }
    try {
      const { votes } = await votePoll(selectedMvp);
      setPollVotes(votes);
      setSelectedMvp('');
      alert('Thanks for voting!');
    } catch (err) {
      alert('Failed to vote');
    }
  };

  return (
    <section id="fanzone" className="section fanzone">
      <div className="container">
        <h2 className="section-title">Fan <span className="accent">Zone</span></h2>
        <p className="section-subtitle">Your voice matters. Vote and connect!</p>

        <div className="fanzone-grid">
          <div className="poll-card">
            <h3>Quick Poll</h3>
            <p className="poll-question">Who will be MI's MVP this season?</p>
            <form className="poll-form" onSubmit={handlePollSubmit}>
              {POLL_OPTIONS.map(({ value, label }) => (
                <label key={value} className="poll-option">
                  <input
                    type="radio"
                    name="mvp"
                    value={value}
                    checked={selectedMvp === value}
                    onChange={() => setSelectedMvp(value)}
                  />
                  {label}
                  {pollVotes[value] > 0 && (
                    <span className="poll-count"> ({pollVotes[value]} votes)</span>
                  )}
                </label>
              ))}
              <button type="submit" className="btn btn-primary">Vote</button>
            </form>
          </div>

          <div className="comments-card">
            <h3>Fan Shoutouts</h3>
            <div className="comments-list">
              {loading ? (
                <p className="loading-text">Loading...</p>
              ) : (
                comments.map(c => (
                  <div key={c.id} className="comment">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.author)}&size=48&background=004BA0&color=FFD141`}
                      alt=""
                      className="comment-avatar"
                    />
                    <div className="comment-body">
                      <p className="comment-text">{c.text}</p>
                      <span className="comment-author">— {c.author}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <textarea
                placeholder="Share your MI spirit..."
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">Post</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
