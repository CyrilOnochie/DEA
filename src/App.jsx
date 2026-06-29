import { useState } from 'react'
import Landing from './components/Landing'
import AuditTypeSelect from './components/AuditTypeSelect'
import PlatformSelect from './components/PlatformSelect'
import TaskSelect from './components/TaskSelect'
import NhsDevScreen from './components/NhsDevScreen'
import AuditPage from './components/AuditPage'
import ExclusionPanel from './components/ExclusionPanel'
import PreReportScreen from './components/PreReportScreen'
import ReportScreen from './components/ReportScreen'
import { STEP1 } from './data/step1'
import { STEP2 } from './data/step2'
import { STEP3 } from './data/step3'
import { STEP4 } from './data/step4'

const STEPS = [STEP1, STEP2, STEP3, STEP4]

export default function App() {
  const [screen, setScreen] = useState('intro')
  const [selectedPlatform, setSelectedPlatform] = useState(null)
  const [exclusionDetail, setExclusionDetail] = useState(null)
  const [includedSteps, setIncludedSteps] = useState(new Set())

  // "Run another audit" goes to platform-select, not intro
  const runAnother = () => {
    setScreen('platform-select')
    setSelectedPlatform(null)
    setExclusionDetail(null)
    setIncludedSteps(new Set())
  }

  const handleOpenExclusionDetail = (stepIndex, onComplete) => setExclusionDetail({ stepIndex, onComplete })

  const handleExclusionProceed = () => {
    if (exclusionDetail) {
      setIncludedSteps(prev => new Set(prev).add(exclusionDetail.stepIndex))
      const cb = exclusionDetail.onComplete
      setExclusionDetail(null)
      cb && cb()
    }
  }

  if (screen === 'intro')           return <Landing onGetStarted={() => setScreen('audit-type')} />
  if (screen === 'audit-type')      return <AuditTypeSelect onSelect={() => setScreen('platform-select')} onBack={() => setScreen('intro')} />
  if (screen === 'platform-select') return <PlatformSelect onSelect={k => { setSelectedPlatform(k); setScreen('task-select') }} onBack={() => setScreen('audit-type')} />
  if (screen === 'task-select')     return <TaskSelect platform={selectedPlatform} onSelectTask={() => setScreen(selectedPlatform === 'govuk' ? 'audit' : 'nhs-dev')} onBack={() => setScreen('platform-select')} />
  if (screen === 'nhs-dev')         return <NhsDevScreen onBack={() => setScreen('platform-select')} />
  if (screen === 'pre-report')      return <PreReportScreen onViewReport={() => setScreen('report')} />
  if (screen === 'report')          return <ReportScreen onRunAnother={runAnother} />

  // Audit screen
  return (
    <div style={{ width:'100%', minHeight:'100vh' }}>
      <AuditPage
        onComplete={() => setScreen('pre-report')}
        onOpenExclusionDetail={handleOpenExclusionDetail}
      />
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
}
