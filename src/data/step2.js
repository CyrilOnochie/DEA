export const STEP2 = {
  stepNumber: 2, platform: 'GOV.UK', title: 'Verify your identity', totalSteps: 4,
  requirements: [
    { id: 'passport', icon: 'passport', caption: 'A passport, driving licence, or similar photo ID' },
    { id: 'facescan', icon: 'facescan', caption: 'A smartphone that can scan your ID and take a selfie video' },
  ],
  flags: [
    {
      personaKey: 'sam',
      items: [
        { severity: 'hard', cardLabel: 'Cannot complete online identity verification through either primary route', plainText: "The app route requires NFC-capable scanning — Sam's basic smartphone is used only for calls and texts. The security questions route requires navigating UK credit records online, which exceeds her digital confidence. Neither route is viable.", stat: '2.5 million people aged 65 and over online still cannot confidently complete tasks like this', source: 'Age UK, Offline and Overlooked, 2024' },
        { severity: 'workaround', cardLabel: 'The Post Office route was designed for her — but reaching it requires getting here first', plainText: "The Post Office route is the right solution for Sam. But it requires navigating the online journey far enough to obtain a GOV.UK reference number, then understanding it must be taken to a branch. Citizens Advice found only 38% of those who attempt online identity verification can complete it.", stat: 'Over half of disabled claimants who registered online needed assistance doing so', source: 'House of Commons Work and Pensions Committee, 2019' },
      ],
    },
    {
      personaKey: 'tosin',
      items: [
        { severity: 'soft', cardLabel: "Identity check doesn't match her device or document situation", plainText: "Tosin's basic smartphone likely cannot complete NFC document scanning. As a recent arrival she has no UK credit history for the security questions route. Non-UK biometric passport acceptance through the app route is inconsistent.", stat: 'Citizens Advice specifically identifies migrant claimants as disproportionately affected at the identity verification stage', source: 'Citizens Advice, Disconnected: How Digital Exclusion Blocks Access to Universal Credit' },
        { severity: 'workaround', cardLabel: 'Post Office route exists but requires understanding which route applies to her situation', plainText: "The platform does not clearly explain which route is appropriate for which document type or device. Tosin would need to determine this in formal English she is still learning to navigate.", stat: 'At Afrocats/Mahtsen, a community member was found to have been without UC she was entitled to for months due to this exact barrier', source: 'Afrocats/Mahtsen community observation, 25 May 2026 (primary research)' },
      ],
    },
    {
      personaKey: 'jane',
      items: [
        { severity: 'soft', cardLabel: 'Error recovery is unclear if the identity check fails', plainText: "Jane's barrier is not the check itself — if it works first time, she can likely complete it. The barrier is what happens if the face scan fails. GOV.UK error messages are documented as abstract, without plain-language recovery guidance.", stat: 'Mencap (2020) documents that abstract error messages without plain-language guidance typically end the attempt for people with learning disabilities', source: 'Mencap, Easy Read Research, 2020' },
      ],
    },
  ],
}
