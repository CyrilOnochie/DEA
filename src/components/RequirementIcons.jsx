// 3D-style app icon SVGs for requirement icons
function IconBase({ gradient1, gradient2, children, id }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor={gradient1}/><stop offset="1" stopColor={gradient2}/>
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="22" fill={`url(#g${id})`}/>
      {children}
    </svg>
  )
}

export function EmailIcon() {
  return (
    <IconBase id="em" gradient1="#4F7FFF" gradient2="#2E5EEB">
      <rect x="16" y="30" width="64" height="44" rx="6" fill="rgba(255,255,255,0.9)"/>
      <path d="M16 36 L48 56 L80 36" stroke="#3B64D4" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </IconBase>
  )
}
export function MobileIcon() {
  return (
    <IconBase id="mo" gradient1="#34C759" gradient2="#28A745">
      <rect x="28" y="12" width="40" height="72" rx="8" fill="rgba(255,255,255,0.9)"/>
      <circle cx="48" cy="76" r="4" fill="#28A745"/>
      <rect x="34" y="20" width="28" height="44" rx="4" fill="#28A745" opacity="0.2"/>
      <path d="M38 30 L50 40 L58 32" stroke="#28A745" strokeWidth="2.5" strokeLinecap="round"/>
    </IconBase>
  )
}
export function PassportIcon() {
  return (
    <IconBase id="pa" gradient1="#8B5CF6" gradient2="#6D28D9">
      <rect x="18" y="14" width="60" height="68" rx="5" fill="rgba(255,255,255,0.9)"/>
      <rect x="24" y="20" width="48" height="32" rx="4" fill="#8B5CF6" opacity="0.2"/>
      <circle cx="48" cy="36" r="10" fill="rgba(109,40,217,0.3)" stroke="#6D28D9" strokeWidth="2"/>
      <rect x="26" y="58" width="44" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="26" y="66" width="32" height="4" rx="2" fill="#9CA3AF"/>
    </IconBase>
  )
}
export function FaceScanIcon() {
  return (
    <IconBase id="fs" gradient1="#F97316" gradient2="#EA580C">
      <rect x="14" y="14" width="68" height="68" rx="10" fill="rgba(255,255,255,0.15)"/>
      <path d="M14 36 L14 20 Q14 14 20 14 L36 14" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M82 36 L82 20 Q82 14 76 14 L60 14" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M14 60 L14 76 Q14 82 20 82 L36 82" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M82 60 L82 76 Q82 82 76 82 L60 82" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <circle cx="48" cy="48" r="14" stroke="white" strokeWidth="3" fill="none"/>
      <circle cx="48" cy="48" r="6" fill="white" opacity="0.6"/>
    </IconBase>
  )
}
export function NiCardIcon() {
  return (
    <IconBase id="ni" gradient1="#3B82F6" gradient2="#1D4ED8">
      <rect x="10" y="28" width="76" height="48" rx="6" fill="rgba(255,255,255,0.9)"/>
      <rect x="18" y="36" width="24" height="16" rx="3" fill="#3B82F6" opacity="0.4"/>
      <rect x="18" y="58" width="40" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="18" y="66" width="24" height="4" rx="2" fill="#9CA3AF"/>
    </IconBase>
  )
}
export function BankIcon() {
  return (
    <IconBase id="ba" gradient1="#10B981" gradient2="#059669">
      <polygon points="48,14 80,32 80,34 16,34 16,32" fill="rgba(255,255,255,0.9)"/>
      <rect x="22" y="38" width="10" height="28" rx="2" fill="rgba(255,255,255,0.9)"/>
      <rect x="43" y="38" width="10" height="28" rx="2" fill="rgba(255,255,255,0.9)"/>
      <rect x="64" y="38" width="10" height="28" rx="2" fill="rgba(255,255,255,0.9)"/>
      <rect x="16" y="70" width="64" height="6" rx="2" fill="rgba(255,255,255,0.9)"/>
    </IconBase>
  )
}
export function HousingIcon() {
  return (
    <IconBase id="ho" gradient1="#EC4899" gradient2="#BE185D">
      <path d="M48 14 L82 42 L74 42 L74 80 L22 80 L22 42 L14 42 Z" fill="rgba(255,255,255,0.9)"/>
      <rect x="36" y="56" width="24" height="24" rx="2" fill="#BE185D" opacity="0.3"/>
      <rect x="42" y="62" width="12" height="18" rx="1" fill="#BE185D" opacity="0.5"/>
    </IconBase>
  )
}
export function DeclarationIcon() {
  return (
    <IconBase id="de" gradient1="#6366F1" gradient2="#4338CA">
      <rect x="16" y="8" width="54" height="70" rx="5" fill="rgba(255,255,255,0.9)"/>
      <rect x="24" y="18" width="36" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="24" y="26" width="28" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="24" y="34" width="32" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="24" y="42" width="24" height="4" rx="2" fill="#9CA3AF"/>
      <path d="M26 60 Q34 52 38 56 L50 44 L56 50" stroke="#4338CA" strokeWidth="3" fill="none" strokeLinecap="round"/>
    </IconBase>
  )
}
export function InterviewIcon() {
  return (
    <IconBase id="in" gradient1="#F59E0B" gradient2="#D97706">
      <circle cx="36" cy="36" r="14" fill="rgba(255,255,255,0.9)"/>
      <circle cx="62" cy="36" r="14" fill="rgba(255,255,255,0.9)"/>
      <path d="M12 80 Q12 60 36 60 Q49 60 55 68 Q61 60 62 60 Q84 60 84 80" fill="rgba(255,255,255,0.9)"/>
    </IconBase>
  )
}

export const ICON_MAP = { email:EmailIcon, mobile:MobileIcon, passport:PassportIcon, facescan:FaceScanIcon, nicard:NiCardIcon, bank:BankIcon, housing:HousingIcon, declaration:DeclarationIcon, interview:InterviewIcon }
