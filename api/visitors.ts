/**
 * Vercel Serverless Function — 访问统计
 * 每个 IP 只计一次，从 0 开始
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

const BLOB_PATH = 'visitors.json';
let memory: string[] = [];

async function load(): Promise<string[]> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { head } = await import('@vercel/blob');
      const blob = await head(BLOB_PATH);
      if (blob) {
        const res = await fetch(blob.url);
        if (res.ok) { memory = await res.json(); return memory; }
      }
    } catch {}
  }
  return memory;
}

async function save(data: string[]) {
  memory = data;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import('@vercel/blob');
      await put(BLOB_PATH, JSON.stringify(data), { access: 'private', allowOverwrite: true });
    } catch {}
  }
}

function getIP(req: VercelRequest): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
    || req.headers['x-real-ip'] as string
    || req.socket.remoteAddress
    || '';
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
