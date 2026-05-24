/**
 * Vercel Serverless Function — 留言板 API
 * 部署时需在 Vercel Dashboard → Storage → KV → Create 并绑定到项目
 * 本地开发: Vite 插件 comment-api.ts 接管（用 JSON 文件存储）
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';
import crypto from 'crypto';

interface Comment {
  id: string;
  name: string;
  text: string;
  time: number;
  likes: number;
  location?: string;
}

const KEY = 'fanren:comments';
const PW_HASH = process.env.ADMIN_PW_HASH || '2acc28202c809b54a440442e02b96c837e16eb8b781de6aab241472e79b8f3c6';

function verifyPw(input: string): boolean {
  if (!input || !PW_HASH) return false;
  return crypto.createHash('sha256').update(input).digest('hex') === PW_HASH;
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

async function load(): Promise<Comment[]> {
  try {
    return (await kv.get<Comment[]>(KEY)) || [];
  } catch {
    return [];
  }
}

async function save(comments: Comment[]) {
  await kv.set(KEY, comments);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET — 获取留言列表
  if (req.method === 'GET') {
    const sort = (req.query.sort as string) || 'time';
    const page = parseInt((req.query.page as string) || '1');
    const pageSize = parseInt((req.query.pageSize as string) || '8');

    const comments = await load();
    const sorted = [...comments].sort((a, b) =>
      sort === 'likes' ? b.likes - a.likes : b.time - a.time
    );
    const start = (page - 1) * pageSize;
    const paged = sorted.slice(start, start + pageSize);

    res.json({
      comments: paged,
      total: comments.length,
      totalPages: Math.max(1, Math.ceil(comments.length / pageSize)),
    });
    return;
  }

  // POST — 发送留言
  if (req.method === 'POST') {
    const { text, name, location } = req.body || {};
    const txt = (text || '').trim().slice(0, 100);
    if (!txt) {
      res.status(400).json({ ok: false, error: 'empty' });
      return;
    }
    const comments = await load();
    const newComment: Comment = {
      id: uid(),
      name: (name || '').trim().slice(0, 8),
      text: txt,
      time: Date.now(),
      likes: 0,
      location: (location || '').slice(0, 20),
    };
    comments.push(newComment);
    await save(comments);
    res.json({ ok: true, id: newComment.id });
    return;
  }

  // PATCH — 点赞/取消
  if (req.method === 'PATCH') {
    const id = req.query.id as string;
    const action = req.query.action as string;
    if (id && (action === 'like' || action === 'unlike')) {
      const comments = await load();
      const c = comments.find(x => x.id === id);
      if (c) {
        action === 'like' ? c.likes++ : c.likes = Math.max(0, c.likes - 1);
        await save(comments);
      }
      res.json({ ok: true });
      return;
    }
    res.status(400).json({ ok: false });
    return;
  }

  // DELETE — 管理员删除
  if (req.method === 'DELETE') {
    const id = req.query.id as string;
    const pw = req.query.pw as string;
    if (id && verifyPw(pw || '')) {
      const comments = await load();
      const idx = comments.findIndex(x => x.id === id);
      if (idx !== -1) {
        comments.splice(idx, 1);
        await save(comments);
      }
      res.json({ ok: true });
      return;
    }
    res.status(403).json({ ok: false });
    return;
  }

  res.status(405).json({ ok: false, error: 'method not allowed' });
}
