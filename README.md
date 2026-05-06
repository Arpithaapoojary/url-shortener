<div align="center">

# snip

**A minimal, full-stack URL shortener with click analytics.**

![](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=white)
![](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel&logoColor=white)
![](https://img.shields.io/badge/License-MIT-6366f1?style=flat-square)

[Live Demo](https://your-demo-link.vercel.app) · [Report Bug](https://github.com/Arpithaapoojary/url-shortener/issues) · [Request Feature](https://github.com/Arpithaapoojary/url-shortener/issues)

</div>

---

## Overview

**snip** transforms long, messy URLs into clean short links with real-time click tracking. Built as a full-stack project with a React frontend and a Node.js/Express backend. No database required — all data is stored in a local JSON file.

---

## Features

- Shorten any URL instantly with a generated or custom slug
- Custom slugs — create branded links like `localhost:5000/my-link`
- Click counter — track how many times each link has been visited
- Full link history — view, copy, visit, or delete all your links
- No database setup required — data persists in a `db.json` file
- Responsive layout — works on desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, CSS Modules, Vite |
| Backend | Node.js, Express |
| Storage | JSON file (via Node.js `fs` module) |
| ID Generation | nanoid |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

**Clone the repository**
```bash
git clone https://github.com/Arpithaapoojary/url-shortener.git
cd url-shortener
```

**Start the backend**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
# Runs on http://localhost:5000
```

**Start the frontend**
```bash
cd ../frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

---

## Environment Variables

Create a `.env` file inside `backend/` based on `.env.example`:

```env
PORT=5000
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/shorten` | Shorten a URL |
| GET | `/api/urls` | Get all shortened URLs |
| DELETE | `/api/urls/:slug` | Delete a URL by slug |
| GET | `/:slug` | Redirect to the original URL |

**Example request**
```bash
curl -X POST http://localhost:5000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com/very/long/path", "customSlug": "gh"}'
```

**Example response**
```json
{
  "slug": "gh",
  "originalUrl": "https://github.com/very/long/path",
  "shortUrl": "http://localhost:5000/gh",
  "clicks": 0,
  "createdAt": "2025-01-01T10:00:00.000Z"
}
```

---

## Project Structure

```
url-shortener/
├── backend/
│   ├── server.js            # Express server and API routes
│   ├── db.json              # Auto-generated data store
│   ├── .env.example         # Environment variable template
│   └── package.json
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Shortener.jsx      # URL input form
        │   ├── ResultCard.jsx     # Success result display
        │   └── UrlList.jsx        # Links table with actions
        ├── utils/
        │   └── api.js             # Axios API client
        ├── App.jsx                # Root component
        └── index.css              # Global styles and CSS variables
```

---

## Deployment

**Frontend — Vercel**

1. Import the repo at [vercel.com](https://vercel.com)
2. Set root directory to `frontend`
3. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`
4. Deploy

**Backend — Render**

1. Create a new Web Service at [render.com](https://render.com)
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add environment variables from `.env.example`

---

## Roadmap

- User authentication and personal dashboards
- QR code generation for each short link
- Link expiry dates
- Click analytics with graphs — country, device, referrer
- Custom domain support

---

## License

Distributed under the MIT License.

---

<div align="center">
  <sub>Built by <a href="https://github.com/Arpithaapoojary">Arpitha Poojary</a> — if you found this useful, consider leaving a star.</sub>
</div>
