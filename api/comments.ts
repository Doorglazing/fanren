/**
 * Vercel Serverless Function — 留言板 API
 * 存储: Vercel Blob（免费2GB）→ 内存
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

interface Comment {
  id: string;
  name: string;
  text: string;
  time: number;
  likes: number;
  location?: string;
}

const BLOB_PATH = 'comments.json';
const PW_HASH = process.env.ADMIN_PW_HASH || '2acc28202c809b54a440442e02b96c837e16eb8b781de6aab241472e79b8f3c6';
let memoryStore: Comment[] = [];

function verifyPw(input: string): boolean {
  if (!input || !PW_HASH) return false;
  return crypto.createHash('sha256').update(input).digest('hex') === PW_HASH;
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

async function load(): Promise<Comment[]> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { list } = await import('@vercel/blob');
      const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 });
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url);
        return await res.json();
      }
    } catch { /* fallthrough */ }
  }
  return memoryStore;
}

async function save(comments: Comment[]) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import('@vercel/blob');
      await put(BLOB_PATH, JSON.stringify(comments), { access: 'public', contentType: 'application/json' });
      return;
    } catch { /* fallthrough */ }
  }
  memoryStore = comments;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const s = (req.query.sort as string) || 'time';
    const p = parseInt((req.query.page as string) || '1');
    const ps = parseInt((req.query.pageSize as string) || '8');
    const comments = await load();
    const sorted = [...comments].sort((a, b) => s === 'likes' ? b.likes - a.likes : b.time - a.time);
    const start = (p - 1) * ps;
    return res.json({ comments: sorted.slice(start, start + ps), total: comments.length, totalPages: Math.max(1, Math.ceil(comments.length / ps)) });
  }

  if (req.method === 'POST') {
    const { text, name, location } = req.body || {};
    const txt = (text || '').trim().slice(0, 100);
    if (!txt) return res.status(400).json({ ok: false, error: 'empty' });
    const comments = await load();
    comments.push({ id: uid(), name: (name || '').trim().slice(0, 8), text: txt, time: Date.now(), likes: 0, location: (location || '').slice(0, 20) });
    await save(comments);
    return res.json({ ok: true, id: comments[comments.length - 1].id });
  }

  if (req.method === 'PATCH') {
    const id = req.query.id as string, action = req.query.action as string;
    if (!id || (action !== 'like' && action !== 'unlike')) return res.status(400).json({ ok: false });
    const comments = await load();
    const c = comments.find(x => x.id === id);
    if (c) { action === 'like' ? c.likes++ : c.likes = Math.max(0, c.likes - 1); await save(comments); }
    return res.json({ ok: true });
  }

  if (req.method === 'DELETE') {
    const id = req.query.id as string, pw = req.query.pw as string;
    if (!id || !verifyPw(pw || '')) return res.status(403).json({ ok: false });
    const comments = await load();
    const idx = comments.findIndex(x => x.id === id);
    if (idx !== -1) { comments.splice(idx, 1); await save(comments); }
    return res.json({ ok: true });
  }

  res.status(405).json({ ok: false, error: 'method not allowed' });
}
