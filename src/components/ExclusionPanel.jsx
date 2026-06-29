// ExclusionPanel.jsx — added step identifier banner at top (light mode improvement).
// After Include clicked: shows confirmed state + Proceed to next step.

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CHARACTERS } from '../data/characters'
const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

const FS = {
  hard:       { border:'#ef4444', bg:'rgba(239,68,68,0.08)',   label:'HARD STOP',         sub:'this ends the journey here' },
  soft:       { border:'#f59e0b', bg:'rgba(245,158,11,0.08)',  label:'FRICTION',           sub:'slows them down, may cause drop-off' },
  workaround: { border:'#60a5fa', bg:'rgba(96,165,250,0.08)',  label:'WORKAROUND EXISTS',  sub:'a fallback route exists — but may not reach this person' },
}

function FlagItem({ item }) {
  const s = FS[item.severity]
  return (
    <div style={{ borderLeft:`3px solid ${s.border}`, borderRadius:'0 10px 10px 0', background:s.bg, padding:'12px 14px', border:`1px solid ${s.border}33`, borderLeft:`3px solid ${s.border}` }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:5, flexWrap:'wrap' }}>
        <span style={{ fontFamily:F.d, fontWeight:800, fontSize:'0.7rem', color:s.border, letterSpacing:'0.1em' }}>{s.label}</span>
        <span style={{ fontFamily:F.b, fontSize:'0.7rem', color:'#6b7280' }}>— {s.sub}</span>
      </div>
      <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.92rem', color:'#ffffff', margin:'0 0 5px' }}>{item.cardLabel}</p>
      <p style={{ fontFamily:F.b, fontSize:'0.85rem', color:'#d1d5db', margin:'0 0 8px', lineHeight:1.55 }}>{item.plainText}</p>
      <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.8rem', color:'#e5e7eb', margin:'0 0 2px' }}>{item.stat}</p>
      <p style={{ fontFamily:F.b, fontSize:'0.72rem', color:'#6b7280', margin:0, fontStyle:'italic' }}>{item.source}</p>
    </div>
  )
}

export default function ExclusionPanel({ stepData, onProceedToNext, isAlreadyIncluded }) {
  const [clicked, setClicked] = useState(false)
  const confirmed = isAlreadyIncluded || clicked

  return (
    <div style={{ background:'#0f172a', minHeight:'100vh', overflowY:'auto' }}>

      {/* Step identifier banner — light mode improvement */}
      <div style={{ background:'rgba(255,255,255,0.03)', borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'14px 24px', display:'flex', alignItems:'center', gap:12, position:'sticky', top:0, zIndex:10, backdropFilter:'blur(8px)' }}>
        <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(245,158,11,0.12)', border:'1.5px solid rgba(245,158,11,0.4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.9rem', color:'#ffffff', margin:'0 0 1px' }}>
            Step {stepData.stepNumber} — {stepData.title}
          </p>
          <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#6b7280', margin:0 }}>Who this step would affect</p>
        </div>
      </div>

      <div style={{ maxWidth:700, margin:'0 auto', padding:'36px 24px 80px' }}>
        <motion.h1 initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.6rem,3.5vw,2.4rem)', color:'#ffffff', margin:'0 0 32px', letterSpacing:'-0.02em', lineHeight:1.15 }}>
          Who this step would affect
        </motion.h1>

        {stepData.flags.map((flag, i) => {
          const p = CHARACTERS[flag.personaKey]
          if (!p) return null
          return (
            <motion.div key={i} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              style={{ marginBottom:32, paddingBottom:32, borderBottom: i < stepData.flags.length-1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <div style={{ display:'flex', gap:16, alignItems:'flex-start', marginBottom:14 }}>
                <div style={{ flexShrink:0, width:'clamp(90px,14vw,130px)', height:'clamp(180px,26vh,260px)' }}>
                  <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom' }} />
                </div>
                <div>
                  <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.15rem', color:'#ffffff', margin:'0 0 2px' }}>{p.name}</p>
                  <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.85rem', color:'#f59e0b', margin:'0 0 6px' }}>{p.age} · {p.persona}</p>
                  <p style={{ fontFamily:F.b, fontSize:'0.85rem', color:'#9ca3af', lineHeight:1.55, margin:0 }}>{p.context}</p>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:14 }}>
                {flag.items.map((item, j) => <FlagItem key={j} item={item} />)}
              </div>
              {p.represents && (
                <div style={{ padding:'12px 14px', borderRadius:10, background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.18)' }}>
                  <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.7rem', color:'#f59e0b', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 5px' }}>
                    Who {p.name} represents
                  </p>
                  <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.9rem', color:'#e5e7eb', margin:'0 0 3px', lineHeight:1.5 }}>
                    {p.name} represents {p.represents.count} {p.represents.description}.
                  </p>
                  <p style={{ fontFamily:F.b, fontSize:'0.72rem', color:'#6b7280', margin:0, fontStyle:'italic' }}>{p.represents.source}</p>
                </div>
              )}
            </motion.div>
          )
        })}

        {/* Include / Proceed CTAs */}
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:8 }}>
          {!confirmed ? (
            <motion.button onClick={() => setClicked(true)}
              whileHover={{ background:'#fbbf24' }} whileTap={{ scale:0.97 }}
              className="pulse-btn"
              style={{ width:'100%', padding:'15px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer' }}>
              Include all users in usability testing
            </motion.button>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ padding:'15px', background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.35)', borderRadius:9999, textAlign:'center' }}>
                <span style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.9rem', color:'#4ade80', letterSpacing:'0.04em', textTransform:'uppercase' }}>
                  ✓ Users added to the usability panel
                </span>
              </div>
              <motion.button onClick={onProceedToNext}
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
                whileHover={{ background:'#fbbf24' }} whileTap={{ scale:0.97 }}
                className="pulse-btn"
                style={{ width:'100%', padding:'15px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer' }}>
                Proceed to next step →
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
