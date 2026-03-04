import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory store for comments & poll (replace with DB in production)
let comments = [
  { id: 1, text: '"One Family! Can\'t wait for the season. MI for life! 💙"', author: 'Rahul M.' },
  { id: 2, text: '"Best franchise in IPL history. 5 trophies and counting!"', author: 'Priya K.' },
  { id: 3, text: '"The blue and gold runs in my veins. Duniya Hila Denge! 🏏"', author: 'Arjun S.' }
];
let pollVotes = { bumrah: 0, kishan: 0, surya: 0, hardik: 0 };

// Players data - images from /players/ (local). Replace with official MI photos when available.
const players = [
  { id: 1, name: "Rohit Sharma", role: "batsman", jersey: 45, stats: "5,100+ runs", bio: "Captain. Leading run-scorer for MI. Right-handed opening batsman.", emoji: "🏏", imageUrl: "/players/rohit_sharma.jpg",
    nationality: "India", birthDate: "30 Apr 1987", battingStyle: "Right-handed", bowlingStyle: "Right-arm off break", iplDebut: "2008", matches: 243, runs: 6522, wickets: 15, highestScore: "109*", bestBowling: "1/9" },
  { id: 2, name: "Jasprit Bumrah", role: "bowler", jersey: 93, stats: "150+ wickets", bio: "World-class fast bowler. Death overs specialist. Yorkers & bouncers.", emoji: "🎯", imageUrl: "/players/jasprit_bumrah.webp",
    nationality: "India", birthDate: "6 Dec 1993", battingStyle: "Right-handed", bowlingStyle: "Right-arm fast", iplDebut: "2013", matches: 130, runs: 67, wickets: 162, highestScore: "16", bestBowling: "5/10" },
  { id: 3, name: "Suryakumar Yadav", role: "batsman", jersey: 63, stats: "3,200+ runs", bio: "Dynamic middle-order. 360° player. India's T20 superstar.", emoji: "⚡", imageUrl: "/players/player-3.jpg",
    nationality: "India", birthDate: "14 Sep 1990", battingStyle: "Right-handed", bowlingStyle: "Right-arm medium", iplDebut: "2012", matches: 152, runs: 3342, wickets: 0, highestScore: "103*", bestBowling: "-" },
  { id: 4, name: "Ishan Kishan", role: "keeper", jersey: 32, stats: "2,100+ runs", bio: "Wicket-keeper batsman. Aggressive left-handed opener.", emoji: "🧤", imageUrl: "/players/ishan_kishan.webp",
    nationality: "India", birthDate: "18 Jul 1998", battingStyle: "Left-handed", bowlingStyle: "-", iplDebut: "2016", matches: 110, runs: 2587, wickets: 0, highestScore: "99", bestBowling: "-" },
  { id: 5, name: "Hardik Pandya", role: "all-rounder", jersey: 33, stats: "2,000 runs, 50 wkts", bio: "Power-hitter & medium pacer. Match-winner. Former India vice-captain.", emoji: "💪", imageUrl: "/players/hardik_pandya.webp",
    nationality: "India", birthDate: "11 Oct 1993", battingStyle: "Right-handed", bowlingStyle: "Right-arm medium-fast", iplDebut: "2015", matches: 132, runs: 2508, wickets: 57, highestScore: "91", bestBowling: "3/17" },
  { id: 6, name: "Tilak Varma", role: "batsman", jersey: 8, stats: "850+ runs", bio: "Young left-handed talent. Clean striker. Future star.", emoji: "🌟", imageUrl: "/players/tilak_verma.jpg",
    nationality: "India", birthDate: "8 Nov 2002", battingStyle: "Left-handed", bowlingStyle: "Right-arm off break", iplDebut: "2022", matches: 42, runs: 1032, wickets: 0, highestScore: "84*", bestBowling: "-" },
  { id: 7, name: "Tim David", role: "batsman", jersey: 55, stats: "900+ runs", bio: "Big-hitting finisher. T20 specialist. Singapore-born Australian.", emoji: "🔥", imageUrl: "/players/Tim-David.png",
    nationality: "Australia", birthDate: "16 Mar 1996", battingStyle: "Right-handed", bowlingStyle: "Right-arm off break", iplDebut: "2022", matches: 47, runs: 1052, wickets: 0, highestScore: "86*", bestBowling: "-" },
  { id: 8, name: "Gerald Coetzee", role: "bowler", jersey: 15, stats: "45+ wickets", bio: "South African pace. Wicket-taking ability. Raw pace.", emoji: "🦁", imageUrl: "/players/coetze.jpg",
    nationality: "South Africa", birthDate: "23 Oct 2000", battingStyle: "Right-handed", bowlingStyle: "Right-arm fast", iplDebut: "2024", matches: 15, runs: 45, wickets: 18, highestScore: "23", bestBowling: "4/34" },
  { id: 9, name: "Piyush Chawla", role: "bowler", jersey: 11, stats: "180+ IPL wickets", bio: "Veteran leg-spinner. Third-highest IPL wicket-taker.", emoji: "🔄", imageUrl: "/players/piyush_chawla.jpg",
    nationality: "India", birthDate: "24 Dec 1988", battingStyle: "Left-handed", bowlingStyle: "Leg break googly", iplDebut: "2008", matches: 191, runs: 585, wickets: 181, highestScore: "24", bestBowling: "4/17" },
  { id: 10, name: "Dewald Brevis", role: "batsman", jersey: 71, stats: "400+ runs", bio: "Baby AB. Young prodigy from South Africa. U19 World Cup star.", emoji: "🇿🇦", imageUrl: "/players/dewald brawis.webp",
    nationality: "South Africa", birthDate: "29 Apr 2003", battingStyle: "Right-handed", bowlingStyle: "Right-arm leg break", iplDebut: "2022", matches: 28, runs: 482, wickets: 0, highestScore: "46", bestBowling: "-" },
  { id: 11, name: "Romario Shepherd", role: "all-rounder", jersey: 24, stats: "250 runs, 30 wkts", bio: "West Indian all-rounder. Power & pace. Hard-hitting lower order.", emoji: "🌴", imageUrl: "/players/romario.avif",
    nationality: "West Indies", birthDate: "26 Nov 1995", battingStyle: "Right-handed", bowlingStyle: "Right-arm fast-medium", iplDebut: "2022", matches: 35, runs: 312, wickets: 28, highestScore: "39*", bestBowling: "4/31" },
  { id: 12, name: "Mohammad Nabi", role: "all-rounder", jersey: 7, stats: "1,500 runs, 90 wkts", bio: "Afghan off-spinner. Reliable all-rounder. Experienced campaigner.", emoji: "🦅", imageUrl: "/players/mohammad_nabi.jpg",
    nationality: "Afghanistan", birthDate: "1 Jan 1985", battingStyle: "Right-handed", bowlingStyle: "Right-arm off break", iplDebut: "2017", matches: 124, runs: 1495, wickets: 97, highestScore: "89", bestBowling: "4/11" },
  { id: 13, name: "Nuwan Thushara", role: "bowler", jersey: 99, stats: "40+ wickets", bio: "Sri Lankan left-arm quick. Slingy Malinga-style action.", emoji: "🇱🇰", imageUrl: "/players/Nuwan-Thushara-makes-his-IPL-debut-for-Mumbai-Indians.webp",
    nationality: "Sri Lanka", birthDate: "1 Aug 1994", battingStyle: "Right-handed", bowlingStyle: "Left-arm fast", iplDebut: "2024", matches: 12, runs: 18, wickets: 15, highestScore: "8", bestBowling: "4/19" },
  { id: 14, name: "Nehal Wadhera", role: "batsman", jersey: 22, stats: "350+ runs", bio: "Punjab batsman. Clean striker. Domestic talent.", emoji: "🏴", imageUrl: "/players/Nehal-Wadhera.jpg",
    nationality: "India", birthDate: "4 Sep 2000", battingStyle: "Left-handed", bowlingStyle: "-", iplDebut: "2023", matches: 21, runs: 375, wickets: 0, highestScore: "64", bestBowling: "-" },
  { id: 15, name: "Shams Mulani", role: "all-rounder", jersey: 18, stats: "50 runs, 25 wkts", bio: "Left-arm spinner. Mumbai local. Domestic star.", emoji: "🏠", imageUrl: "/players/mulani-jan-three_d-1024x576.webp",
    nationality: "India", birthDate: "16 Feb 1997", battingStyle: "Left-handed", bowlingStyle: "Slow left-arm orthodox", iplDebut: "2022", matches: 18, runs: 52, wickets: 14, highestScore: "16", bestBowling: "3/24" }
];

const venueImg = (key) => ({
  "Wankhede Stadium": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=180&fit=crop",
  "Narendra Modi Stadium": "https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=400&h=180&fit=crop",
  "Eden Gardens": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=180&fit=crop",
  "Rajiv Gandhi Stadium": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=180&fit=crop",
  "PCA Stadium": "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=400&h=180&fit=crop"
}[key] || "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=180&fit=crop");

const upcomingMatches = [
  { id: 1, opponent: "Chennai Super Kings", date: "Mar 22, 2025", time: "7:30 PM IST", venue: "Wankhede Stadium, Mumbai", venueImg: venueImg("Wankhede Stadium") },
  { id: 2, opponent: "Gujarat Titans", date: "Mar 25, 2025", time: "3:30 PM IST", venue: "Narendra Modi Stadium, Ahmedabad", venueImg: venueImg("Narendra Modi Stadium") },
  { id: 3, opponent: "Royal Challengers Bengaluru", date: "Mar 28, 2025", time: "7:30 PM IST", venue: "Wankhede Stadium, Mumbai", venueImg: venueImg("Wankhede Stadium") },
  { id: 4, opponent: "Kolkata Knight Riders", date: "Apr 1, 2025", time: "7:30 PM IST", venue: "Eden Gardens, Kolkata", venueImg: venueImg("Eden Gardens") }
];

const pastResults = [
  { id: 1, opponent: "Delhi Capitals", result: "MI won by 29 runs", date: "Mar 18, 2025", venue: "Wankhede Stadium", venueImg: venueImg("Wankhede Stadium") },
  { id: 2, opponent: "Sunrisers Hyderabad", result: "SRH won by 6 wickets", date: "Mar 15, 2025", venue: "Rajiv Gandhi Stadium", venueImg: venueImg("Rajiv Gandhi Stadium") },
  { id: 3, opponent: "Rajasthan Royals", result: "MI won by 4 wickets", date: "Mar 12, 2025", venue: "Wankhede Stadium", venueImg: venueImg("Wankhede Stadium") },
  { id: 4, opponent: "Punjab Kings", result: "MI won by 18 runs", date: "Mar 10, 2025", venue: "PCA Stadium", venueImg: venueImg("PCA Stadium") }
];

const news = [
  { id: 1, date: "Mar 1, 2025", title: "MI announce squad for IPL 2025", desc: "Mumbai Indians reveal their 25-member squad for the upcoming season with exciting new additions.", imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop" },
  { id: 2, date: "Feb 28, 2025", title: "Practice sessions kick off at Wankhede", desc: "Players gear up for the season with intensive training at the iconic Wankhede Stadium.", imageUrl: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=400&fit=crop" },
  { id: 3, date: "Feb 25, 2025", title: "Fan meet & greet event announced", desc: "Meet your favorite MI stars at the fan engagement event scheduled for March 15.", imageUrl: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&h=400&fit=crop" }
];

// API Routes
app.get('/api/players', (req, res) => {
  const { role } = req.query;
  const filtered = role && role !== 'all' ? players.filter(p => p.role === role) : players;
  res.json(filtered);
});

app.get('/api/matches/upcoming', (req, res) => res.json(upcomingMatches));
app.get('/api/matches/results', (req, res) => res.json(pastResults));
app.get('/api/news', (req, res) => res.json(news));

app.get('/api/comments', (req, res) => res.json(comments));

app.post('/api/comments', (req, res) => {
  const { text, author } = req.body;
  if (!text?.trim() || !author?.trim()) {
    return res.status(400).json({ error: 'Text and author required' });
  }
  const comment = {
    id: Date.now(),
    text: `"${text.trim()}"`,
    author: author.trim()
  };
  comments.unshift(comment);
  res.status(201).json(comment);
});

app.get('/api/poll', (req, res) => res.json(pollVotes));

app.post('/api/poll', (req, res) => {
  const { mvp } = req.body;
  const valid = ['bumrah', 'kishan', 'surya', 'hardik'];
  if (!valid.includes(mvp)) {
    return res.status(400).json({ error: 'Invalid vote' });
  }
  pollVotes[mvp]++;
  res.json({ success: true, votes: pollVotes });
});

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`MI Fan Hub API running on http://localhost:${PORT}`);
});
