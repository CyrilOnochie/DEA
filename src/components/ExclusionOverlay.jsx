// ExclusionOverlay — darker scrim so exclusion content pops clearly
import { motion } from 'framer-motion'
import { CHARACTERS } from '../data/characters'
const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

function PulsingWarning() {
  return (
    <motion.div animate={{ boxShadow:['0 0 0 0 rgba(245,158,11,0)','0 0 0 14px rgba(245,158,11,0.28)','0 0 0 0 rgba(245,158,11,0)'] }} transition={{ duration:2, repeat:Infinity }}
      style={{ width:48, height:48, borderRadius:'50%', background:'rgba(245,158,11,0.15)', border:'2px solid rgba(245,158,11,0.5)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </motion.div>
  )
}

export default function ExclusionOverlay({ stepData, onReview, onSkip }) {
  const keys = [...new Set(stepData.flags.map(f => f.personaKey))]
  const personas = keys.map(k => CHARACTERS[k]).filter(Boolean)
  const STAGGER = 0.38
  const CTA_DELAY = 0.7 + personas.length * STAGGER + 0.2
  const avatarH = personas.length <= 2 ? 'clamp(240px,40vh,420px)' : 'clamp(180px,28vh,320px)'
  const avatarW = personas.length <= 2 ? 'clamp(130px,17vw,200px)' : 'clamp(100px,13vw,160px)'

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
      style={{
        position:'fixed', inset:0, zIndex:80,
        // Much darker scrim — was 0.88, now 0.94 so background is barely readable
        background:'rgba(3,5,12,0.94)',
        display:'flex', flexDirection:'column', alignItems:'center',
        paddingTop:20, paddingBottom:32, overflowY:'auto'
      }}>

      {/* Warning banner */}
      <motion.div initial={{ y:-50, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.1, duration:0.45, ease:[0.16,1,0.3,1] }}
        style={{ background:'#16213a', border:'1px solid rgba(255,255,255,0.1)', borderRadius:14, padding:'16px 24px', textAlign:'center', boxShadow:'0 10px 32px rgba(0,0,0,0.7)', maxWidth:320, width:'90%', flexShrink:0 }}>
        <PulsingWarning />
        <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1rem,2vw,1.25rem)', color:'#ffffff', margin:'0 0 4px' }}>Exclusion detected</p>
        <p style={{ fontFamily:F.b, fontSize:'0.84rem', color:'#9ca3af', margin:0 }}>{keys.length} user {keys.length===1?'group':'groups'} would be excluded at this step.</p>
      </motion.div>

      {/* Full-size avatars */}
      <div style={{ display:'flex', gap:'clamp(16px,4vw,52px)', alignItems:'flex-end', justifyContent:'center', marginTop:18, flexWrap:'wrap', flex:1, paddingBottom:8 }}>
        {personas.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity:0, y:60, scale:0.9 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ delay:0.6+i*STAGGER, duration:0.65, ease:[0.16,1,0.3,1] }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
            <div style={{ width:avatarW, height:avatarH }}>
              <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom center' }} />
            </div>
            <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1rem,1.8vw,1.35rem)', color:'#ffffff', margin:0 }}>{p.name}</p>
            <p style={{ fontFamily:F.b, fontWeight:500, fontSize:'0.8rem', color:'#f59e0b', margin:0 }}>{p.age} · {p.persona}</p>
          </motion.div>
        ))}
      </div>

      {/* CTAs */}
      <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:CTA_DELAY }}
        style={{ display:'flex', flexDirection:'column', gap:10, width:'90%', maxWidth:340, marginTop:16, flexShrink:0 }}>
        <motion.button onClick={onReview} whileHover={{ backgroundColor:'#fbbf24', scale:1.02 }} whileTap={{ scale:0.97 }}
          className="pulse-btn"
          style={{ padding:'14px 20px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer' }}>
          Review exclusion
        </motion.button>
        <motion.button onClick={onSkip} whileHover={{ background:'rgba(255,255,255,0.06)' }} whileTap={{ scale:0.97 }}
          style={{ padding:'12px 20px', background:'transparent', color:'#9ca3af', border:'1px solid rgba(255,255,255,0.15)', borderRadius:9999, fontFamily:F.b, fontWeight:600, fontSize:'0.9rem', cursor:'pointer' }}>
          Skip and proceed
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
