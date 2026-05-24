import { useState, useEffect, useCallback } from 'react';
import styles from './CommentWall.module.css';

interface Comment {
  id: string; name: string; text: string; time: number; likes: number;
}

const PAGE_SIZE = 8;

export default function CommentWall() {
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
  const [liked, setLiked] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('fanren-liked')||'[]')); } catch { return new Set(); }
  });

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

  // Reset to page 1 when sort changes
  useEffect(() => { setPage(1); }, [sort]);

  const submit = async () => {
    const t = text.trim().slice(0, 100);
    if (!t || loading) return;
    setLoading(true);
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: t, name: name.trim() }),
    });
    const data = await res.json();
    if (data.ok) {
      setText('');
      setName('');
      setPage(1);
    }
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
    if (!adminPw) return;
    await fetch(`/api/comments?id=${id}&pw=${encodeURIComponent(adminPw)}`, { method: 'DELETE' });
    fetchComments();
  };

  const fmt = (ts: number) => {
    const d = new Date(ts);
    const bj = new Date(d.getTime() + d.getTimezoneOffset() * 60000 + 8 * 3600000);
    const y = bj.getFullYear();
    const m = bj.getMonth() + 1;
    const day = bj.getDate();
    const h = String(bj.getHours()).padStart(2, '0');
    const min = String(bj.getMinutes()).padStart(2, '0');
    return `${y}/${m}/${day} ${h}:${min}（北京）`;
  };

  // Generate page numbers for pagination
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
          <h2 className={styles.title}>道友留言</h2>
          <span className={styles.total}>{total} 条留言</span>
          <button className={`${styles.sortBtn} ${sort==='time'?styles.sortActive:''}`} onClick={()=>setSort('time')}>最新</button>
          <button className={`${styles.sortBtn} ${sort==='likes'?styles.sortActive:''}`} onClick={()=>setSort('likes')}>最热</button>
        </div>

        <div className={styles.inputRow}>
          <input className={styles.nameInput} value={name} onChange={e => setName(e.target.value)} maxLength={8} placeholder="道号（可选，8字内）" />
          <div className={styles.textInputWrap}>
            <input className={styles.input} value={text} onChange={e => setText(e.target.value)} maxLength={100} placeholder="留下你的修仙感悟…（最多100字）" onKeyDown={e => e.key === 'Enter' && submit()} />
            <span className={styles.charCount}>{text.length}/100</span>
          </div>
          <button className={styles.sendBtn} onClick={submit} disabled={loading}>{loading ? '发送中…' : '发送传音符'}</button>
        </div>

        <div className={styles.list}>
          {comments.map(c => (
            <div key={c.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.name}>{c.name}</span>
                <span className={styles.time}>{fmt(c.time)}</span>
              </div>
              <p className={styles.text}>{c.text}</p>
              <div className={styles.meta}>
                <button className={`${styles.likeBtn} ${liked.has(c.id)?styles.liked:''}`} onClick={()=>toggleLike(c.id)}>✦ {c.likes}</button>
                {showAdmin && <button className={styles.delBtn} onClick={()=>del(c.id)} title="删除">✕</button>}
              </div>
            </div>
          ))}
          {comments.length===0 && <p className={styles.empty}>暂无留言，留下第一条修仙感悟吧 ✦</p>}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button className={styles.pageBtn} onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>‹ 上一页</button>
            {pageNumbers().map((p,i) =>
              p === '...'
                ? <span key={`dot-${i}`} className={styles.pageDot}>…</span>
                : <button key={p} className={`${styles.pageBtn} ${p===page?styles.pageActive:''}`} onClick={()=>setPage(p as number)}>{p}</button>
            )}
            <button className={styles.pageBtn} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>下一页 ›</button>
          </div>
        )}

        <div className={styles.adminRow}>
          {!showAdmin ? (
            <button className={styles.adminToggle} onClick={()=>setShowAdmin(true)}>🔑 管理</button>
          ) : (
            <div className={styles.adminBox}>
              <input className={styles.adminInput} value={adminPw} onChange={e=>setAdminPw(e.target.value)} placeholder="管理员密码" type="password" />
              <button className={styles.adminHide} onClick={()=>{setShowAdmin(false);setAdminPw('');}}>关闭</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
