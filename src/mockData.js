export const initialProfile = {
  name: 'Alex Morgan',
  title: 'Product Designer & UX Researcher',
  bio: 'I partner with early-stage teams to turn complex product challenges into clear, human-centered experiences. My process blends thoughtful research, practical systems, and close collaboration.',
  skills: ['Product design', 'UX research', 'Figma', 'Prototyping', 'Design systems', 'Accessibility', 'User testing'],
  years: 6,
  projectName: 'Fintech onboarding redesign',
  projectDetail: 'Reworked the account setup journey for a growing fintech product, improving onboarding completion by 28% and reducing support tickets by 19%.'
}

export const sampleAnalysis = {
  id: 'AN-10482', title: 'Product designer for fintech onboarding', company: 'Northstar Finance', companyMark: 'N', logoTone: 'logo-sage', date: 'Sep 24', score: 86,
  requiredSkills: ['Product design', 'UX research', 'Figma', 'Prototyping', 'User testing', 'Accessibility', 'Stakeholder communication'],
  preferredSkills: ['Fintech experience', 'Design systems', 'Data-informed iteration'],
  responsibilities: ['Map the current onboarding journey and identify friction points', 'Conduct user interviews and usability testing', 'Create wireframes and polished, accessible prototypes', 'Partner with product and engineering through implementation'],
  missingSkills: ['Stakeholder communication', 'Fintech experience'],
  description: 'We are looking for a product designer to help our early-stage fintech team improve the onboarding experience. You will conduct user research, map customer journeys, create wireframes and high-fidelity prototypes in Figma, and collaborate closely with product and engineering. Experience with accessibility standards, design systems, and data-informed iteration is preferred. The ideal partner communicates clearly and can share examples of measurable product outcomes.'
}

export const initialAnalyses = [sampleAnalysis,
  { ...sampleAnalysis, id: 'AN-10451', title: 'UX consultant for an education platform', company: 'Openfield Learning', companyMark: 'O', logoTone: 'logo-yellow', date: 'Sep 19', score: 74, requiredSkills: ['UX research', 'Information architecture', 'Wireframing', 'Usability testing', 'Workshop facilitation', 'Prototyping'], preferredSkills: ['Education technology', 'Accessibility', 'Content design'], missingSkills: ['Workshop facilitation', 'Education technology'], responsibilities: ['Audit the current learning experience', 'Facilitate discovery workshops with educators', 'Prototype and test improvements with learners', 'Document a practical product roadmap'] },
  { ...sampleAnalysis, id: 'AN-10396', title: 'Product design support for a climate startup', company: 'Morrow Energy', companyMark: 'M', logoTone: 'logo-blue', date: 'Sep 12', score: 91, requiredSkills: ['Product design', 'Figma', 'Design systems', 'Prototyping', 'Accessibility'], preferredSkills: ['Climate technology', 'Data visualization', 'B2B SaaS'], missingSkills: ['Climate technology'], responsibilities: ['Extend the company design system', 'Design key flows for a new dashboard', 'Collaborate with engineering on implementation', 'Present work and gather stakeholder feedback'] }
]

export function makeProposal(profile, analysis, version = 0) {
  const openers = [
    `Hi ${analysis.company} team,\n\nI was glad to find your opening for a ${analysis.title.toLowerCase()}. The chance to make a complex first-run experience feel clear and welcoming is exactly the kind of product challenge I enjoy.`,
    `Hello ${analysis.company} team,\n\nYour focus on improving the onboarding experience caught my eye. I would love to bring a research-led, practical design approach to this ${analysis.title.toLowerCase()} project.`,
    `Hi there,\n\nI am reaching out about the ${analysis.title.toLowerCase()} opportunity. Building experiences that help people feel confident from their very first interaction is work I care deeply about.`
  ]
  return `${openers[version % openers.length]}\n\nI am a ${profile.title.toLowerCase()} with ${profile.years} years of experience helping teams move from user insight to thoughtful, buildable product experiences. My work combines ${profile.skills.slice(0, 3).join(', ').toLowerCase()}, with close collaboration across product and engineering.\n\nRecently, I led ${profile.projectName.toLowerCase()}, where ${profile.projectDetail.charAt(0).toLowerCase()}${profile.projectDetail.slice(1)} That project strengthened how I balance user needs with measurable product outcomes.\n\nFor your team, I would start by understanding the current journey, identifying the moments of friction, and validating a focused set of improvements with real users. I would bring a clear process, considered prototypes, and steady communication throughout.\n\nWould you be open to a short conversation about your goals for this work? I would be happy to share a few relevant examples.\n\nBest,\n${profile.name}`
}

export function makeQuestions(analysis, profile) {
  return [
    { category: 'YOUR APPROACH', question: 'How would you approach improving this experience in your first few weeks?', answer: 'I would start by understanding the current journey and the team’s goals, then pair a quick review of available product data with a few conversations with users. From there, I would identify the highest-friction moments, align on a small set of hypotheses, and validate them with lightweight prototypes before moving into detailed design.' },
    { category: 'RELEVANT EXPERIENCE', question: `Can you walk us through a project similar to ${analysis.title.toLowerCase()}?`, answer: `A useful example is ${profile.projectName}. I would set the scene around the user challenge, explain how research shaped the direction, and share the outcome: ${profile.projectDetail}` },
    { category: 'COLLABORATION', question: 'How do you work with product and engineering partners when priorities shift?', answer: 'I keep the user goal visible, make trade-offs explicit, and bring partners into the work early. When scope changes, I revisit the impact together, identify what must remain true for users, and document a clear next step so the team can keep moving.' },
    { category: 'CRAFT & IMPACT', question: 'How do you know when a design solution is working?', answer: 'I agree on the intended behavior and useful signals with the team first. Depending on the problem, I combine usability observations with product measures such as completion, time to task, or support volume. I also make sure we leave room to learn after launch.' },
    { category: 'YOUR EXPERIENCE', question: 'What would you want to learn from us before getting started?', answer: 'I would ask how the team currently understands this journey, which user groups matter most, what has already been tried, and how success will be measured. I would also want to understand collaboration rhythms and any technical or accessibility constraints early.' }
  ]
}
