# Mumbai Indians Fan Hub 🏏

A modern, responsive fan website for the IPL team **Mumbai Indians**. Built with **React**, **Node.js**, and responsive frontend practices.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite |
| **Backend** | Node.js, Express |
| **Styling** | CSS3 (Variables, Grid, Flexbox) |
| **State** | React hooks, Theme Context |

## Features

- **Home** – Hero banner, achievements strip
- **Squad** – Player cards with role filter (API-driven)
- **Match Schedule** – Upcoming fixtures & results
- **Team Stats** – Trophies, top scorers, records
- **News & Updates** – News cards from API
- **Fan Zone** – MVP poll & fan comments (persisted on server)
- **Dark/Light theme** – Toggle with `localStorage` persistence
- **Fully responsive** – Desktop, tablet, mobile breakpoints

## Project Structure

```
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── api/            # API service
│   │   ├── components/     # Reusable components
│   │   ├── context/        # Theme context
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js Express API
│   ├── server.js           # API routes
│   └── package.json
├── index.html              # Original static version
├── css/                    # Original static styles
├── js/                     # Original static scripts
├── package.json            # Root scripts
└── README.md
```

## Quick Start

### 1. Install dependencies

```bash
npm run install:all
```

Or manually:

```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Run development (React + API together)

```bash
npm run dev
```

- **Frontend:** http://localhost:3000  
- **API:** http://localhost:5000  

The React app proxies `/api` to the backend.

### 3. Run separately

**Terminal 1 – API:**
```bash
npm run server
```

**Terminal 2 – React:**
```bash
npm run client
```

### 4. Production build

```bash
npm run build
```

Then run the server with `NODE_ENV=production` to serve the built React app:

```bash
cd server
NODE_ENV=production node server.js
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players?role=all` | Players (filter by role) |
| GET | `/api/matches/upcoming` | Upcoming fixtures |
| GET | `/api/matches/results` | Past results |
| GET | `/api/news` | News items |
| GET | `/api/comments` | Fan comments |
| POST | `/api/comments` | Add comment `{ text, author }` |
| GET | `/api/poll` | Poll vote counts |
| POST | `/api/poll` | Vote `{ mvp }` |

## Responsive Breakpoints

- **Desktop:** 992px+
- **Tablet:** 768px – 991px
- **Mobile:** 480px – 767px
- **Small mobile:** &lt; 480px

## License

Unofficial fan project. Mumbai Indians and IPL are trademarks of BCCI.
