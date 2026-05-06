# ✂ Snip — URL Shortener

> A clean, fast URL shortener built with React + Node.js. No database, no API keys, no cost.

![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Node.js-ff4d00)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 🔗 Shorten any URL instantly
- ✏️ Custom slugs (e.g. `localhost:5000/my-link`)
- 📊 Click counter for every link
- 🗂 Full history of all shortened URLs
- ❌ Delete links anytime
- 💾 No database — stores in a local JSON file

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/url-shortener.git
cd url-shortener
```

### 2. Run the backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
# Runs on http://localhost:5000
```

### 3. Run the frontend
```bash
cd ../frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### 4. Open the app
Visit **http://localhost:5173** 🎉

---

## 🗂 Project Structure

```
url-shortener/
├── backend/
│   ├── server.js       # Express server + all routes
│   ├── db.json         # Auto-created, stores all URLs
│   └── .env.example
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Shortener.jsx    # URL input form
        │   ├── ResultCard.jsx   # Shows new short link
        │   └── UrlList.jsx      # History table
        ├── utils/api.js         # Axios calls
        └── App.jsx              # Main app
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/shorten` | Shorten a URL |
| GET | `/api/urls` | Get all URLs |
| DELETE | `/api/urls/:slug` | Delete a URL |
| GET | `/:slug` | Redirect to original URL |

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, CSS Modules, Vite |
| Backend | Node.js, Express |
| Storage | JSON file (no DB needed) |
| ID generation | nanoid |

---

## 📄 License
MIT
