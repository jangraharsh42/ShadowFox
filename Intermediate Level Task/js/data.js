// Mumbai Indians Squad Data (IPL 2025 - sample)
const PLAYERS = [
  {
    id: 1,
    name: "Rohit Sharma",
    role: "batsman",
    jersey: 45,
    stats: "5,100+ runs",
    bio: "Captain. Opening batsman. Leading run-scorer for MI.",
    emoji: "🏏"
  },
  {
    id: 2,
    name: "Jasprit Bumrah",
    role: "bowler",
    jersey: 93,
    stats: "150+ wickets",
    bio: "World-class fast bowler. Death overs specialist.",
    emoji: "🎯"
  },
  {
    id: 3,
    name: "Suryakumar Yadav",
    role: "batsman",
    jersey: 63,
    stats: "3,200+ runs",
    bio: "Dynamic middle-order. 360° player.",
    emoji: "⚡"
  },
  {
    id: 4,
    name: "Ishan Kishan",
    role: "keeper",
    jersey: 32,
    stats: "2,100+ runs",
    bio: "Wicket-keeper batsman. Aggressive opener.",
    emoji: "🧤"
  },
  {
    id: 5,
    name: "Hardik Pandya",
    role: "all-rounder",
    jersey: 33,
    stats: "2,000 runs, 50 wkts",
    bio: "Power-hitter & medium pacer. Match-winner.",
    emoji: "💪"
  },
  {
    id: 6,
    name: "Tilak Varma",
    role: "batsman",
    jersey: 8,
    stats: "850+ runs",
    bio: "Young left-handed talent. Future star.",
    emoji: "🌟"
  },
  {
    id: 7,
    name: "Tim David",
    role: "batsman",
    jersey: 55,
    stats: "900+ runs",
    bio: "Big-hitting finisher. T20 specialist.",
    emoji: "🔥"
  },
  {
    id: 8,
    name: "Gerald Coetzee",
    role: "bowler",
    jersey: 15,
    stats: "45+ wickets",
    bio: "South African pace. Wicket-taking ability.",
    emoji: "🦁"
  },
  {
    id: 9,
    name: "Piyush Chawla",
    role: "bowler",
    jersey: 11,
    stats: "180+ IPL wickets",
    bio: "Veteran leg-spinner. Experience counts.",
    emoji: "🔄"
  },
  {
    id: 10,
    name: "Dewald Brevis",
    role: "batsman",
    jersey: 71,
    stats: "400+ runs",
    bio: "Baby AB. Young prodigy from South Africa.",
    emoji: "🇿🇦"
  },
  {
    id: 11,
    name: "Romario Shepherd",
    role: "all-rounder",
    jersey: 24,
    stats: "250 runs, 30 wkts",
    bio: "West Indian all-rounder. Power & pace.",
    emoji: "🌴"
  },
  {
    id: 12,
    name: "Mohammad Nabi",
    role: "all-rounder",
    jersey: 7,
    stats: "1,500 runs, 90 wkts",
    bio: "Afghan off-spinner. Reliable all-rounder.",
    emoji: "🦅"
  },
  {
    id: 13,
    name: "Nuwan Thushara",
    role: "bowler",
    jersey: 99,
    stats: "40+ wickets",
    bio: "Sri Lankan left-arm quick. Slingy action.",
    emoji: "🇱🇰"
  },
  {
    id: 14,
    name: "Nehal Wadhera",
    role: "batsman",
    jersey: 22,
    stats: "350+ runs",
    bio: "Punjab batsman. Clean striker.",
    emoji: "🏴"
  },
  {
    id: 15,
    name: "Shams Mulani",
    role: "all-rounder",
    jersey: 18,
    stats: "50 runs, 25 wkts",
    bio: "Left-arm spinner. Mumbai local.",
    emoji: "🏠"
  }
];

// Role labels for display
const ROLE_LABELS = {
  batsman: "Batsman",
  bowler: "Bowler",
  "all-rounder": "All-Rounder",
  keeper: "Wicket-Keeper"
};

// Match Schedule - Upcoming
const UPCOMING_MATCHES = [
  {
    id: 1,
    opponent: "Chennai Super Kings",
    date: "Mar 22, 2025",
    time: "7:30 PM IST",
    venue: "Wankhede Stadium, Mumbai"
  },
  {
    id: 2,
    opponent: "Gujarat Titans",
    date: "Mar 25, 2025",
    time: "3:30 PM IST",
    venue: "Narendra Modi Stadium, Ahmedabad"
  },
  {
    id: 3,
    opponent: "Royal Challengers Bengaluru",
    date: "Mar 28, 2025",
    time: "7:30 PM IST",
    venue: "Wankhede Stadium, Mumbai"
  },
  {
    id: 4,
    opponent: "Kolkata Knight Riders",
    date: "Apr 1, 2025",
    time: "7:30 PM IST",
    venue: "Eden Gardens, Kolkata"
  }
];

// Match Results
const PAST_RESULTS = [
  {
    id: 1,
    opponent: "Delhi Capitals",
    result: "MI won by 29 runs",
    date: "Mar 18, 2025",
    venue: "Wankhede Stadium"
  },
  {
    id: 2,
    opponent: "Sunrisers Hyderabad",
    result: "SRH won by 6 wickets",
    date: "Mar 15, 2025",
    venue: "Rajiv Gandhi Stadium"
  },
  {
    id: 3,
    opponent: "Rajasthan Royals",
    result: "MI won by 4 wickets",
    date: "Mar 12, 2025",
    venue: "Wankhede Stadium"
  },
  {
    id: 4,
    opponent: "Punjab Kings",
    result: "MI won by 18 runs",
    date: "Mar 10, 2025",
    venue: "PCA Stadium"
  }
];
