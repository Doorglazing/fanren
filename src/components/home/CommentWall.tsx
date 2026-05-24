import { useState, useEffect, useCallback } from 'react';
import { useI18n } from '../../i18n';
import styles from './CommentWall.module.css';

interface Comment {
  id: string; name: string; text: string; time: number; likes: number; location?: string;
}

const PAGE_SIZE = 8;

export default function CommentWall() {
  const { t } = useI18n();
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [sort, setSort] = useState<'time'|'likes'>('time');
  const [loading, setLoading] = useState(false);
  const [adminPw, setAdminPw] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminOk, setAdminOk] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('fanren-liked')||'[]')); } catch { return new Set(); }
  });
  const [userCity, setUserCity] = useState('');

  // 通过 IP 获取城市
  useEffect(() => {
    const cached = sessionStorage.getItem('fanren-city');
    if (cached) { setUserCity(cached); return; }
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => {
        const city = d.city || d.region || '';
        if (city) { sessionStorage.setItem('fanren-city', city); setUserCity(city); }
      })
      .catch(() => {});
  }, []);

  const updateLiked = (s: Set<string>) => {
    setLiked(s);
    localStorage.setItem('fanren-liked', JSON.stringify([...s]));
  };

  const fetchComments = useCallback(async () => {
    const res = await fetch(`/api/comments?sort=${sort}&page=${page}&pageSize=${PAGE_SIZE}`);
    const data = await res.json();
    setComments(data.comments || []);
    setTotal(data.total || 0);
    setTotalPages(data.totalPages || 1);
  }, [sort, page]);

  useEffect(() => { fetchComments(); }, [fetchComments]);
  useEffect(() => { setPage(1); }, [sort]);

  const submit = async () => {
    const txt = text.trim().slice(0, 100);
    if (!txt || loading) return;
    setLoading(true);
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: txt, name: name.trim(), location: userCity }),
    });
    const data = await res.json();
    if (data.ok) { setText(''); setName(''); setPage(1); }
    setLoading(false);
    fetchComments();
  };

  const toggleLike = async (id: string) => {
    const isLiked = liked.has(id);
    await fetch(`/api/comments?id=${id}&action=${isLiked ? 'unlike' : 'like'}`, { method: 'PATCH' });
    const next = new Set(liked);
    isLiked ? next.delete(id) : next.add(id);
    updateLiked(next);
    fetchComments();
  };

  const del = async (id: string) => {
    if (!adminOk) return;
    const res = await fetch(`/api/comments?id=${id}&pw=${encodeURIComponent(adminPw)}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.ok) fetchComments();
  };

  const fmt = (ts: number) => {
    const d = new Date(ts);
    const bj = new Date(d.getTime() + d.getTimezoneOffset() * 60000 + 8 * 3600000);
    const y = bj.getFullYear();
    const m = bj.getMonth() + 1;
    const day = bj.getDate();
    const h = String(bj.getHours()).padStart(2, '0');
    const min = String(bj.getMinutes()).padStart(2, '0');
    return `${y}/${m}/${day} ${h}:${min}`;
  };

  const pageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('comments.title')}</h2>
          <span className={styles.total}>{total} {t('comments.total')}</span>
          <button className={`${styles.sortBtn} ${sort==='time'?styles.sortActive:''}`} onClick={()=>setSort('time')}>{t('comments.latest')}</button>
          <button className={`${styles.sortBtn} ${sort==='likes'?styles.sortActive:''}`} onClick={()=>setSort('likes')}>{t('comments.hottest')}</button>
        </div>

        <div className={styles.inputRow}>
          <input className={styles.nameInput} value={name} onChange={e => setName(e.target.value)} maxLength={8} placeholder={t('comments.namePlaceholder')} />
          <div className={styles.textInputWrap}>
            <input className={styles.input} value={text} onChange={e => setText(e.target.value)} maxLength={100} placeholder={t('comments.textPlaceholder')} onKeyDown={e => e.key === 'Enter' && submit()} />
            <span className={styles.charCount}>{text.length}/100</span>
          </div>
          <button className={styles.sendBtn} onClick={submit} disabled={loading}>{loading ? t('comments.sending') : t('comments.send')}</button>
        </div>

        <div className={styles.list}>
          {comments.map(c => (
            <div key={c.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.name}>{c.name}</span>
              <span className={styles.time}>{fmt(c.time)} {c.location && <span className={styles.location}>({c.location})</span>}</span>
              </div>
              <p className={styles.text}>{c.text}</p>
              <div className={styles.meta}>
                <button className={`${styles.likeBtn} ${liked.has(c.id)?styles.liked:''}`} onClick={()=>toggleLike(c.id)}>✦ {c.likes}</button>
                {adminOk && <button className={styles.delBtn} onClick={()=>del(c.id)} title="Delete">✕</button>}
              </div>
            </div>
          ))}
          {comments.length===0 && <p className={styles.empty}>{t('comments.empty')}</p>}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button className={styles.pageBtn} onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>‹ {t('comments.prev')}</button>
            {pageNumbers().map((p,i) =>
              p === '...'
                ? <span key={`dot-${i}`} className={styles.pageDot}>…</span>
                : <button key={p} className={`${styles.pageBtn} ${p===page?styles.pageActive:''}`} onClick={()=>setPage(p as number)}>{p}</button>
            )}
            <button className={styles.pageBtn} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>{t('comments.next')} ›</button>
          </div>
        )}

        <div className={styles.adminRow}>
          {!showAdmin ? (
            <button className={styles.adminToggle} onClick={() => setShowAdmin(true)}>
              {t('comments.admin')}
            </button>
          ) : (
            <div className={styles.adminBox}>
              <input
                className={styles.adminInput}
                value={adminPw}
                onChange={e => setAdminPw(e.target.value)}
                placeholder={t('comments.adminPw')}
                type="password"
                disabled={adminOk}
                onKeyDown={e => e.key === 'Enter' && !adminOk && setAdminOk(true)}
              />
              {!adminOk ? (
                <button className={styles.adminUnlock} onClick={() => setAdminOk(true)}>
                  ✓
                </button>
              ) : (
                <span className={styles.adminUnlocked}>解锁</span>
              )}
              <button
                className={styles.adminHide}
                onClick={() => { setShowAdmin(false); setAdminPw(''); setAdminOk(false); }}
              >
                {t('comments.adminClose')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
