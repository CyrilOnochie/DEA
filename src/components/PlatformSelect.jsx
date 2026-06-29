// PlatformSelect.jsx — expanded grid showing scale of the tool.
// GOV.UK is live. NHS App is partial. Others show "Audit database in development."

import { useState } from 'react'
import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

const PLATFORMS = [
  { key:'govuk', name:'GOV.UK', headerBg:'#0b0c0c', accent:'#00703c', task:'Apply for Universal Credit', status:'live', description:'Benefits, welfare, and public services' },
  { key:'nhs',   name:'NHS App', headerBg:'#003087', accent:'#005EB8', task:'Register with a GP', status:'partial', description:'Health services and managing care' },
  { key:'hmrc',  name:'HMRC', headerBg:'#1a1a2e', accent:'#7c3aed', task:'File Self Assessment', status:'soon', description:'Tax, self-assessment, and PAYE' },
  { key:'dwp',   name:'DWP', headerBg:'#1e1b4b', accent:'#6366f1', task:'Report a change in circumstances', status:'soon', description:'Department for Work and Pensions services' },
  { key:'bluebadge', name:'Blue Badge', headerBg:'#172554', accent:'#3b82f6', task:'Apply for a Blue Badge', status:'soon', description:'Disability parking permit application' },
  { key:'housing', name:'Local Authority Housing', headerBg:'#1c1917', accent:'#78716c', task:'Apply for social housing', status:'soon', description:'Council housing and housing register' },
]

function StatusBadge({ status }) {
  if (status === 'live') return <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 9px', background:'rgba(74,222,128,0.12)', border:'1px solid rgba(74,222,128,0.3)', borderRadius:9999 }}>
    <div style={{ width:5, height:5, borderRadius:'50%', background:'#4ade80' }} />
    <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:'0.68rem', color:'#4ade80', letterSpacing:'0.08em', textTransform:'uppercase' }}>Live</span>
  </div>
  if (status === 'partial') return <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 9px', background:'rgba(96,165,250,0.12)', border:'1px solid rgba(96,165,250,0.3)', borderRadius:9999 }}>
    <div style={{ width:5, height:5, borderRadius:'50%', background:'#60a5fa' }} />
    <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:'0.68rem', color:'#60a5fa', letterSpacing:'0.08em', textTransform:'uppercase' }}>1 task</span>
  </div>
  return <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 9px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:9999 }}>
    <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:600, fontSize:'0.68rem', color:'#6b7280', letterSpacing:'0.08em', textTransform:'uppercase' }}>Audit database in development</span>
  </div>
}

export default function PlatformSelect({ onSelect, onBack }) {
  const [hov, setHov] = useState(null)
  const clickable = p => p.status === 'live' || p.status === 'partial'

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 24px 40px', backgroundColor:'#0f172a', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #0f172a 95%)', pointerEvents:'none', zIndex:1 }} />

      <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} onClick={onBack}
        style={{ position:'fixed', top:20, left:20, zIndex:30, background:'transparent', border:'1px solid rgba(255,255,255,0.15)', borderRadius:8, padding:'9px 16px', color:'#e5e7eb', fontFamily:F.b, fontSize:'0.9rem', cursor:'pointer' }}>
        ← Back
      </motion.button>

      <div style={{ position:'relative', zIndex:2, maxWidth:1000, width:'100%' }}>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
          style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:'#f59e0b', letterSpacing:'0.2em', textTransform:'uppercase', textAlign:'center', marginBottom:12 }}>
          Existing platform audit
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.8rem,4.5vw,3rem)', color:'#ffffff', letterSpacing:'-0.02em', textAlign:'center', marginBottom:8 }}>
          Choose a platform to audit.
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          style={{ fontFamily:F.b, fontSize:'1rem', color:'#6b7280', textAlign:'center', marginBottom:40 }}>
          Live audits are available now. More platforms are in development.
        </motion.p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'clamp(12px,2.5vw,20px)' }}>
          {PLATFORMS.map((p, i) => (
            <motion.div key={p.key}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 + i * 0.07 }}
              onClick={() => clickable(p) && onSelect(p.key)}
              onHoverStart={() => clickable(p) && setHov(p.key)}
              onHoverEnd={() => setHov(null)}
              animate={{ y: hov===p.key ? -5 : 0, boxShadow: hov===p.key ? `0 12px 36px rgba(245,158,11,0.18), 0 0 0 1.5px #f59e0b` : '0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)' }}
              transition={{ duration:0.2 }}
              style={{ background:'#0f172a', borderRadius:16, overflow:'hidden', cursor: clickable(p) ? 'pointer' : 'default', opacity: clickable(p) ? 1 : 0.55 }}>
              <div style={{ background:p.headerBg, padding:'18px 20px 14px', display:'flex', flexDirection:'column', gap:8 }}>
                <StatusBadge status={p.status} />
                <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.2rem,2.5vw,1.5rem)', color:'#ffffff', margin:0 }}>{p.name}</p>
              </div>
              <div style={{ padding:'14px 20px 18px' }}>
                <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 9px', background:`${p.accent}18`, border:`1px solid ${p.accent}40`, borderRadius:9999, marginBottom:8 }}>
                  <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.72rem', color:p.accent }}>{p.task}</span>
                </div>
                <p style={{ fontFamily:F.b, fontSize:'0.85rem', color:'#6b7280', lineHeight:1.55, margin:'0 0 12px' }}>{p.description}</p>
                {clickable(p) && (
                  <motion.p animate={{ color: hov===p.key ? '#f59e0b' : '#374151' }}
                    style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.06em', textTransform:'uppercase' }}>
                    Enter →
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <p style={{ position:'fixed', bottom:14, left:0, right:0, textAlign:'center', fontFamily:F.b, fontSize:'0.65rem', color:'#1e2a45', letterSpacing:'0.16em', textTransform:'uppercase', pointerEvents:'none', zIndex:20 }}>
        MA Creative Technology · University of Salford · 2026
      </p>
    </div>
  )
}
