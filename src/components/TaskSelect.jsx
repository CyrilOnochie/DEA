// TaskSelect — wider card, "Select a task" heading. No hov state.

import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

const TASKS = {
  govuk: { platformName:'GOV.UK', headerBg:'#0b0c0c', accent:'#00703c', taskName:'Apply for Universal Credit', stat:'8.0 million', statCaption:'people were claiming Universal Credit in the UK as of July 2025 — the highest level since the benefit began in 2013', source:'DWP official statistics, reported July 2025' },
  nhs:   { platformName:'NHS App', headerBg:'#003087', accent:'#005EB8', taskName:'Register with a GP', stat:'60.7 million', statCaption:'patients are registered with a GP practice in England — close to the entire population', source:'NHS Digital, comparison with ONS Census 2021' },
}

export default function TaskSelect({ platform, onSelectTask, onBack }) {
  const t = TASKS[platform] || TASKS.govuk

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 24px 40px', backgroundColor:'#0f172a', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #0f172a 95%)', pointerEvents:'none', zIndex:1 }} />

      <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} onClick={onBack}
        style={{ position:'fixed', top:20, left:20, zIndex:30, background:'transparent', border:'1px solid rgba(255,255,255,0.15)', borderRadius:8, padding:'9px 16px', color:'#e5e7eb', fontFamily:F.b, fontSize:'0.9rem', cursor:'pointer' }}>
        ← Back
      </motion.button>

      <div style={{ position:'relative', zIndex:2, maxWidth:600, width:'100%' }}>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
          style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:'#f59e0b', letterSpacing:'0.2em', textTransform:'uppercase', textAlign:'center', marginBottom:12 }}>
          {t.platformName}
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(2rem,5vw,3rem)', color:'#ffffff', letterSpacing:'-0.02em', textAlign:'center', marginBottom:36 }}>
          Select a task
        </motion.h1>

        <motion.div
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.25 }}
          onClick={onSelectTask}
          whileHover={{ y:-6, boxShadow:`0 16px 48px rgba(245,158,11,0.22), 0 0 0 1.5px #f59e0b` }}
          style={{
            background:'#0f172a', borderRadius:20, overflow:'hidden',
            cursor:'pointer', width:'100%',
            boxShadow:'0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07)',
          }}>

          <div style={{ background:t.headerBg, padding:'22px 28px', display:'flex', alignItems:'center', gap:14 }}>
            <svg width="28" height="22" viewBox="0 0 104 80" fill="white"><path d="M52 4 L36 32 L12 18 L18 46 L86 46 L92 18 L68 32 Z"/><rect x="14" y="50" width="76" height="10" rx="2"/><rect x="10" y="64" width="84" height="16" rx="3"/></svg>
            <p style={{ fontFamily:F.d, fontWeight:800, fontSize:'1.05rem', color:'#ffffff', margin:0 }}>{t.platformName}</p>
          </div>

          <div style={{ padding:'clamp(22px,4vw,32px)' }}>
            <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.4rem,3.5vw,2rem)', color:'#ffffff', margin:'0 0 20px', lineHeight:1.2 }}>{t.taskName}</p>
            <div style={{ borderRadius:14, border:`1px solid ${t.accent}44`, background:`${t.accent}0e`, padding:'18px 20px', marginBottom:20 }}>
              <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.8rem,4vw,2.4rem)', color:t.accent, margin:'0 0 6px', lineHeight:1 }}>{t.stat}</p>
              <p style={{ fontFamily:F.b, fontSize:'0.88rem', color:'#d1d5db', margin:'0 0 6px', lineHeight:1.55 }}>{t.statCaption}</p>
              <p style={{ fontFamily:F.b, fontSize:'0.72rem', color:'#6b7280', margin:0, fontStyle:'italic' }}>{t.source}</p>
            </div>
            <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.88rem', letterSpacing:'0.06em', textTransform:'uppercase', color:'#4b5563' }}>
              Begin audit →
            </p>
          </div>
        </motion.div>
      </div>

      <p style={{ position:'fixed', bottom:14, left:0, right:0, textAlign:'center', fontFamily:F.b, fontSize:'0.65rem', color:'#1e2a45', letterSpacing:'0.16em', textTransform:'uppercase', pointerEvents:'none', zIndex:20 }}>
        MA Creative Technology · University of Salford · 2026
      </p>
    </div>
  )
}
