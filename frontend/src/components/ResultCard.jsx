import { useState } from 'react'
import styles from './ResultCard.module.css'

export default function ResultCard({ entry }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(entry.shortUrl)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <div className={styles.dot} />
        <div>
          <div className={styles.url}>{entry.shortUrl}</div>
          <div className={styles.orig}>↳ {entry.originalUrl.length > 65 ? entry.originalUrl.slice(0,65)+'…' : entry.originalUrl}</div>
        </div>
      </div>
      <div className={styles.btns}>
        <button className={`${styles.btn} ${copied ? styles.copied : ''}`} onClick={copy}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <a className={styles.btn} href={entry.shortUrl} target="_blank" rel="noreferrer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Visit
        </a>
      </div>
    </div>
  )
}
