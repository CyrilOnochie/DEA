export const STEP3 = {
  stepNumber: 3, platform: 'GOV.UK', title: 'Complete your to-do list', totalSteps: 4,
  requirements: [
    { id: 'nicard', icon: 'nicard', caption: 'Your National Insurance number' },
    { id: 'bank', icon: 'bank', caption: 'Bank account details' },
    { id: 'housing', icon: 'housing', caption: 'Housing and tenancy information' },
  ],
  flags: [
    {
      personaKey: 'sam',
      items: [
        { severity: 'soft', cardLabel: 'Long multi-section form exceeds her digital confidence', plainText: "The to-do list contains multiple sections — housing, income, health, savings — each requiring detailed answers. Citizens Advice confirmed the complexity is causing people to drop out of Universal Credit altogether — not because they are ineligible, but because the process is not completable without support.", stat: 'Citizens Advice found digital complexity is causing people to abandon UC claims — not because they are ineligible, but because the process is not completable without support', source: 'Citizens Advice, written evidence to the House of Commons Work and Pensions Committee' },
        { severity: 'soft', cardLabel: '30-minute session timeout risks losing all progress', plainText: "If Sam pauses to check a document or takes a break, the session closes. The account saves details — but only if she pressed save first, which she may not know. For someone at the limit of her digital confidence, a timeout may mean a permanent end to the attempt.", stat: 'Sessions automatically close after 30 minutes of inactivity', source: 'Citizens Advice, How to apply for Universal Credit, 2024' },
      ],
    },
    {
      personaKey: 'tosin',
      items: [
        { severity: 'soft', cardLabel: 'Formal English throughout every section', plainText: "The housing section asks for 'tenancy agreement details' and 'landlord particulars'. The income section uses formal financial terminology. Each section goes deeper into bureaucratic language than the account-creation screen she struggled with at step 1. A misunderstood question answered incorrectly can result in a wrong award or a compliance review.", stat: "CPAG's three-year study found the digital UC system routinely leads to wrong amounts being awarded — or people being left without money they are entitled to", source: 'CPAG, You Reap What You Code, 2024' },
      ],
    },
    {
      personaKey: 'jane',
      items: [
        { severity: 'hard', cardLabel: 'A 30-minute timeout creates a new barrier on every return', plainText: "If Jane pauses to check with her support worker or takes a break, the session ends. Returning means completing multi-factor authentication from scratch. Each attempt is a fresh start. For someone who works at a slower pace, the timeout is not a one-time friction — it is a recurring gate.", stat: 'Over half of disabled claimants who did register online needed assistance doing so', source: 'House of Commons Work and Pensions Committee, 2019' },
      ],
    },
  ],
}
