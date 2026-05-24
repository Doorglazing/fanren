import { useEffect, useRef, useCallback, useState } from 'react';
import { useI18n } from '../../i18n';
import { timelineEvents } from '../../data/timeline';
import { EVENT_TYPE_COLORS } from '../../utils/constants';
import type { TimelineEvent } from '../../types';

const W = 3600;
const H = 1800;
const PAD_X = 140;
const PAD_Y = 160;

const FONT_DISPLAY = '"Noto Serif SC", "Noto Serif", "SimSun", "STSong", serif';
const FONT_SANS = '"Noto Sans SC", "Noto Sans", "Microsoft YaHei", sans-serif';

function pos(e: TimelineEvent) {
  return {
    x: PAD_X + (e.positionPercent.x / 100) * (W - PAD_X * 2),
    y: PAD_Y + (e.positionPercent.y / 100) * (H - PAD_Y * 2),
  };
}

function catmullRomPoints(pts: { x: number; y: number }[], segments = 30): { x: number; y: number }[] {
  if (pts.length < 2) return pts;
  const result: { x: number; y: number }[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? 0 : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 >= pts.length ? pts.length - 1 : i + 2];
    for (let t = 0; t < segments; t++) {
      const tt = t / segments;
      const tt2 = tt * tt;
      const tt3 = tt2 * tt;
      const x = 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * tt + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * tt2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * tt3);
      const y = 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * tt + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * tt2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * tt3);
      result.push({ x, y });
    }
  }
  result.push(pts[pts.length - 1]);
  return result;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (!text) return [];
  const words = text.split('');
  const lines: string[] = [];
  let line = '';
  for (const char of words) {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line.length > 0) {
      lines.push(line);
      line = char;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function wrapTextEn(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (!text) return [];
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && line.length > 0) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export default function TimelineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t, lang } = useI18n();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fonts = [`${FONT_DISPLAY}`, `${FONT_SANS}`];
    document.fonts.load(`bold 52px ${fonts.join(',')}`).then(() => setReady(true)).catch(() => setReady(true));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = W;
    canvas.height = H;

    // ─── Background ───
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#080a12');
    bgGrad.addColorStop(0.3, '#0c0e1a');
    bgGrad.addColorStop(0.7, '#0e1020');
    bgGrad.addColorStop(1, '#080a12');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle noise texture dots
    ctx.save();
    ctx.globalAlpha = 0.015;
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, y, 1, 1);
    }
    ctx.restore();

    // Grid
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.015)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 120) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 120) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.restore();

    const sorted = [...timelineEvents].sort((a, b) => a.sortOrder - b.sortOrder);
    const pts = sorted.map(e => pos(e));
    const smoothPts = catmullRomPoints(pts, 40);

    // ─── Draw path ───
    const drawSmoothPath = (color: string | CanvasGradient, width: number, alpha: number, blur = 0) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      if (blur > 0) { ctx.shadowColor = typeof color === 'string' ? color : '#c4a84b'; ctx.shadowBlur = blur; }
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(smoothPts[0].x, smoothPts[0].y);
      for (let i = 1; i < smoothPts.length; i++) {
        ctx.lineTo(smoothPts[i].x, smoothPts[i].y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const pGrad = ctx.createLinearGradient(0, PAD_Y, 0, H - PAD_Y);
    pGrad.addColorStop(0, '#5b8c5a');
    pGrad.addColorStop(0.3, '#7aad6a');
    pGrad.addColorStop(0.5, '#c4a84b');
    pGrad.addColorStop(0.7, '#c03b3b');
    pGrad.addColorStop(1, '#e8d48b');

    drawSmoothPath(pGrad, 50, 0.05, 80);
    drawSmoothPath(pGrad, 24, 0.12, 40);
    drawSmoothPath(pGrad, 8, 0.35, 15);
    drawSmoothPath(pGrad, 3, 0.7, 4);
    drawSmoothPath('#ffffff', 1, 0.25, 0);

    // ─── Title ───
    const mainTitle = lang === 'en' ? "A Mortal's Journey" : '凡人修仙传';
    const subTitle = lang === 'en' ? 'Timeline · Human Realm' : '时间线 · 人界篇';

    ctx.save();
    ctx.font = `bold 64px ${FONT_DISPLAY}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#e8d48b';
    ctx.shadowColor = '#c4a84b';
    ctx.shadowBlur = 30;
    ctx.fillText(mainTitle, W / 2, 55);
    ctx.restore();

    ctx.save();
    ctx.font = `24px ${FONT_SANS}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(232,212,139,0.5)';
    ctx.letterSpacing = '4px';
    ctx.fillText(subTitle, W / 2, 100);
    ctx.restore();

    // ─── Draw events ───
    sorted.forEach((e, idx) => {
      const p = pos(e);
      const color = EVENT_TYPE_COLORS[e.type] || '#666';
      const evTitle = lang === 'en' && e.titleEn ? e.titleEn : e.title;
      const timeLabel = lang === 'en' && e.timeLabelEn ? e.timeLabelEn : e.timeLabel;
      const chapterLabel = lang === 'en' && e.chapterEn ? e.chapterEn : e.chapter;
      const typeLabel = t(`etype.${e.type}`);
      const right = idx % 2 === 0;
      const lineLen = 40;
      const gap = 16;
      const lineX = right ? p.x + lineLen : p.x - lineLen;
      const textX = right ? lineX + gap : lineX - gap;
      const anchor: CanvasTextAlign = right ? 'left' : 'right';

      // ── Node glow ──
      ctx.save();
      ctx.globalAlpha = 0.12;
      const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 40);
      glowGrad.addColorStop(0, color);
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(p.x - 40, p.y - 40, 80, 80);
      ctx.restore();

      // ── Node ring ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // ── Node core ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      // ── Connecting line ──
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(p.x + (right ? 10 : -10), p.y);
      ctx.lineTo(lineX, p.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // ── Sort order badge ──
      const orderX = right ? lineX - 6 : lineX + 6;
      ctx.save();
      ctx.beginPath();
      ctx.arc(orderX, p.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.15;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.font = `bold 12px ${FONT_SANS}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      ctx.fillText(String(idx + 1), orderX, p.y);
      ctx.restore();

      // ── Event title ──
      ctx.save();
      ctx.font = `bold 30px ${FONT_DISPLAY}`;
      ctx.textAlign = anchor;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.9)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      const titleLines = lang === 'en' ? wrapTextEn(ctx, evTitle, 420) : wrapText(ctx, evTitle, 420);
      titleLines.forEach((line, li) => {
        ctx.fillText(line, textX, p.y - 20 + li * 38);
      });
      ctx.restore();

      // ── Time & Chapter ──
      const afterTitleY = p.y - 20 + titleLines.length * 38 + 8;
      ctx.save();
      ctx.font = `18px ${FONT_SANS}`;
      ctx.textAlign = anchor;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.shadowColor = 'rgba(0,0,0,0.7)';
      ctx.shadowBlur = 3;
      ctx.fillText(`${timeLabel}  ·  ${chapterLabel}`, textX, afterTitleY);
      ctx.restore();

      // ── Type badge ──
      const badgeY = afterTitleY + 28;
      ctx.save();
      ctx.font = `bold 15px ${FONT_SANS}`;
      const tm = ctx.measureText(typeLabel);
      const bw = tm.width + 20;
      const bh = 26;
      const bx = anchor === 'left' ? textX : textX - bw;
      // Badge bg
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.roundRect(bx, badgeY - bh / 2, bw, bh, 4);
      ctx.fill();
      // Badge border
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
      // Badge text
      ctx.globalAlpha = 0.9;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 2;
      ctx.fillText(typeLabel, bx + 10, badgeY);
      ctx.restore();
    });

    // ─── Start marker ───
    const sp = pos(sorted[0]);
    ctx.save();
    ctx.beginPath();
    ctx.arc(sp.x, sp.y, 18, 0, Math.PI * 2);
    ctx.strokeStyle = '#5b8c5a';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    ctx.save();
    ctx.font = `bold 22px ${FONT_DISPLAY}`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#5b8c5a';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText(t('timeline.start'), sp.x - 28, sp.y);
    ctx.restore();

    // ─── End marker ───
    const ep = pos(sorted[sorted.length - 1]);
    ctx.save();
    ctx.beginPath();
    ctx.arc(ep.x, ep.y, 18, 0, Math.PI * 2);
    ctx.strokeStyle = '#e8d48b';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.arc(ep.x, ep.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#e8d48b';
    ctx.shadowColor = '#e8d48b';
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.font = `bold 26px ${FONT_DISPLAY}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#e8d48b';
    ctx.shadowColor = '#e8d48b';
    ctx.shadowBlur = 10;
    ctx.fillText(t('timeline.end'), ep.x + 30, ep.y);
    ctx.restore();

    // ─── Watermark ───
    ctx.save();
    ctx.font = `15px ${FONT_SANS}`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillText(
      lang === 'en' ? "A Mortal's Journey · Fan Site" : '凡人修仙传 · 粉丝站',
      W - 40, H - 30
    );
    ctx.restore();

  }, [t, lang]);

  useEffect(() => {
    if (ready) draw();
  }, [draw, ready]);

  if (!ready) return null;

  return (
    <div style={{
      width: '100%',
      height: 'calc(100vh - 50px)',
      overflowX: 'auto',
      overflowY: 'hidden',
      position: 'relative',
      zIndex: 1,
    }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          height: '100%',
          width: 'auto',
          maxWidth: 'none',
        }}
      />
    </div>
  );
}
