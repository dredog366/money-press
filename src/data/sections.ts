import type { Section } from '@/types';

export const SECTIONS: Section[] = [
  {
    id: 'property-ownership',
    title: 'Property Ownership',
    description: 'Understand what real property is, how ownership works, and who can own what.',
    icon: '🏠',
    examWeight: 15,
    topics: [
      {
        id: 'bundle-of-rights',
        sectionId: 'property-ownership',
        title: 'Bundle of Rights',
        summary: 'Real property ownership is really a "bundle" of legal rights — not just the physical land.',
        examTip: 'Questions often ask which rights a government action removes. Know DEEP-C cold.',
        microLessonId: 'ml-bundle-of-rights',
      },
      {
        id: 'concurrent-ownership',
        sectionId: 'property-ownership',
        title: 'Concurrent Ownership',
        summary: 'Two or more people can own property together — but HOW they own it changes everything.',
        examTip: 'Joint Tenancy vs. Tenancy in Common is a very common exam trap. Know the 4 unities.',
        microLessonId: 'ml-concurrent-ownership',
      },
      {
        id: 'encumbrances',
        sectionId: 'property-ownership',
        title: 'Encumbrances & Liens',
        summary: 'Claims or burdens against a property that survive a sale unless cleared.',
        examTip: '"Does the new buyer take the property subject to the lien?" — yes, unless disclosed and cleared at closing.',
        microLessonId: 'ml-encumbrances',
      },
    ],
  },
  {
    id: 'government-powers',
    title: 'Government Powers',
    description: 'Four powers the government holds over all real property — remember PETE.',
    icon: '🏛️',
    examWeight: 5,
    topics: [
      {
        id: 'police-power',
        sectionId: 'government-powers',
        title: 'Police Power & Zoning',
        summary: 'The state\'s right to regulate property use for the public good — zoning is the main tool.',
        examTip: 'Police power is the ONLY government power with no compensation to the owner.',
        microLessonId: 'ml-police-power',
      },
      {
        id: 'eminent-domain',
        sectionId: 'government-powers',
        title: 'Eminent Domain',
        summary: 'Government can take private property for public use — but must pay fair market value.',
        examTip: 'The legal process is called condemnation. "Just compensation" = fair market value, not what the owner thinks it\'s worth.',
        microLessonId: 'ml-eminent-domain',
      },
      {
        id: 'taxation-escheat',
        sectionId: 'government-powers',
        title: 'Taxation & Escheat',
        summary: 'Ad valorem taxes are based on assessed value. Escheat returns property to the state when there are no heirs.',
        examTip: 'Ad valorem = "according to value." Special assessments pay for local improvements (sidewalks, sewers).',
        microLessonId: 'ml-taxation-escheat',
      },
    ],
  },
  {
    id: 'valuation',
    title: 'Valuation & Appraisal',
    description: 'How licensed appraisers estimate what a property is worth — three approaches.',
    icon: '📊',
    examWeight: 14,
    topics: [
      {
        id: 'three-approaches',
        sectionId: 'valuation',
        title: 'Three Approaches to Value',
        summary: 'Sales Comparison, Cost, and Income — every appraisal uses at least one of these.',
        examTip: 'Residential = Sales Comparison primary. Income property = Income Approach primary. New/unique = Cost Approach.',
        microLessonId: 'ml-three-approaches',
      },
      {
        id: 'appraisal-principles',
        sectionId: 'valuation',
        title: 'Appraisal Principles',
        summary: 'Key economic principles that drive how value is estimated.',
        examTip: 'Substitution is the FOUNDATION of all three approaches. Know it first.',
        microLessonId: 'ml-appraisal-principles',
      },
      {
        id: 'depreciation',
        sectionId: 'valuation',
        title: 'Depreciation Types',
        summary: 'Loss in value from three sources: wear, design flaws, or outside factors.',
        examTip: 'External obsolescence is the ONLY type that is incurable AND comes from outside the property.',
        microLessonId: 'ml-depreciation',
      },
    ],
  },
  {
    id: 'financing',
    title: 'Real Estate Finance',
    description: 'Mortgages, loan types, LTV, and what happens when borrowers can\'t pay.',
    icon: '💰',
    examWeight: 14,
    topics: [
      {
        id: 'mortgage-instruments',
        sectionId: 'financing',
        title: 'Mortgage Instruments',
        summary: 'The promissory note is the IOU; the mortgage/deed of trust secures it against the property.',
        examTip: 'You can have a note without a mortgage, but NOT a mortgage without a note. The note is primary.',
        microLessonId: 'ml-mortgage-instruments',
      },
      {
        id: 'loan-types',
        sectionId: 'financing',
        title: 'Loan Types (FHA / VA / Conventional)',
        summary: 'Each loan type has different down payment, insurance, and eligibility rules.',
        examTip: 'VA loans have NO down payment and NO PMI. FHA minimum down = 3.5% (with 580+ credit score).',
        microLessonId: 'ml-loan-types',
      },
      {
        id: 'foreclosure',
        sectionId: 'financing',
        title: 'Foreclosure Methods',
        summary: 'When a borrower defaults, the lender\'s process to take back the property differs by state.',
        examTip: 'Judicial foreclosure goes through the courts. Non-judicial (power of sale) does not.',
        microLessonId: 'ml-foreclosure',
      },
    ],
  },
  {
    id: 'agency',
    title: 'Agency Law',
    description: 'Who represents whom, what duties they owe, and how those relationships are created.',
    icon: '🤝',
    examWeight: 17,
    topics: [
      {
        id: 'agency-relationships',
        sectionId: 'agency',
        title: 'Agency Relationships',
        summary: 'The principal hires an agent to act on their behalf. The client = principal. The customer ≠ principal.',
        examTip: '"Client" and "customer" are NOT interchangeable on the exam. The client has full fiduciary duties; the customer only gets honest treatment.',
        microLessonId: 'ml-agency-relationships',
      },
      {
        id: 'fiduciary-duties',
        sectionId: 'agency',
        title: 'Fiduciary Duties (OLD CAR)',
        summary: 'An agent owes six duties to the principal: Obedience, Loyalty, Disclosure, Confidentiality, Accounting, Reasonable care.',
        examTip: 'Loyalty = putting the client\'s interests ABOVE your own. This is the most-tested duty.',
        microLessonId: 'ml-fiduciary-duties',
      },
      {
        id: 'dual-agency',
        sectionId: 'agency',
        title: 'Dual Agency & Disclosure',
        summary: 'When one agent (or brokerage) represents both buyer and seller — legal only with written consent.',
        examTip: 'Dual agency MUST be disclosed and consented to in writing. Without consent, it\'s a license law violation.',
        microLessonId: 'ml-dual-agency',
      },
    ],
  },
  {
    id: 'contracts',
    title: 'Contracts',
    description: 'How real estate contracts are formed, what makes them valid, and what happens when they break.',
    icon: '📝',
    examWeight: 17,
    topics: [
      {
        id: 'contract-essentials',
        sectionId: 'contracts',
        title: 'Contract Essentials (CALM)',
        summary: 'A valid real estate contract needs four things: Competent parties, Agreement (offer + acceptance), Lawful purpose, Money (consideration).',
        examTip: 'Real estate contracts MUST be in writing to be enforceable (Statute of Frauds). Verbal agreements don\'t count.',
        microLessonId: 'ml-contract-essentials',
      },
      {
        id: 'contract-types',
        sectionId: 'contracts',
        title: 'Contract Types & Status',
        summary: 'Bilateral vs unilateral; and whether a contract is valid, void, voidable, or unenforceable.',
        examTip: 'Voidable ≠ void. A voidable contract is valid until a party chooses to cancel it (e.g., minor signed it).',
        microLessonId: 'ml-contract-types',
      },
      {
        id: 'purchase-agreement',
        sectionId: 'contracts',
        title: 'Purchase Agreement & Contingencies',
        summary: 'The purchase agreement is the main contract of sale. Contingencies protect the buyer\'s earnest money.',
        examTip: 'Earnest money is NOT required for a valid contract, but is standard practice to show good faith.',
        microLessonId: 'ml-purchase-agreement',
      },
    ],
  },
  {
    id: 'fair-housing',
    title: 'Fair Housing',
    description: 'Federal law prohibits discrimination in housing. Know the 7 protected classes and what\'s illegal.',
    icon: '⚖️',
    examWeight: 8,
    topics: [
      {
        id: 'protected-classes',
        sectionId: 'fair-housing',
        title: 'The 7 Protected Classes',
        summary: 'The Fair Housing Act of 1968 (amended 1988) protects: Race, Color, Religion, National Origin, Sex, Familial Status, Disability.',
        examTip: 'Race and Color are separate protected classes. Many students merge them into one and miss this.',
        microLessonId: 'ml-protected-classes',
      },
      {
        id: 'prohibited-practices',
        sectionId: 'fair-housing',
        title: 'Prohibited Practices',
        summary: 'Steering, blockbusting, and redlining are the big three illegal practices.',
        examTip: 'Steering = guiding buyers toward/away from neighborhoods based on protected class. Very commonly tested.',
        microLessonId: 'ml-prohibited-practices',
      },
      {
        id: 'exemptions',
        sectionId: 'fair-housing',
        title: 'Fair Housing Exemptions',
        summary: 'A few narrow exemptions exist — but they NEVER apply to real estate agents or brokers.',
        examTip: 'Any scenario involving a real estate agent = NO exemption applies, ever. The agent cannot discriminate regardless.',
        microLessonId: 'ml-exemptions',
      },
    ],
  },
  {
    id: 'property-transfer',
    title: 'Property Transfer',
    description: 'Deeds, title, closing, and what happens when property changes hands.',
    icon: '🔑',
    examWeight: 8,
    topics: [
      {
        id: 'deed-types',
        sectionId: 'property-transfer',
        title: 'Types of Deeds',
        summary: 'General Warranty, Special Warranty, and Quitclaim — ranked from most to least protection for the buyer.',
        examTip: 'Quitclaim gives ZERO guarantees. It just transfers whatever interest (if any) the grantor has.',
        microLessonId: 'ml-deed-types',
      },
      {
        id: 'title-insurance',
        sectionId: 'property-transfer',
        title: 'Title Search & Insurance',
        summary: 'Title search finds problems in the chain of ownership. Title insurance protects against hidden defects.',
        examTip: 'Owner\'s title policy protects the buyer. Lender\'s (mortgagee\'s) title policy protects the lender. Both are often purchased at closing.',
        microLessonId: 'ml-title-insurance',
      },
      {
        id: 'closing-process',
        sectionId: 'property-transfer',
        title: 'Closing & Proration',
        summary: 'At closing, ownership transfers. Costs and prepaid items are prorated between buyer and seller.',
        examTip: 'Proration = fair division of ongoing costs. Taxes paid in arrears benefit the buyer (seller owes their portion).',
        microLessonId: 'ml-closing-process',
      },
    ],
  },
];

export const getSectionById = (id: string): Section | undefined =>
  SECTIONS.find((s) => s.id === id);

export const getTopicById = (id: string) => {
  for (const section of SECTIONS) {
    const topic = section.topics.find((t) => t.id === id);
    if (topic) return { topic, section };
  }
  return null;
};

export const ALL_TOPICS = SECTIONS.flatMap((s) => s.topics);
