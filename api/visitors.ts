import type { VercelRequest, VercelResponse } from '@vercel/node';

let memory: string[] = [];

async function load(): Promise<string[]> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return memory;
  try {
    const { list } = await import('@vercel/blob');
    const { blobs } = await list({ prefix: 'visitors.json', limit: 1 });
    if (blobs.length === 0) return memory;
    const res = await fetch(blobs[0].url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) { memory = data; return data; }
    }
  } catch {}
  return memory;
}

async function save(data: string[]) {
  memory = data;
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;
  try {
    const { put } = await import('@vercel/blob');
    await put('visitors.json', JSON.stringify(data), { access: 'private' });
  } catch {}
}

function getIP(req: VercelRequest): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
    || req.headers['x-real-ip'] as string
    || req.socket.remoteAddress || '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).end();

  const ip = getIP(req);
  const visitors = await load();
  if (ip && !visitors.includes(ip)) {
    visitors.push(ip);
    await save(visitors);
  }
  res.json({ count: visitors.length });
}
