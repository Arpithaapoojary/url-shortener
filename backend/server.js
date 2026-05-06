require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const DB_FILE = path.join(__dirname, "db.json");

// ── helpers ──────────────────────────────────────────────────────────────────

const readDB = () => {
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "{}");
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
};

const writeDB = (data) =>
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

// ── middleware ────────────────────────────────────────────────────────────────

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());

// ── routes ────────────────────────────────────────────────────────────────────

// Health check
app.get("/health", (_, res) => res.json({ status: "ok" }));

// Shorten a URL
app.post("/api/shorten", (req, res) => {
  const { url, customSlug } = req.body;

  if (!url || !isValidUrl(url))
    return res.status(400).json({ error: "Please provide a valid URL" });

  const db = readDB();

  // Check if URL already shortened
  const existing = Object.values(db).find((entry) => entry.originalUrl === url);
  if (existing)
    return res.json({ ...existing, shortUrl: `${BASE_URL}/${existing.slug}` });

  // Validate custom slug
  const slug = customSlug
    ? customSlug.trim().toLowerCase().replace(/\s+/g, "-")
    : nanoid(6);

  if (db[slug])
    return res.status(409).json({ error: "This custom slug is already taken" });

  const entry = {
    slug,
    originalUrl: url,
    shortUrl: `${BASE_URL}/${slug}`,
    clicks: 0,
    createdAt: new Date().toISOString(),
  };

  db[slug] = entry;
  writeDB(db);

  res.json(entry);
});

// Get all URLs
app.get("/api/urls", (_, res) => {
  const db = readDB();
  const urls = Object.values(db).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(urls);
});

// Delete a URL
app.delete("/api/urls/:slug", (req, res) => {
  const db = readDB();
  if (!db[req.params.slug])
    return res.status(404).json({ error: "URL not found" });
  delete db[req.params.slug];
  writeDB(db);
  res.json({ success: true });
});

// Redirect short URL → must be LAST
app.get("/:slug", (req, res) => {
  const db = readDB();
  const entry = db[req.params.slug];
  if (!entry) return res.status(404).send("Short URL not found");
  entry.clicks++;
  writeDB(db);
  res.redirect(entry.originalUrl);
});

// ── start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, () =>
  console.log(`🚀 URL Shortener running on ${BASE_URL}`)
);
