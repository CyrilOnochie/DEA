export const STEP4 = {
  stepNumber: 4, platform: 'GOV.UK', title: 'Submit your claim', totalSteps: 4,
  requirements: [
    { id: 'declaration', icon: 'declaration', caption: 'Read and sign the legal declaration before submitting' },
    { id: 'interview', icon: 'interview', caption: 'Attend a Jobcentre interview and sign your claimant commitment within 7 days' },
  ],
  flags: [
    {
      personaKey: 'tosin',
      items: [
        { severity: 'soft', cardLabel: 'The declaration is the densest formal English in the entire process', plainText: "Before submitting, Tosin must read and agree to a legal declaration confirming her details are correct. This uses the most formal legal language in the entire application. Citizens Advice specifically identifies migrant claimants as disproportionately affected by language barriers throughout the UC process.", stat: 'Citizens Advice specifically identifies migrant claimants as disproportionately affected by language barriers throughout the UC process', source: 'Citizens Advice, Disconnected: How Digital Exclusion Blocks Access to Universal Credit' },
        { severity: 'workaround', cardLabel: 'A work coach can help at the interview — if she gets there', plainText: "The Jobcentre interview gives Tosin a chance to speak with someone face to face. But only if she has successfully submitted first — meaning she has agreed to a legal declaration she may not have fully understood.", stat: 'Help to Claim uptake among migrant communities is lower without active signposting', source: 'Citizens Advice, Help to Claim programme documentation, 2020' },
      ],
    },
    {
      personaKey: 'jane',
      items: [
        { severity: 'soft', cardLabel: 'The claimant commitment must be signed within 7 days or the claim closes', plainText: "The commitment is written in formal legal English. Jane needs time and her support worker's help to understand what she is agreeing to. The seven-day deadline under formal language conditions creates real risk of the claim closing before she can accept.", stat: 'Mencap: needing a support worker to complete a standard civic process is a design failure, not a solution', source: 'Mencap position statement on digital exclusion' },
        { severity: 'workaround', cardLabel: 'Support worker can attend the Jobcentre interview', plainText: "Jane's support worker can attend the interview and help her understand the commitment. But as Mencap explicitly states: assistance that should not be necessary for a standard civic process is not a solution — it is evidence of a design failure.", stat: 'Approximately 1.5 million people in the UK have a learning disability', source: 'Mencap, 2024' },
      ],
    },
  ],
}
