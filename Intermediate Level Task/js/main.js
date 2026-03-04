// Mumbai Indians Fan Hub - Main JavaScript

// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const playerGrid = document.getElementById('playerGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const upcomingPanel = document.getElementById('upcoming-panel');
const resultsPanel = document.getElementById('results-panel');
const upcomingMatchesEl = document.getElementById('upcomingMatches');
const resultsMatchesEl = document.getElementById('resultsMatches');
const pollForm = document.getElementById('pollForm');
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

// ===== Theme Toggle =====
function initTheme() {
  const saved = localStorage.getItem('mi-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('mi-theme', next);
});

// ===== Mobile Nav Toggle =====
navToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
  navToggle?.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('active');
    navToggle?.classList.remove('active');
  });
});

// ===== Sticky Navbar & Active Link =====
function updateNavOnScroll() {
  const scrollY = window.scrollY;
  
  if (scrollY > 100) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }

  // Update active nav link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNavOnScroll);
updateNavOnScroll();

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Render Player Cards =====
function renderPlayers(roleFilter = 'all') {
  if (!playerGrid) return;
  
  const filtered = roleFilter === 'all' 
    ? PLAYERS 
    : PLAYERS.filter(p => p.role === roleFilter);

  playerGrid.innerHTML = filtered.map(player => `
    <article class="player-card" data-role="${player.role}">
      <div class="player-img">${player.emoji}</div>
      <div class="player-body">
        <div class="player-header">
          <h3 class="player-name">${player.name}</h3>
          <span class="player-jersey">${player.jersey}</span>
        </div>
        <p class="player-role">${ROLE_LABELS[player.role]}</p>
        <p class="player-stats">${player.stats}</p>
        <p class="player-bio">${player.bio}</p>
      </div>
    </article>
  `).join('');
}

// ===== Squad Filter =====
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const role = btn.dataset.role;
    renderPlayers(role);
  });
});

// ===== Render Match Cards =====
function renderUpcomingMatches() {
  if (!upcomingMatchesEl) return;
  upcomingMatchesEl.innerHTML = UPCOMING_MATCHES.map(match => `
    <div class="match-card">
      <div class="match-team mi">
        <span class="team-name">Mumbai Indians</span>
      </div>
      <div class="match-vs">vs</div>
      <div class="match-team opponent">
        <span class="team-name">${match.opponent}</span>
      </div>
      <div class="match-info">
        ${match.date} • ${match.time}<br>
        <small>${match.venue}</small>
      </div>
    </div>
  `).join('');
}

function renderResults() {
  if (!resultsMatchesEl) return;
  resultsMatchesEl.innerHTML = PAST_RESULTS.map(match => `
    <div class="match-card">
      <div class="match-team mi">
        <span class="team-name">Mumbai Indians</span>
      </div>
      <div class="match-vs">vs</div>
      <div class="match-team opponent">
        <span class="team-name">${match.opponent}</span>
      </div>
      <div class="match-info">
        <span class="match-result">${match.result}</span><br>
        ${match.date} • ${match.venue}
      </div>
    </div>
  `).join('');
}

// ===== Schedule Tabs =====
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    upcomingPanel?.classList.toggle('active', tab === 'upcoming');
    resultsPanel?.classList.toggle('active', tab === 'results');
  });
});

// ===== Poll Form =====
pollForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const selected = pollForm.querySelector('input[name="mvp"]:checked');
  if (selected) {
    alert(`Thanks for voting! You chose: ${selected.value.charAt(0).toUpperCase() + selected.value.slice(1)}`);
  }
});

// ===== Comment Form =====
commentForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const textarea = form.querySelector('textarea');
  const nameInput = form.querySelector('input[type="text"]');
  const text = textarea?.value.trim();
  const name = nameInput?.value.trim();
  
  if (text && name && commentsList) {
    const commentEl = document.createElement('div');
    commentEl.className = 'comment';
    commentEl.innerHTML = `
      <p class="comment-text">"${text}"</p>
      <span class="comment-author">— ${name}</span>
    `;
    commentsList.insertBefore(commentEl, commentsList.firstChild);
    form.reset();
  }
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderPlayers();
  renderUpcomingMatches();
  renderResults();
});
