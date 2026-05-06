import { useState, useEffect } from "react";
import Shortener from "./components/Shortener";
import ResultCard from "./components/ResultCard";
import UrlList from "./components/UrlList";
import { shortenUrl, getAllUrls, deleteUrl } from "./utils/api";
import styles from "./App.module.css";

export default function App() {
  const [urls, setUrls] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUrls()
      .then(setUrls)
      .finally(() => setLoading(false));
  }, []);

  const handleShorten = async (url, customSlug) => {
    const entry = await shortenUrl(url, customSlug);
    setLastResult(entry);
    setUrls((prev) =>
      prev.find((u) => u.slug === entry.slug) ? prev : [entry, ...prev],
    );
  };

  const handleDelete = async (slug) => {
    await deleteUrl(slug);
    setUrls((prev) => prev.filter((u) => u.slug !== slug));
    if (lastResult?.slug === slug) setLastResult(null);
  };

  const totalClicks = urls.reduce((sum, u) => sum + u.clicks, 0);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          snip
          <span className={styles.logoDot} />
        </div>
        <div className={styles.navRight}>
          <span className={styles.stat}>
            <span>{urls.length}</span> links
          </span>
          <div className={styles.divider} />
          <span className={styles.stat}>
            <span>{totalClicks}</span> clicks
          </span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>URL Shortener</span>
          </div>
          <h1 className={styles.title}>
            Short links.
            <br />
            <em>Big impact.</em>
          </h1>
          <p className={styles.desc}>
            Paste any URL and get a clean, trackable short link in seconds. No
            account needed.
          </p>
        </div>

        <div className={styles.shortenerWrap}>
          <Shortener onShorten={handleShorten} />
        </div>

        {lastResult && (
          <div className={styles.resultWrap}>
            <ResultCard entry={lastResult} />
          </div>
        )}

        <div className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>Recent Links</span>
            <span className={styles.tableCount}>{urls.length} total</span>
          </div>
          {loading ? (
            <div className={styles.loading}>
              <span className={styles.spinner} /> Loading...
            </div>
          ) : (
            <UrlList urls={urls} onDelete={handleDelete} />
          )}
        </div>
      </main>

      <footer className={styles.footer}>snip</footer>
    </div>
  );
}
