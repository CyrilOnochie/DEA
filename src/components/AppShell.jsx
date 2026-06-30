// AppShell.jsx — Claude-style collapsible sidebar wrapping the whole authenticated app.
// "Cuddy" branding, New Audit / Usability Testing tabs, Recent Audits list,
// footer with user's first name + Dan headshot avatar.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

function NewAuditIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
}
function UsabilityIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0113 0"/></svg>
}
function CollapseIcon({ collapsed }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}>
      <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>
    </svg>
  )
}

export default function AppShell({ userName, recentAudits, onNewAudit, onSelectTab, onOpenAudit, children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('new-audit')

  const handleTab = (tab) => {
    setActiveTab(tab)
    onSelectTab(tab)
  }

  const sidebarWidth = collapsed ? 64 : 252

  return (
    <div style={{ display:'flex', width:'100%', minHeight:'100vh', background:'#0f172a' }}>

      {/* Sidebar */}
      <motion.div animate={{ width: sidebarWidth }} transition={{ duration:0.25, ease:[0.16,1,0.3,1] }}
        style={{ flexShrink:0, background:'#0b1322', borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', height:'100vh', position:'sticky', top:0, overflow:'hidden' }}>

        {/* Logo row */}
        <div style={{ display:'flex', alignItems:'center', justifyContent: collapsed ? 'center' : 'space-between', padding: collapsed ? '20px 0' : '20px 18px', flexShrink:0 }}>
          {!collapsed && (
            <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.3rem', color:'#ffffff', margin:0, letterSpacing:'-0.01em' }}>Cuddy</p>
          )}
          <button onClick={() => setCollapsed(c => !c)}
            style={{ background:'transparent', border:'none', color:'#6b7280', cursor:'pointer', padding:6, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:6 }}>
            <CollapseIcon collapsed={collapsed} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ padding: collapsed ? '4px 8px' : '4px 12px', display:'flex', flexDirection:'column', gap:2, flexShrink:0 }}>
          <button onClick={() => handleTab('new-audit')}
            style={{
              display:'flex', alignItems:'center', gap:10, padding: collapsed ? '10px' : '9px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: activeTab==='new-audit' ? 'rgba(245,158,11,0.1)' : 'transparent',
              border:'none', borderRadius:8, cursor:'pointer', width:'100%',
              color: activeTab==='new-audit' ? '#f59e0b' : '#9ca3af',
            }}>
            <NewAuditIcon />
            {!collapsed && <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.88rem' }}>New Audit</span>}
          </button>
          <button onClick={() => handleTab('usability-testing')}
            style={{
              display:'flex', alignItems:'center', gap:10, padding: collapsed ? '10px' : '9px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: activeTab==='usability-testing' ? 'rgba(245,158,11,0.1)' : 'transparent',
              border:'none', borderRadius:8, cursor:'pointer', width:'100%',
              color: activeTab==='usability-testing' ? '#f59e0b' : '#9ca3af',
            }}>
            <UsabilityIcon />
            {!collapsed && <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.88rem' }}>Usability Testing</span>}
          </button>
        </div>

        {/* Recent audits */}
        {!collapsed && (
          <div style={{ flex:1, overflowY:'auto', padding:'18px 12px 8px', minHeight:0 }}>
            <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.68rem', color:'#4b5563', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 8px', padding:'0 4px' }}>
              Recent Audits
            </p>
            {recentAudits.length === 0 ? (
              <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#374151', padding:'0 4px', lineHeight:1.5 }}>
                Completed audits will appear here.
              </p>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                {recentAudits.map((audit, i) => (
                  <button key={i} onClick={() => onOpenAudit(audit)}
                    style={{ display:'block', width:'100%', textAlign:'left', padding:'9px 10px', background:'transparent', border:'none', borderRadius:8, cursor:'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.82rem', color:'#e5e7eb', margin:0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {audit.task} ({audit.platform})
                    </p>
                    <p style={{ fontFamily:F.b, fontSize:'0.68rem', color:'#4b5563', margin:'2px 0 0' }}>{audit.date}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {collapsed && <div style={{ flex:1 }} />}

        {/* Footer — user */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', padding: collapsed ? '14px 0' : '14px 16px', display:'flex', alignItems:'center', gap:10, justifyContent: collapsed ? 'center' : 'flex-start', flexShrink:0 }}>
          <div style={{ width:32, height:32, borderRadius:'50%', overflow:'hidden', flexShrink:0, background:'#1e293b', display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
            <img src="/assets/dan.png" alt={userName} style={{ width:'140%', height:'140%', objectFit:'cover', objectPosition:'top center' }} onError={e => e.target.style.visibility='hidden'} />
          </div>
          {!collapsed && (
            <div style={{ minWidth:0 }}>
              <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.85rem', color:'#e5e7eb', margin:0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{userName}</p>
              <p style={{ fontFamily:F.b, fontSize:'0.68rem', color:'#4b5563', margin:0 }}>Free plan</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main content */}
      <div style={{ flex:1, minWidth:0, position:'relative' }}>
        {children}
      </div>
    </div>
  )
}
