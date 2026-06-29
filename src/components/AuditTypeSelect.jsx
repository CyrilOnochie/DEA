import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

const TYPES = [
  {
    key: 'existing', icon: '🌐',
    title: 'Audit an existing platform',
    description: 'Test a live digital service against documented patterns of exclusion. Identify who is being excluded and where, before your next usability testing session.',
    cta: 'Select platform →', available: true,
  },
  {
    key: 'prototype', icon: '📐',
    title: 'Audit a prototype or wireframe',
    description: 'Identify exclusion before a single user encounters the platform. Upload Figma frames or wireframes and get an exclusion report before code is written.',
    cta: 'Coming soon', available: false, badge: 'In development',
  },
]

export default function AuditTypeSelect({ onSelect, onBack }) {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', backgroundColor:'#0f172a', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #0f172a 95%)', pointerEvents:'none', zIndex:1 }} />

      <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }} onClick={onBack}
        style={{ position:'fixed', top:20, left:20, zIndex:30, background:'transparent', border:'1px solid rgba(255,255,255,0.15)', borderRadius:8, padding:'9px 16px', color:'#e5e7eb', fontFamily:F.b, fontSize:'0.9rem', cursor:'pointer' }}>
        ← Back
      </motion.button>

      <div style={{ position:'relative', zIndex:2, maxWidth:860, width:'100%' }}>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
          style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:'#f59e0b', letterSpacing:'0.2em', textTransform:'uppercase', textAlign:'center', marginBottom:12 }}>
          Digital Exclusion Audit
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.8rem,4.5vw,3rem)', color:'#ffffff', letterSpacing:'-0.02em', textAlign:'center', marginBottom:8 }}>
          What would you like to audit?
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          style={{ fontFamily:F.b, fontSize:'1rem', color:'#6b7280', textAlign:'center', marginBottom:40 }}>
          Choose the type of audit you want to run.
        </motion.p>

        <div style={{ display:'flex', gap:'clamp(14px,3vw,28px)', flexWrap:'wrap', justifyContent:'center' }}>
          {TYPES.map((type, i) => (
            <motion.div key={type.key}
              initial={{ opacity:0, y:24 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.3 + i * 0.1 }}
              onClick={() => type.available && onSelect(type.key)}
              whileHover={type.available ? { y:-6, boxShadow:'0 16px 48px rgba(245,158,11,0.2), 0 0 0 1.5px #f59e0b' } : {}}
              style={{
                flex:'1 1 300px', maxWidth:400, background:'#0f172a', borderRadius:20,
                overflow:'hidden', cursor: type.available ? 'pointer' : 'default',
                opacity: type.available ? 1 : 0.6,
                boxShadow:'0 4px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.07)',
              }}>
              <div style={{ padding:'clamp(24px,4vw,36px)' }}>
                {!type.available && (
                  <div style={{ display:'inline-flex', alignItems:'center', padding:'4px 10px', background:'rgba(96,165,250,0.12)', border:'1px solid rgba(96,165,250,0.3)', borderRadius:9999, marginBottom:16 }}>
                    <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.7rem', color:'#60a5fa', letterSpacing:'0.1em', textTransform:'uppercase' }}>{type.badge}</span>
                  </div>
                )}
                <p style={{ fontSize:'2.4rem', marginBottom:16 }}>{type.icon}</p>
                <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.3rem,2.5vw,1.7rem)', color:'#ffffff', margin:'0 0 12px', lineHeight:1.2 }}>{type.title}</p>
                <p style={{ fontFamily:F.b, fontSize:'0.92rem', color:'#9ca3af', lineHeight:1.6, margin:'0 0 24px' }}>{type.description}</p>
                <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.88rem', letterSpacing:'0.06em', textTransform:'uppercase', color: type.available ? '#4b5563' : '#374151' }}>
                  {type.cta}
                </p>
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
