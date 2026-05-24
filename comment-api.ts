import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

function loadEnv() {
  const envPath = path.resolve('.env');
  const result: Record<string, string> = {};
  try {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        result[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
      }
    }
  } catch {}
  return result;
}

const env = loadEnv();

function verifyPw(input: string): boolean {
  const hash = env.ADMIN_PW_HASH || process.env.ADMIN_PW_HASH || '';
  if (!hash || !input) return false;
  return crypto.createHash('sha256').update(input).digest('hex') === hash;
}

interface Comment {
  id: string;
  name: string;
  text: string;
  time: number;
  likes: number;
  location?: string;
}

const DATA_FILE = path.resolve('comments-data.json');

function load(): Comment[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch {}
  return [];
}

function save(comments: Comment[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(comments, null, 2), 'utf-8');
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function commentApi(): Plugin {
  return {
    name: 'comment-api',
    configureServer(server) {
      // GET /api/comments?sort=time|likes&page=1&pageSize=8
      server.middlewares.use('/api/comments', (req, res, next) => {
        if (req.method === 'GET') {
          const url = new URL(req.url!, `http://${req.headers.host}`);
          const sort = url.searchParams.get('sort') || 'time';
          const page = parseInt(url.searchParams.get('page') || '1');
          const pageSize = parseInt(url.searchParams.get('pageSize') || '8');
          const id = url.searchParams.get('id');
          const action = url.searchParams.get('action');

          // If id is present but no action, just next
          if (id && !action) {
            next();
            return;
          }

          const comments = load();
          const sorted = [...comments].sort((a, b) =>
            sort === 'likes' ? b.likes - a.likes : b.time - a.time
          );
          const start = (page - 1) * pageSize;
          const paged = sorted.slice(start, start + pageSize);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            comments: paged,
            total: comments.length,
            totalPages: Math.max(1, Math.ceil(comments.length / pageSize)),
          }));
          return;
        }

        next();
      });

      // PATCH /api/comments?id=xxx&action=like|unlike
      server.middlewares.use('/api/comments', (req, res, next) => {
        if (req.method === 'PATCH') {
          const url = new URL(req.url!, `http://${req.headers.host}`);
          const id = url.searchParams.get('id');
          const action = url.searchParams.get('action');

          if (id && (action === 'like' || action === 'unlike')) {
            const comments = load();
            const c = comments.find(x => x.id === id);
            if (c) {
              action === 'like' ? c.likes++ : c.likes = Math.max(0, c.likes - 1);
              save(comments);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
            return;
          }
        }
        next();
      });

      // DELETE /api/comments?id=xxx&pw=adminPassword
      server.middlewares.use('/api/comments', (req, res, next) => {
        if (req.method === 'DELETE') {
          const url = new URL(req.url!, `http://${req.headers.host}`);
          const id = url.searchParams.get('id');
          const pw = url.searchParams.get('pw');

          if (id && verifyPw(pw || '')) {
            const comments = load();
            const idx = comments.findIndex(x => x.id === id);
            if (idx !== -1) {
              comments.splice(idx, 1);
              save(comments);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
            return;
          }
        }
        next();
      });

      // POST /api/comments
      server.middlewares.use('/api/comments', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const { text, name, location } = JSON.parse(body);
              const txt = (text || '').trim().slice(0, 100);
              if (!txt) {
                res.statusCode = 400;
                res.end(JSON.stringify({ ok: false, error: 'empty' }));
                return;
              }
              const comments = load();
              const newComment: Comment = {
                id: uid(),
                name: (name || '').trim().slice(0, 8),
                text: txt,
                time: Date.now(),
                likes: 0,
                location: (location || '').slice(0, 20),
              };
              comments.push(newComment);
              save(comments);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, id: newComment.id }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ ok: false, error: 'invalid' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}
