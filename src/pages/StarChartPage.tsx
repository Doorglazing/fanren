import { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Billboard, Text } from '@react-three/drei';
import * as THREE from 'three';
import { characters } from '../data/characters';
import type { Character } from '../types';
import styles from './StarChartPage.module.css';

// ─── Procedural planet texture generator ───
function generatePlanetTexture(
  baseColor: string,
  accentColor: string,
  type: 'star' | 'gas' | 'rocky' | 'ice' | 'lava' | 'earthlike' | 'moon',
  size: number = 512
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext('2d')!;

  // Base fill
  const baseGrad = ctx.createLinearGradient(0, 0, 0, size / 2);
  baseGrad.addColorStop(0, baseColor);
  baseGrad.addColorStop(0.5, accentColor);
  baseGrad.addColorStop(1, baseColor);
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, size, size / 2);

  // Add noise/features based on type
  if (type === 'star') {
    for (let i = 0; i < size * 20; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size / 2;
      const r = Math.random() * 8 + 1;
      ctx.fillStyle = `rgba(255,255,200,${Math.random() * 0.3})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'gas') {
    for (let y = 0; y < size / 2; y += 4) {
      const alpha = 0.05 + Math.random() * 0.15;
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '200,180,160' : '160,140,120'},${alpha})`;
      ctx.fillRect(0, y, size, 3 + Math.random() * 6);
    }
    for (let i = 0; i < 5; i++) {
      const sx = Math.random() * size;
      const sy = Math.random() * size / 2;
      ctx.fillStyle = 'rgba(180,140,100,0.3)';
      ctx.beginPath();
      ctx.ellipse(sx, sy, 20 + Math.random() * 40, 8 + Math.random() * 15, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'rocky') {
    for (let i = 0; i < 80; i++) {
      const cx = Math.random() * size;
      const cy = Math.random() * size / 2;
      const r = 2 + Math.random() * 12;
      ctx.fillStyle = `rgba(0,0,0,${0.05 + Math.random() * 0.15})`;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.2})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  } else if (type === 'ice') {
    for (let i = 0; i < 50; i++) {
      const sx = Math.random() * size;
      const sy = Math.random() * size / 2;
      ctx.strokeStyle = `rgba(200,220,255,${Math.random() * 0.4})`;
      ctx.lineWidth = 0.5 + Math.random() * 1.5;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + (Math.random() - 0.5) * 60, sy + (Math.random() - 0.5) * 40);
      ctx.stroke();
    }
  } else if (type === 'lava') {
    ctx.fillStyle = 'rgba(40,10,5,0.6)';
    ctx.fillRect(0, 0, size, size / 2);
    for (let i = 0; i < 40; i++) {
      const sx = Math.random() * size;
      const sy = Math.random() * size / 2;
      ctx.strokeStyle = `rgba(255,${80 + Math.random() * 100},20,${0.3 + Math.random() * 0.5})`;
      ctx.lineWidth = 1 + Math.random() * 3;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      for (let j = 0; j < 3; j++) {
        ctx.lineTo(sx + (Math.random() - 0.5) * 80, sy + (Math.random() - 0.5) * 50);
      }
      ctx.stroke();
    }
  } else { // earthlike
    for (let i = 0; i < 15; i++) {
      const cx = Math.random() * size;
      const cy = Math.random() * size / 2;
      ctx.fillStyle = `rgba(${80 + Math.random() * 60},${120 + Math.random() * 60},${60 + Math.random() * 40},0.3)`;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 30 + Math.random() * 60, 20 + Math.random() * 40, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Add atmosphere edge glow at poles
  const poleGrad = ctx.createLinearGradient(0, 0, 0, size / 2);
  poleGrad.addColorStop(0, 'rgba(200,220,255,0.25)');
  poleGrad.addColorStop(0.1, 'rgba(200,220,255,0.05)');
  poleGrad.addColorStop(0.9, 'rgba(200,220,255,0.05)');
  poleGrad.addColorStop(1, 'rgba(200,220,255,0.25)');
  ctx.fillStyle = poleGrad;
  ctx.fillRect(0, 0, size, size / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

// ─── Planet type & colors per character ───
interface PlanetConfig { type: 'star'|'gas'|'rocky'|'ice'|'lava'|'earthlike'|'moon'; base: string; accent: string; size: number; orbitRadius: number }
function getPlanet(c: Character): PlanetConfig {
  if (c.id === 'han-li') return { type:'star', base:'#c49030', accent:'#e8c840', size:2.2, orbitRadius:0 };
  if (c.id === 'nangong-wan') return { type:'ice', base:'#dde0f0', accent:'#f0e8ff', size:1.4, orbitRadius:0 };
  if (c.id === 'yin-yue') return { type:'ice', base:'#7788aa', accent:'#99aacc', size:1.2, orbitRadius:0 };
  if (c.id === 'zi-ling') return { type:'earthlike', base:'#886688', accent:'#aa88aa', size:1.1, orbitRadius:0 };
  if (c.id === 'xin-ruyin') return { type:'moon', base:'#aabbcc', accent:'#ccddff', size:0.8, orbitRadius:0 };
  if (c.id === 'mei-ning') return { type:'moon', base:'#ccbbbb', accent:'#eedddd', size:0.75, orbitRadius:0 };
  if (c.id === 'yuan-yao') return { type:'earthlike', base:'#998877', accent:'#bbaa99', size:0.85, orbitRadius:0 };
  if (c.id === 'song-yu') return { type:'earthlike', base:'#8899aa', accent:'#aabbcc', size:0.8, orbitRadius:0 };
  if (c.id === 'mu-peiling') return { type:'earthlike', base:'#998888', accent:'#bbaaaa', size:0.8, orbitRadius:0 };
  if (c.id === 'chen-qiaoqian') return { type:'moon', base:'#aabb99', accent:'#ccddaa', size:0.75, orbitRadius:0 };
  if (c.id === 'mo-caihuan') return { type:'moon', base:'#ccbbaa', accent:'#eeddcc', size:0.65, orbitRadius:0 };
  if (c.id === 'li-feyu') return { type:'moon', base:'#99aa88', accent:'#bbccaa', size:0.7, orbitRadius:0 };
  if (c.id === 'mo-daifu') return { type:'lava', base:'#3a2010', accent:'#5a3020', size:0.7, orbitRadius:0 };
  if (c.id === 'wang-chan') return { type:'lava', base:'#3a1010', accent:'#6a2020', size:1.0, orbitRadius:0 };
  // Tag-based mappings
  if (c.tags.includes('魔道六宗')) return { type:'lava', base:'#3a1010', accent:'#6a2020', size:0.9, orbitRadius:0 };
  if (c.tags.includes('七玄门')) return { type:'moon', base:'#889988', accent:'#aabbaa', size:0.6, orbitRadius:0 };
  if (c.tags.includes('越国七派')) return { type:'earthlike', base:'#889966', accent:'#aabb77', size:0.85, orbitRadius:0 };
  if (c.tags.includes('乱星海')) return { type:'gas', base:'#556688', accent:'#7788aa', size:0.9, orbitRadius:0 };
  if (c.tags.includes('早期人脉')) return { type:'moon', base:'#aaccaa', accent:'#ccddcc', size:0.75, orbitRadius:0 };
  if (c.tags.includes('落云宗')) return { type:'earthlike', base:'#668866', accent:'#88aa88', size:0.85, orbitRadius:0 };
  if (c.tags.includes('大晋')) return { type:'rocky', base:'#887766', accent:'#aa9977', size:0.85, orbitRadius:0 };
  if (c.tags.includes('天澜草原')) return { type:'earthlike', base:'#aa9977', accent:'#ccbb99', size:0.8, orbitRadius:0 };
  if (c.tags.includes('主角阵营')) return { type:'earthlike', base:'#aa8866', accent:'#ccaa88', size:0.95, orbitRadius:0 };
  return { type:'rocky', base:'#889999', accent:'#aabbbb', size:0.75, orbitRadius:0 };
}

// ─── Texture cache ───
const texCache = new Map<string, THREE.CanvasTexture>();
function getTexture(p: PlanetConfig): THREE.CanvasTexture {
  const key = `${p.type}-${p.base}-${p.accent}`;
  if (!texCache.has(key)) texCache.set(key, generatePlanetTexture(p.base, p.accent, p.type));
  return texCache.get(key)!;
}

// ─── Background stars ───
function StarField() {
  const geo = useMemo(() => { const g = new THREE.BufferGeometry(); const p = new Float32Array(1200*3); for(let i=0;i<3600;i++)p[i]=(Math.random()-0.5)*70; g.setAttribute('position',new THREE.BufferAttribute(p,3)); return g; },[]);
  return <points geometry={geo}><pointsMaterial size={0.03} color="#8899bb" transparent opacity={0.6}/></points>;
}

// ─── Han Li - central sun ───
function HanLiStar() {
  const cfg = getPlanet(characters.find(c=>c.id==='han-li')!);
  const tex = getTexture(cfg);
  const mesh = useRef<THREE.Mesh>(null);
  const aura = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if(mesh.current) mesh.current.rotation.y += 0.002;
    if(aura.current) { aura.current.rotation.y += 0.001; aura.current.scale.setScalar(1 + Math.sin(Date.now()*0.001)*0.03); }
  });
  return (
    <group>
      <mesh ref={mesh}>
        <sphereGeometry args={[cfg.size, 64, 64]} />
        <meshStandardMaterial map={tex} emissive="#e8c840" emissiveIntensity={0.6} emissiveMap={tex} roughness={0.3} />
      </mesh>
      <mesh ref={aura}>
        <sphereGeometry args={[cfg.size*1.35, 32, 32]} />
        <meshBasicMaterial color="#e8d48b" transparent opacity={0.06} />
      </mesh>
      <Billboard position={[0, cfg.size+0.8, 0]}>
        <Text fontSize={0.65} color="#e8d48b" anchorX="center" anchorY="middle" outlineWidth={0.04} outlineColor="#000">韩立</Text>
      </Billboard>
    </group>
  );
}

// ─── Orbiting character planet ───
function CharPlanet({ char, angle, radius, yOff, onClick }: { char:Character; angle:number; radius:number; yOff:number; onClick:()=>void }) {
  const cfg = getPlanet(char);
  const tex = getTexture(cfg);
  const mesh = useRef<THREE.Mesh>(null);
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  useFrame(() => { if(mesh.current) mesh.current.rotation.y += 0.003; });
  return (
    <group position={[x, yOff, z]} onClick={(e)=>{e.stopPropagation();onClick();}}>
      <mesh ref={mesh}>
        <sphereGeometry args={[cfg.size, 48, 48]} />
        <meshStandardMaterial map={tex} roughness={0.5} metalness={0.1} />
      </mesh>
      <Billboard position={[0, cfg.size+0.45, 0]}>
        <Text fontSize={0.28} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.03} outlineColor="#000000">{char.name}</Text>
      </Billboard>
    </group>
  );
}

// ─── Orbiting ring particles ───
function OrbitRing({ radius, color }: { radius:number; color:string }) {
  const pts = useMemo(() => { const a=new Float32Array(200*3); for(let i=0;i<200;i++){ const ang=(i/200)*Math.PI*2; a[i*3]=Math.cos(ang)*radius; a[i*3+1]=0; a[i*3+2]=Math.sin(ang)*radius; } return a; }, [radius]);
  return <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[pts,3]}/></bufferGeometry><pointsMaterial size={0.04} color={color} transparent opacity={0.2}/></points>;
}

// ─── Scene ───
function Scene({ onSelect }: { onSelect:(c:Character)=>void }) {
  const others = characters.filter(c=>c.id!=='han-li');

  const ringMap: Record<string, { radius: number; yBase: number; spread: number }> = {
    '主角阵营':      { radius: 5.5, yBase: 0.5, spread: 1.2 },
    '早期人脉':      { radius: 8,   yBase: -0.3, spread: 1.5 },
    '越国七派':      { radius: 10.5, yBase: 0.8, spread: 1.8 },
    '魔道六宗':      { radius: 13,  yBase: -1, spread: 2 },
    '落云宗':        { radius: 15.5, yBase: 0.5, spread: 2.2 },
    '乱星海':        { radius: 18.5, yBase: -0.5, spread: 2.5 },
    '大晋':          { radius: 22,  yBase: 1, spread: 3 },
    '天澜草原':      { radius: 25,  yBase: -0.8, spread: 1.5 },
  };

  const groups: Record<string, Character[]> = {};
  for (const c of others) {
    const tag = c.tags[0] || 'other';
    if (!groups[tag]) groups[tag] = [];
    groups[tag].push(c);
  }
  for (const c of others.filter(c=>!Object.keys(ringMap).includes(c.tags[0]||''))) {
    if (!groups['other']) groups['other'] = [];
    groups['other'].push(c);
  }

  return (
    <>
      <OrbitControls enableDamping dampingFactor={0.08} minDistance={5} maxDistance={40} target={[0,0,0]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0,10,0]} intensity={4} color="#c4a84b" />
      <pointLight position={[12,-3,6]} intensity={1.2} color="#4466aa" />
      <pointLight position={[-10,2,-8]} intensity={0.8} color="#664455" />
      <StarField />
      <HanLiStar />
      <OrbitRing radius={10} color="#c4a84b" />
      <OrbitRing radius={16} color="#4466aa" />
      <OrbitRing radius={22} color="#88aacc" />
      {Object.entries(groups).map(([tag, chars]) => {
        const cfg = ringMap[tag] || { radius: 28, yBase: 0, spread: 3 };
        return chars.map((c, i) => {
          const angle = (i / chars.length) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
          const radius = cfg.radius + (Math.random() - 0.5) * cfg.spread;
          const yOff = cfg.yBase + (Math.random() - 0.5) * cfg.spread;
          return <CharPlanet key={c.id} char={c} angle={angle} radius={radius} yOff={yOff} onClick={()=>onSelect(c)}/>;
        });
      })}
    </>
  );
}

// ─── Page ───
export default function StarChartPage() {
  const [selected,setSelected]=useState<Character|null>(null);
  return (
    <div className={styles.page}>
      <Canvas className={styles.canvas} camera={{position:[0,6,20],fov:48}} gl={{antialias:true, alpha:true}}>
        <Suspense fallback={null}><Scene onSelect={setSelected}/></Suspense>
      </Canvas>
      {selected&&(
        <div className={styles.detailPanel}>
          <button className={styles.closeBtn} onClick={()=>setSelected(null)}>×</button>
          <h2 className={styles.detailName}>{selected.name}</h2>
          <p className={styles.detailAff}>{selected.affiliation}</p>
          <div className={styles.detailDivider}/>
          <p className={styles.detailDesc}>{selected.description}</p>
          <div className={styles.detailSection}><strong>结局</strong><p>{selected.ending}</p></div>
          {selected.relations.length>0&&<div className={styles.detailSection}><strong>关系</strong>{selected.relations.map(r=><p key={r.targetId} className={styles.relItem}>{r.targetName} · {r.relation}</p>)}</div>}
        </div>
      )}
      <div className={styles.hint}>拖拽旋转 · 滚轮缩放 · 点击星辰查看详情</div>
    </div>
  );
}
