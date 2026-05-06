import { useState } from 'react'
import styles from './Shortener.module.css'

export default function Shortener({ onShorten }) {
  const [url, setUrl] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!url.trim() || loading) return
    setLoading(true); setError('')
    try {
      await onShorten(url.trim(), customSlug.trim() || undefined)
      setUrl(''); setCustomSlug(''); setShowCustom(false)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally { setLoading(false) }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.row}>
          <svg className={styles.icon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          <input className={styles.input} type="url" placeholder="https://your-very-long-url-goes-here.com/path..."
            value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} autoFocus />
          <button className={styles.btn} onClick={handleSubmit} disabled={!url.trim() || loading}>
            {loading ? <span className={styles.spinner} /> : <>Shorten <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>}
          </button>
        </div>
        {showCustom && (
          <div className={styles.slugRow}>
            <span className={styles.slugBase}>localhost:5000/</span>
            <input className={styles.slugInput} placeholder="custom-slug" value={customSlug}
              onChange={e => setCustomSlug(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <button className={styles.toggle} onClick={() => setShowCustom(v => !v)}>
          {showCustom ? '− remove custom slug' : '+ custom slug'}
        </button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  )
}
