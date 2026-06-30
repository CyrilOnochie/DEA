// UsabilityTestingTab.jsx
// Level 1: card grid — one card per audit that has inclusions, same card visual
// language as platform/task cards. Header = task name on accent colour, body =
// count of users included.
// Level 2: tracker table for the selected audit — Avatar+name+represents |
// step pill (S1-S4, colour coded) | contact org | status dropdown (colour coded,
// persisted).

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CHARACTERS } from '../data/characters'
import { REPORT } from '../data/reportData'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

// Colours match severity semantics used everywhere else in the tool:
// hard stop = red, friction = amber, workaround = blue
const SEVERITY_COLOURS = {
  hard:       { bg:'rgba(239,68,68,0.12)',  border:'rgba(239,68,68,0.35)',  text:'#ef4444' },
  soft:       { bg:'rgba(245,158,11,0.12)', border:'rgba(245,158,11,0.35)', text:'#f59e0b' },
  workaround: { bg:'rgba(96,165,250,0.12)', border:'rgba(96,165,250,0.35)', text:'#60a5fa' },
}

const STATUS_OPTIONS = ['No activity', 'Contact made', 'Invite extended', 'Invite Accepted', 'Usability testing held']
const STATUS_COLOURS = {
  'No activity':            { bg:'rgba(255,255,255,0.05)',  border:'rgba(255,255,255,0.15)', text:'#6b7280' },
  'Contact made':           { bg:'rgba(96,165,250,0.1)',    border:'rgba(96,165,250,0.3)',   text:'#60a5fa' },
  'Invite extended':        { bg:'rgba(245,158,11,0.1)',    border:'rgba(245,158,11,0.3)',   text:'#f59e0b' },
  'Invite Accepted':        { bg:'rgba(167,139,250,0.1)',   border:'rgba(167,139,250,0.3)',  text:'#a78bfa' },
  'Usability testing held': { bg:'rgba(74,222,128,0.1)',    border:'rgba(74,222,128,0.3)',   text:'#4ade80' },
}

function StatusDropdown({ value, onChange }) {
  const c = STATUS_COLOURS[value]
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{
        background:c.bg, border:`1px solid ${c.border}`, borderRadius:9999,
        color:c.text, fontFamily:F.b, fontWeight:600, fontSize:'0.8rem',
        padding:'6px 14px', cursor:'pointer', outline:'none', appearance:'none',
        WebkitAppearance:'none', MozAppearance:'none',
      }}>
      {STATUS_OPTIONS.map(opt => <option key={opt} value={opt} style={{ background:'#0f172a', color:'#e5e7eb' }}>{opt}</option>)}
    </select>
  )
}

export default function UsabilityTestingTab({ recentAudits, inclusions, onUpdateStatus }) {
  const [openAuditId, setOpenAuditId] = useState(null)

  // Group inclusions by auditId, count unique personas per audit
  const auditsWithInclusions = recentAudits
    .map(audit => {
      const records = inclusions.filter(r => r.auditId === audit.id)
      const uniquePersonas = [...new Set(records.map(r => r.personaKey))]
      return { ...audit, records, userCount: uniquePersonas.length }
    })
    .filter(a => a.userCount > 0)

  const openAudit = auditsWithInclusions.find(a => a.id === openAuditId)

  // ── Level 2: Tracker table ──
  if (openAudit) {
    return (
      <div style={{ minHeight:'100vh', background:'#0f172a', padding:'40px 32px 60px' }}>
        <div style={{ maxWidth:920, margin:'0 auto' }}>
          <button onClick={() => setOpenAuditId(null)}
            style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, padding:'8px 16px', color:'#9ca3af', fontFamily:F.b, fontSize:'0.85rem', cursor:'pointer', marginBottom:24 }}>
            ← All audits
          </button>

          <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:'#f59e0b', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:10 }}>
            {openAudit.platform}
          </p>
          <h1 style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.6rem,3.5vw,2.2rem)', color:'#ffffff', margin:'0 0 28px', letterSpacing:'-0.02em' }}>
            {openAudit.task} — usability testing tracker
          </h1>

          {/* Table header */}
          <div style={{ display:'grid', gridTemplateColumns:'2.4fr 1.2fr 2fr 1.6fr', gap:16, padding:'0 16px 10px', borderBottom:'1px solid rgba(255,255,255,0.08)', marginBottom:6 }}>
            {['User', 'Steps', 'Point of contact', 'Status'].map(h => (
              <p key={h} style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.68rem', color:'#6b7280', letterSpacing:'0.1em', textTransform:'uppercase', margin:0 }}>{h}</p>
            ))}
          </div>

          {/* Rows — one per persona, multiple step pills shown together */}
          {(() => {
            const byPersona = {}
            openAudit.records.forEach(rec => {
              if (!byPersona[rec.personaKey]) byPersona[rec.personaKey] = []
              byPersona[rec.personaKey].push(rec)
            })

            return Object.entries(byPersona).map(([personaKey, recs], i) => {
              const p = CHARACTERS[personaKey]
              if (!p) return null
              const reportPersona = REPORT.personas.find(rp => rp.key === personaKey)
              const contact = reportPersona?.recruitment?.contacts?.[0]
              // Status is tracked per persona for this audit (use the first record's status as the shared status)
              const sharedStatus = recs[0].status

              return (
                <motion.div key={personaKey} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
                  style={{ display:'grid', gridTemplateColumns:'2.4fr 1.2fr 2fr 1.6fr', gap:16, alignItems:'center', padding:'14px 16px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>

                  {/* User column */}
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:42, height:64, flexShrink:0 }}>
                      <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily:F.d, fontWeight:800, fontSize:'0.92rem', color:'#ffffff', margin:'0 0 2px' }}>{p.name}</p>
                      <p style={{ fontFamily:F.b, fontSize:'0.74rem', color:'#9ca3af', margin:0, lineHeight:1.4 }}>
                        Represents {p.persona.toLowerCase()}
                      </p>
                    </div>
                  </div>

                  {/* Step pills — one per step flagged, coloured by severity */}
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {recs.sort((a,b) => a.step - b.step).map(rec => {
                      const sc = SEVERITY_COLOURS[rec.severity] || SEVERITY_COLOURS.soft
                      return (
                        <span key={rec.step} style={{ display:'inline-block', padding:'4px 9px', background:sc.bg, border:`1px solid ${sc.border}`, borderRadius:9999, fontFamily:F.b, fontWeight:700, fontSize:'0.7rem', color:sc.text }}>
                          S{rec.step}
                        </span>
                      )
                    })}
                  </div>

                  {/* Contact */}
                  <div>
                    {contact ? (
                      <>
                        <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:'#e5e7eb', margin:'0 0 1px' }}>{contact.org}</p>
                        <p style={{ fontFamily:F.b, fontSize:'0.7rem', color:'#6b7280', margin:0 }}>{contact.detail}</p>
                      </>
                    ) : (
                      <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#4b5563' }}>—</p>
                    )}
                  </div>

                  {/* Status — applies to all steps for this persona in this audit */}
                  <div>
                    <StatusDropdown value={sharedStatus} onChange={(val) => recs.forEach(rec => onUpdateStatus(openAudit.id, personaKey, rec.step, val))} />
                  </div>
                </motion.div>
              )
            })
          })()}
        </div>
      </div>
    )
  }

  // ── Level 1: Card grid ──
  return (
    <div style={{ minHeight:'100vh', background:'#0f172a', padding:'56px 40px' }}>
      <div style={{ maxWidth:920, margin:'0 auto' }}>
        <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:'#f59e0b', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:12 }}>
          Usability Testing
        </p>
        <h1 style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.8rem,4vw,2.6rem)', color:'#ffffff', margin:'0 0 14px', letterSpacing:'-0.02em' }}>
          Your usability testing panel
        </h1>
        <p style={{ fontFamily:F.b, fontSize:'0.95rem', color:'#9ca3af', lineHeight:1.65, marginBottom:36 }}>
          Each audit with included users gets its own tracker. Click a card to manage outreach.
        </p>

        {auditsWithInclusions.length === 0 ? (
          <div style={{ padding:'40px 24px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, textAlign:'center' }}>
            <p style={{ fontFamily:F.b, fontSize:'0.92rem', color:'#4b5563' }}>
              No one has been added yet. Run an audit and include users to see them here.
            </p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:20 }}>
            {auditsWithInclusions.map((audit, i) => (
              <motion.div key={audit.id} initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08 }}
                onClick={() => setOpenAuditId(audit.id)}
                whileHover={{ y:-5, boxShadow:'0 12px 36px rgba(245,158,11,0.18), 0 0 0 1.5px #f59e0b' }}
                style={{ background:'#0f172a', borderRadius:18, overflow:'hidden', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07)' }}>
                <div style={{ background:'#0b0c0c', padding:'20px 22px 18px' }}>
                  <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.7rem', color:'#9ca3af', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 8px' }}>{audit.platform}</p>
                  <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.2rem', color:'#ffffff', margin:0, lineHeight:1.25 }}>{audit.task}</p>
                </div>
                <div style={{ padding:'18px 22px 20px' }}>
                  <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'2.2rem', color:'#f59e0b', margin:'0 0 2px', lineHeight:1 }}>{audit.userCount}</p>
                  <p style={{ fontFamily:F.b, fontSize:'0.82rem', color:'#9ca3af', margin:0 }}>users included for testing</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
