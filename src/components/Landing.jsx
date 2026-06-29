import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const F = { d: "'Syne',sans-serif", b: "'DM Sans',sans-serif" }

export default function Landing({ onGetStarted }) {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', backgroundColor:'#0f172a', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #0f172a 100%)', pointerEvents:'none', zIndex:1 }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:640, width:'100%', textAlign:'center' }}>
        <motion.p initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
          style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:'#f59e0b', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:20 }}>
          Digital Exclusion Audit
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(2.6rem,8vw,5.5rem)', color:'#ffffff', lineHeight:1, letterSpacing:'-0.03em', marginBottom:0 }}>
          Digital Exclusion
        </motion.h1>
        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(2.6rem,8vw,5.5rem)', color:'#f59e0b', lineHeight:1, letterSpacing:'-0.03em', marginBottom:28 }}>
          Audit
        </motion.h1>
        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.3, duration:0.5 }}
          style={{ width:56, height:3, background:'#f59e0b', borderRadius:2, margin:'0 auto 24px' }} />
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
          style={{ fontFamily:F.b, fontSize:'clamp(1rem,2vw,1.15rem)', color:'#e5e7eb', lineHeight:1.65, marginBottom:14 }}>
          A pre-usability audit tool that identifies who a digital service will exclude — and exactly where, and why — before usability testing begins.
        </motion.p>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}
          style={{ fontFamily:F.b, fontSize:'0.95rem', color:'#6b7280', lineHeight:1.65, marginBottom:40 }}>
          Accessibility audits, usability testing, and equality assessments each answer part of the question. None test whether one specific person can actually complete this task. This does.
        </motion.p>
        <motion.button onClick={onGetStarted}
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
          whileHover={{ background:'#fbbf24', scale:1.03 }} whileTap={{ scale:0.97 }}
          className="pulse-btn"
          style={{ padding:'15px 48px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'1.05rem', letterSpacing:'0.06em', textTransform:'uppercase', cursor:'pointer' }}>
          Get Started →
        </motion.button>
        <p style={{ marginTop:48, fontFamily:F.b, fontSize:'0.68rem', color:'#1e2a45', letterSpacing:'0.16em', textTransform:'uppercase' }}>
          MA Creative Technology · University of Salford · 2026
        </p>
      </div>
    </div>
  )
}
