import { useState, useEffect } from 'react'
import Landing from './components/Landing'
import SignUp from './components/SignUp'
import AppShell from './components/AppShell'
import AuditTypeSelect from './components/AuditTypeSelect'
import PlatformSelect from './components/PlatformSelect'
import TaskSelect from './components/TaskSelect'
import NhsDevScreen from './components/NhsDevScreen'
import AuditPage from './components/AuditPage'
import ExclusionPanel from './components/ExclusionPanel'
import PreReportScreen from './components/PreReportScreen'
import ReportScreen from './components/ReportScreen'
import UsabilityTestingTab from './components/UsabilityTestingTab'
import { STEP1 } from './data/step1'
import { STEP2 } from './data/step2'
import { STEP3 } from './data/step3'
import { STEP4 } from './data/step4'

const STEPS = [STEP1, STEP2, STEP3, STEP4]

// --- localStorage helpers (mock persistence layer, no real backend) ---
const loadUser = () => { try { return JSON.parse(localStorage.getItem('dea_user')) } catch { return null } }
const saveUser = (name) => localStorage.setItem('dea_user', JSON.stringify({ name }))
const loadAudits = () => { try { return JSON.parse(localStorage.getItem('dea_audits')) || [] } catch { return [] } }
const saveAudits = (audits) => localStorage.setItem('dea_audits', JSON.stringify(audits))
const loadInclusions = () => { try { return JSON.parse(localStorage.getItem('dea_inclusions')) || [] } catch { return [] } }
const saveInclusions = (records) => localStorage.setItem('dea_inclusions', JSON.stringify(records))

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [userName, setUserName] = useState(null)
  const [selectedPlatform, setSelectedPlatform] = useState(null)
  const [exclusionDetail, setExclusionDetail] = useState(null)
  const [includedSteps, setIncludedSteps] = useState(new Set())
  const [recentAudits, setRecentAudits] = useState([])
  const [inclusions, setInclusions] = useState([]) // [{ auditId, personaKey, step, status }]
  const [currentAuditId, setCurrentAuditId] = useState(null)

  useEffect(() => {
    const u = loadUser()
    if (u?.name) { setUserName(u.name); setScreen('shell-audit-type') }
    setRecentAudits(loadAudits())
    setInclusions(loadInclusions())
  }, [])

  const handleSignUpComplete = (name) => {
    saveUser(name)
    setUserName(name)
    setScreen('shell-audit-type')
  }

  const runAnother = () => {
    setScreen('shell-audit-type')
    setSelectedPlatform(null)
    setExclusionDetail(null)
    setIncludedSteps(new Set())
    setCurrentAuditId(null)
  }

  const handleOpenExclusionDetail = (stepIndex, onComplete) => setExclusionDetail({ stepIndex, onComplete })

  const handleExclusionProceed = () => {
    if (exclusionDetail) {
      setIncludedSteps(prev => new Set(prev).add(exclusionDetail.stepIndex))

      // Record inclusions tied to the current audit, one record per persona flagged at this step.
      // Store the worst (most severe) flag severity for that persona at this step so the
      // tracker can colour-code consistently with hard-stop/friction/workaround semantics.
      const step = STEPS[exclusionDetail.stepIndex]
      const keys = [...new Set(step.flags.map(f => f.personaKey))]
      const auditId = currentAuditId

      const severityRank = { hard: 3, soft: 2, workaround: 1 }
      const worstSeverityFor = (personaKey) => {
        const flagGroup = step.flags.find(f => f.personaKey === personaKey)
        if (!flagGroup) return 'soft'
        return flagGroup.items.reduce((worst, item) => severityRank[item.severity] > severityRank[worst] ? item.severity : worst, 'workaround')
      }

      setInclusions(prev => {
        const next = [...prev]
        keys.forEach(personaKey => {
          const exists = next.find(r => r.auditId === auditId && r.personaKey === personaKey && r.step === exclusionDetail.stepIndex + 1)
          if (!exists) next.push({ auditId, personaKey, step: exclusionDetail.stepIndex + 1, severity: worstSeverityFor(personaKey), status: 'No activity' })
        })
        saveInclusions(next)
        return next
      })

      const cb = exclusionDetail.onComplete
      setExclusionDetail(null)
      cb && cb()
    }
  }

  const handleUpdateStatus = (auditId, personaKey, step, newStatus) => {
    setInclusions(prev => {
      const next = prev.map(r => (r.auditId === auditId && r.personaKey === personaKey && r.step === step) ? { ...r, status: newStatus } : r)
      saveInclusions(next)
      return next
    })
  }

  const handleAuditComplete = () => {
    const entry = { id: currentAuditId, platform: 'GOV.UK', task: 'Apply for Universal Credit', date: new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) }
    const updated = [entry, ...recentAudits]
    setRecentAudits(updated)
    saveAudits(updated)
    setScreen('shell-pre-report')
  }

  const handleOpenPastAudit = () => setScreen('shell-report')

  if (screen === 'intro') return <Landing onGetStarted={() => setScreen('signup')} />
  if (screen === 'signup') return <SignUp onComplete={handleSignUpComplete} />

  const shellContent = () => {
    switch (screen) {
      case 'shell-audit-type':
        return <AuditTypeSelect onSelect={() => setScreen('shell-platform-select')} onBack={() => setScreen('shell-audit-type')} />
      case 'shell-platform-select':
        return <PlatformSelect onSelect={k => { setSelectedPlatform(k); setScreen('shell-task-select') }} onBack={() => setScreen('shell-audit-type')} />
      case 'shell-task-select':
        return <TaskSelect platform={selectedPlatform} onSelectTask={() => {
          if (selectedPlatform === 'govuk') {
            setCurrentAuditId(`audit-${Date.now()}`)
            setScreen('shell-audit')
          } else {
            setScreen('shell-nhs-dev')
          }
        }} onBack={() => setScreen('shell-platform-select')} />
      case 'shell-nhs-dev':
        return <NhsDevScreen onBack={() => setScreen('shell-platform-select')} />
      case 'shell-pre-report':
        return <PreReportScreen onViewReport={() => setScreen('shell-report')} />
      case 'shell-report':
        return <ReportScreen onRunAnother={runAnother} />
      case 'shell-usability-testing':
        return <UsabilityTestingTab recentAudits={recentAudits} inclusions={inclusions} onUpdateStatus={handleUpdateStatus} />
      case 'shell-audit':
        return (
          <div style={{ width:'100%', minHeight:'100vh' }}>
            <AuditPage onComplete={handleAuditComplete} onOpenExclusionDetail={handleOpenExclusionDetail} />
            {exclusionDetail !== null && (
              <div style={{ position:'fixed', inset:0, zIndex:100, background:'#0f172a', overflowY:'auto' }}>
                <ExclusionPanel
                  stepData={STEPS[exclusionDetail.stepIndex]}
                  isAlreadyIncluded={includedSteps.has(exclusionDetail.stepIndex)}
                  onProceedToNext={handleExclusionProceed}
                />
              </div>
            )}
          </div>
        )
      default:
        return <AuditTypeSelect onSelect={() => setScreen('shell-platform-select')} onBack={() => setScreen('shell-audit-type')} />
    }
  }

  return (
    <AppShell
      userName={userName || 'there'}
      recentAudits={recentAudits}
      onNewAudit={() => setScreen('shell-audit-type')}
      onSelectTab={(tab) => setScreen(tab === 'new-audit' ? 'shell-audit-type' : 'shell-usability-testing')}
      onOpenAudit={handleOpenPastAudit}
    >
      {shellContent()}
    </AppShell>
  )
}
