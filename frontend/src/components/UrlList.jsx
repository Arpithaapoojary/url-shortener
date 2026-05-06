import { useState } from 'react'
import styles from './UrlList.module.css'

const CopyIcon = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
const CheckIcon = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
const LinkIcon = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const TrashIcon = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>

export default function UrlList({ urls, onDelete }) {
  const [copiedSlug, setCopiedSlug] = useState(null)
  const [deletingSlug, setDeletingSlug] = useState(null)

  const copy = async (url, slug) => {
    await navigator.clipboard.writeText(url)
    setCopiedSlug(slug); setTimeout(() => setCopiedSlug(null), 2000)
  }
  const handleDelete = async (slug) => {
    setDeletingSlug(slug); await onDelete(slug); setDeletingSlug(null)
  }
  const timeAgo = (d) => {
    const m = Math.floor((Date.now() - new Date(d)) / 60000)
    if (m < 1) return 'just now'
    if (m < 60) return `${m}m ago`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
  }

  if (!urls.length) return (
    <div className={styles.empty}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      <span>No links yet — paste a URL above to get started</span>
    </div>
  )

  return (
    <div className={styles.table}>
      <div className={styles.thead}>
        <span>Slug</span>
        <span>Destination</span>
        <span className={styles.center}>Clicks</span>
        <span>Age</span>
        <span></span>
      </div>
      {urls.map((entry, i) => (
        <div key={entry.slug} className={styles.row} style={{ animationDelay: `${i * 0.04}s` }}>
          <div className={styles.slug}>{entry.slug}</div>
          <div className={styles.orig}>{entry.originalUrl.length > 50 ? entry.originalUrl.slice(0,50)+'…' : entry.originalUrl}</div>
          <div className={`${styles.clicks} ${styles.center}`}>{entry.clicks}</div>
          <div className={styles.time}>{timeAgo(entry.createdAt)}</div>
          <div className={styles.actions}>
            <button className={`${styles.iBtn} ${copiedSlug === entry.slug ? styles.green : ''}`} onClick={() => copy(entry.shortUrl, entry.slug)} title="Copy">
              {copiedSlug === entry.slug ? <CheckIcon /> : <CopyIcon />}
            </button>
            <a className={styles.iBtn} href={entry.shortUrl} target="_blank" rel="noreferrer" title="Visit"><LinkIcon /></a>
            <button className={`${styles.iBtn} ${styles.del}`} onClick={() => handleDelete(entry.slug)} disabled={deletingSlug === entry.slug} title="Delete"><TrashIcon /></button>
          </div>
        </div>
      ))}
    </div>
  )
}
