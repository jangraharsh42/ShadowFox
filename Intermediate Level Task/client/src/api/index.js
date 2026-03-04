const API_BASE = '/api';

export async function fetchPlayers(role = 'all') {
  const url = role === 'all' ? `${API_BASE}/players` : `${API_BASE}/players?role=${role}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch players');
  return res.json();
}

export async function fetchUpcomingMatches() {
  const res = await fetch(`${API_BASE}/matches/upcoming`);
  if (!res.ok) throw new Error('Failed to fetch matches');
  return res.json();
}

export async function fetchResults() {
  const res = await fetch(`${API_BASE}/matches/results`);
  if (!res.ok) throw new Error('Failed to fetch results');
  return res.json();
}

export async function fetchNews() {
  const res = await fetch(`${API_BASE}/news`);
  if (!res.ok) throw new Error('Failed to fetch news');
  return res.json();
}

export async function fetchComments() {
  const res = await fetch(`${API_BASE}/comments`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

export async function postComment(text, author) {
  const res = await fetch(`${API_BASE}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, author })
  });
  if (!res.ok) throw new Error('Failed to post comment');
  return res.json();
}

export async function fetchPoll() {
  const res = await fetch(`${API_BASE}/poll`);
  if (!res.ok) throw new Error('Failed to fetch poll');
  return res.json();
}

export async function votePoll(mvp) {
  const res = await fetch(`${API_BASE}/poll`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mvp })
  });
  if (!res.ok) throw new Error('Failed to vote');
  return res.json();
}
