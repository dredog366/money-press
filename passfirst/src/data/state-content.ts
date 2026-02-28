import type { USState } from '@/types';

// ─── State-specific topic metadata ────────────────────────────────────────────

export interface StateTopicInfo {
  id: string;
  title: string;
  summary: string;
  examTip: string;
  whatItIs: string;
  mnemonic: string;
  recallPrompts: string[];
}

export interface StateContent {
  state: USState;
  name: string;
  examInfo: string;
  passingScore: number;
  stateTopics: StateTopicInfo[];
  stateQuestions: StateQuestion[];
}

export interface StateQuestion {
  id: string;
  topicId: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  trapNote: string;
}

// ─── California ───────────────────────────────────────────────────────────────

const california: StateContent = {
  state: 'california',
  name: 'California',
  examInfo: '150 questions, 3.5 hours. Passing score: 70%. Administered by the DRE (Department of Real Estate).',
  passingScore: 70,
  stateTopics: [
    {
      id: 'ca-dre-licensing',
      title: 'CA DRE Licensing Requirements',
      summary: 'California requires 135 hours of pre-license education (3 courses: Real Estate Principles, Practice, and one elective) before taking the salesperson exam.',
      examTip: 'Know that the CA DRE issues licenses, not the NAR. Salesperson license requires passing exam + submitting fingerprints. Broker requires 2 years full-time salesperson experience + 8 college-level courses.',
      whatItIs: 'The California Department of Real Estate (DRE) is the state agency that licenses agents and brokers. Salesperson applicants must complete 135 hours of education, pass the state exam, and submit fingerprints for a background check.',
      mnemonic: 'CA = 135 hours, 3 courses (Principles + Practice + Elective). Broker = 2 years + 8 courses.',
      recallPrompts: [
        'How many pre-license education hours does California require for a salesperson license?',
        'Name the 3 required CA pre-license courses.',
        'What experience is required to get a California broker license?',
      ],
    },
    {
      id: 'ca-transfer-disclosure',
      title: 'CA Transfer Disclosure Statement (TDS)',
      summary: 'California requires sellers to complete a Transfer Disclosure Statement (TDS) for most residential 1–4 unit sales. It discloses known defects, features, and neighborhood issues.',
      examTip: 'TDS is required even if the property is sold "as-is." Sellers must complete it, the listing agent must review it, and the buyer\'s agent must deliver it. Buyers have 3 days (mail) or 5 days (personal delivery) to rescind after receipt.',
      whatItIs: 'The TDS is California\'s mandated seller disclosure form. The seller fills it out first, then both the listing agent and buyer\'s agent add their own section. It covers everything the seller knows about the property\'s condition.',
      mnemonic: 'TDS = Tell Everything Defective. Seller → Listing Agent → Buyer\'s Agent → Buyer. 3 days (mail) / 5 days (personal) to cancel.',
      recallPrompts: [
        'Who is required to complete the CA Transfer Disclosure Statement?',
        'Can a California seller refuse to complete the TDS if selling "as-is"?',
        'How many days does a buyer have to rescind after receiving the TDS?',
      ],
    },
    {
      id: 'ca-agency-disclosure',
      title: 'CA Agency Disclosure & Confirmation',
      summary: 'California requires written agency disclosure (AD form) to be given to buyers and sellers as soon as practicable. A separate Agency Confirmation (AC) is signed at or before the offer.',
      examTip: 'There are two separate documents: the AD (explains agency types — seller\'s agent, buyer\'s agent, dual agent) and the AC (confirms which type applies to this specific transaction). Dual agency in CA requires informed written consent from both buyer and seller.',
      whatItIs: 'California\'s agency disclosure law (Civil Code § 2079) requires agents to provide a written disclosure explaining the different agency roles. The confirmation form then specifies which role the agent is playing in the actual transaction.',
      mnemonic: 'AD first (explain the concept), AC next (confirm the specific deal). Dual agency needs WRITTEN consent from BOTH parties.',
      recallPrompts: [
        'What is the difference between the CA Agency Disclosure form and the Agency Confirmation form?',
        'When must the CA Agency Disclosure be given to the buyer?',
        'What is required for a dual agency arrangement to be legal in California?',
      ],
    },
  ],
  stateQuestions: [
    {
      id: 'ca-q1',
      topicId: 'ca-dre-licensing',
      text: 'In California, how many hours of pre-license education must a salesperson applicant complete before taking the state exam?',
      options: ['45 hours', '90 hours', '135 hours', '180 hours'],
      correctIndex: 2,
      explanation: '135 hours are required in California — three 45-hour courses: Real Estate Principles, Real Estate Practice, and one DRE-approved elective.',
      trapNote: 'Some states require 40–72 hours. California\'s 135 hours is significantly higher than most states.',
    },
    {
      id: 'ca-q2',
      topicId: 'ca-transfer-disclosure',
      text: 'A California seller wants to sell their home "as-is." Which statement is TRUE regarding the Transfer Disclosure Statement?',
      options: [
        'The TDS is not required for "as-is" sales',
        'The seller must still complete the TDS even when selling "as-is"',
        'Only the listing agent must complete the TDS for "as-is" sales',
        'The TDS can be waived if the buyer signs a written waiver',
      ],
      correctIndex: 1,
      explanation: '"As-is" does NOT eliminate the TDS requirement in California. The seller must still disclose all known material facts. "As-is" simply means the seller won\'t make repairs — it doesn\'t mean hiding defects.',
      trapNote: 'Many students think "as-is" means no disclosure. Wrong! Disclosure is always required regardless of sale terms.',
    },
    {
      id: 'ca-q3',
      topicId: 'ca-agency-disclosure',
      text: 'In California, when a real estate agent represents BOTH the buyer and seller in the same transaction, this is called:',
      options: ['Designated agency', 'Dual agency', 'Sub-agency', 'Transaction brokerage'],
      correctIndex: 1,
      explanation: 'Representing both buyer and seller is dual agency in California. It requires informed written consent from both the buyer and seller. California does not recognize transaction brokerage.',
      trapNote: 'California doesn\'t use "transaction broker" terminology. Always check state-specific agency vocabulary.',
    },
    {
      id: 'ca-q4',
      topicId: 'ca-dre-licensing',
      text: 'To qualify for a California broker\'s license, a licensee must have:',
      options: [
        '1 year of experience as a licensed salesperson',
        '2 years of full-time experience as a licensed salesperson within the past 5 years',
        '3 years of experience and 4 college courses',
        '5 years of continuous experience',
      ],
      correctIndex: 1,
      explanation: 'California requires 2 years of full-time licensed salesperson experience within the past 5 years, plus completion of 8 college-level real estate courses.',
      trapNote: 'Part-time experience counts at a reduced rate. The experience must be within the last 5 years — old experience doesn\'t always qualify.',
    },
  ],
};

// ─── Texas ────────────────────────────────────────────────────────────────────

const texas: StateContent = {
  state: 'texas',
  name: 'Texas',
  examInfo: '125 questions (85 national + 40 state), 4 hours. Passing: 56/85 national, 21/40 state. Administered by TREC.',
  passingScore: 70,
  stateTopics: [
    {
      id: 'tx-trec',
      title: 'TREC — Texas Real Estate Commission',
      summary: 'TREC (Texas Real Estate Commission) licenses brokers, agents, and inspectors. Salesperson applicants need 180 hours of pre-license education. License name: Sales Agent (not "salesperson").',
      examTip: 'Texas calls them "sales agents," not salespersons. TREC requires 180 hours (6 courses × 30 hours) for a sales agent license. Brokers need 900 hours + 4 years active as a sales agent.',
      whatItIs: 'TREC regulates all real estate activity in Texas. It sets education requirements, approves forms (TREC forms are mandatory for most transactions), enforces license law, and oversees continuing education.',
      mnemonic: 'TREC = Texas Real Estate Commission. 180 hours = 6 courses × 30 hrs each. Broker = 900 hours + 4 years.',
      recallPrompts: [
        'What Texas agency issues real estate licenses?',
        'How many pre-license education hours does Texas require for a sales agent?',
        'What is the Texas term for a licensed real estate salesperson?',
      ],
    },
    {
      id: 'tx-one-to-four',
      title: 'TX One-to-Four Family Residential Contract',
      summary: 'Texas uses TREC-approved promulgated forms for most residential transactions. The One-to-Four Family Residential Contract is the standard purchase contract for single-family homes.',
      examTip: 'TREC promulgated forms are MANDATORY for licensed agents — you cannot use your own forms for transactions covered by a promulgated form. The Third Party Financing Addendum must be used when the buyer is obtaining a loan.',
      whatItIs: 'TREC publishes standardized real estate forms that all licensed agents must use. The One-to-Four form covers residential properties of 1–4 units. Using a non-promulgated form when one exists is a license law violation.',
      mnemonic: 'TX = Promulgated forms MANDATORY (not optional). When in doubt, use TREC\'s form.',
      recallPrompts: [
        'Are TREC promulgated forms optional or mandatory in Texas?',
        'What addendum must a Texas agent use when the buyer is financing with a mortgage?',
        'What is the penalty for a Texas agent who refuses to use a TREC promulgated form?',
      ],
    },
    {
      id: 'tx-seller-disclosure',
      title: 'TX Seller\'s Disclosure Notice',
      summary: 'Texas requires a Seller\'s Disclosure Notice for most residential sales. Sellers must disclose known defects in the property. Unlike CA, the agent does not complete a separate section.',
      examTip: 'In Texas, it\'s the SELLER (not the agent) who completes the disclosure. The agent must advise the seller to complete it but doesn\'t fill it out. New construction and foreclosures are typically exempt.',
      whatItIs: 'The Texas Seller\'s Disclosure Notice is a form the seller fills out disclosing known material facts about the property\'s condition. Texas Property Code § 5.008 governs this requirement.',
      mnemonic: 'TX Seller Disclosure = Seller fills it out ALONE. Agent advises, doesn\'t write. New builds + foreclosures = exempt.',
      recallPrompts: [
        'Who fills out the Texas Seller\'s Disclosure Notice?',
        'Are new construction homes exempt from the Texas Seller\'s Disclosure requirement?',
        'What Texas code section governs the seller disclosure requirement?',
      ],
    },
  ],
  stateQuestions: [
    {
      id: 'tx-q1',
      topicId: 'tx-trec',
      text: 'In Texas, a person who holds a real estate license working under a broker is called a:',
      options: ['Real estate salesperson', 'Sales agent', 'Associate broker', 'Licensed agent'],
      correctIndex: 1,
      explanation: 'Texas uses the term "sales agent" for licensees working under a broker. This is a key Texas-specific terminology difference from most other states.',
      trapNote: 'If you see "salesperson" on a Texas exam question, recognize that the correct Texas term is "sales agent."',
    },
    {
      id: 'tx-q2',
      topicId: 'tx-one-to-four',
      text: 'A Texas licensee is representing a buyer purchasing a home. The buyer wants to use a loan. The licensee should:',
      options: [
        'Draft their own financing contingency clause',
        'Use the TREC Third Party Financing Addendum',
        'Use whatever form the title company provides',
        'Ask the lender to handle the financing contingency',
      ],
      correctIndex: 1,
      explanation: 'TREC promulgated forms are mandatory. When a buyer is financing, the agent MUST use the TREC Third Party Financing Addendum. Creating your own clause is a license law violation.',
      trapNote: 'Texas is strict about promulgated forms. Remember: mandatory, not optional.',
    },
    {
      id: 'tx-q3',
      topicId: 'tx-seller-disclosure',
      text: 'Which of the following transactions is typically EXEMPT from the Texas Seller\'s Disclosure requirement?',
      options: [
        'A resale of a 10-year-old single-family home',
        'A condominium sale',
        'A newly constructed home sold by a builder',
        'A home sold by a divorced couple',
      ],
      correctIndex: 2,
      explanation: 'New construction sold by the builder is typically exempt from the Texas Seller\'s Disclosure Notice requirement. Foreclosure sales and transfers between spouses are also exempt.',
      trapNote: 'Know the TX exemptions: new builds (builder-owned), foreclosures, court-ordered sales, spouse-to-spouse transfers.',
    },
  ],
};

// ─── Florida ──────────────────────────────────────────────────────────────────

const florida: StateContent = {
  state: 'florida',
  name: 'Florida',
  examInfo: '100 questions, 3.5 hours. Passing score: 75%. Administered by FREC through DBPR.',
  passingScore: 75,
  stateTopics: [
    {
      id: 'fl-frec',
      title: 'FREC — Florida Real Estate Commission',
      summary: 'FREC (Florida Real Estate Commission) governs real estate licensing in Florida under the DBPR (Department of Business and Professional Regulation). Sales associates need 63 hours pre-license.',
      examTip: 'Florida calls the entry-level license "sales associate" (not salesperson). 63 hours for a sales associate, 72 hours for a broker. Florida also requires a 45-hour post-license course before the first renewal.',
      whatItIs: 'FREC is the regulatory commission that sets standards, approves education, and disciplines licensees. It operates under the DBPR. Florida uses "sales associate" for the entry-level license.',
      mnemonic: 'FL = FREC under DBPR. 63 hours (Sales Associate) → 45 hours post-license before first renewal. Broker = 72 hours.',
      recallPrompts: [
        'What Florida agency oversees the real estate commission?',
        'What is the Florida term for an entry-level real estate licensee?',
        'How many post-license hours must a Florida sales associate complete before their first renewal?',
      ],
    },
    {
      id: 'fl-transaction-broker',
      title: 'FL Transaction Broker',
      summary: 'Florida\'s default agency relationship is transaction broker — a limited representation where the licensee assists both buyer and seller without being a fiduciary to either party.',
      examTip: 'In Florida, if no agency agreement is signed, the default is TRANSACTION BROKER (not buyer\'s or seller\'s agent). A transaction broker owes limited duties: deal honestly and fairly, account for all funds, use skill/care/diligence, present all offers, disclose known defects, keep info confidential.',
      whatItIs: 'Florida\'s transaction broker is a licensee who helps facilitate a deal but doesn\'t fully represent either side. It\'s a middle position — more than no relationship, less than full representation. Florida is unique in making this the DEFAULT.',
      mnemonic: 'FL default = Transaction Broker (TB). TB = 7 duties (HAAPDCK: Honest, Account, Apply skill, Present offers, Disclose defects, Confidentiality, Keep all promises).',
      recallPrompts: [
        'What is Florida\'s default agency relationship if no written agreement is signed?',
        'What are a Florida transaction broker\'s limited duties?',
        'Can a Florida buyer choose to have a single agent instead of a transaction broker?',
      ],
    },
    {
      id: 'fl-johnson-v-davis',
      title: 'FL Material Defect Disclosure (Johnson v. Davis)',
      summary: 'Florida\'s landmark case Johnson v. Davis (1985) established that sellers must disclose known material defects that are not readily observable. This applies even without a statutory disclosure form.',
      examTip: 'Florida has NO mandatory seller disclosure FORM like Texas or California — but Johnson v. Davis creates a COMMON LAW duty to disclose known material defects that aren\'t obvious. Failure to disclose = fraud/misrepresentation.',
      whatItIs: 'In Johnson v. Davis, the Florida Supreme Court ruled that a seller who knows of material defects not visible to the buyer must disclose them. This became the legal foundation for disclosure obligations in Florida real estate.',
      mnemonic: 'Johnson v. Davis = FL disclosure rule: If you KNOW it, SHOW it — even without a mandatory form.',
      recallPrompts: [
        'What landmark Florida case established the duty to disclose known material defects?',
        'Does Florida require a mandatory seller disclosure form for all residential sales?',
        'Under Johnson v. Davis, what must a Florida seller disclose?',
      ],
    },
  ],
  stateQuestions: [
    {
      id: 'fl-q1',
      topicId: 'fl-frec',
      text: 'In Florida, what is the entry-level real estate license called?',
      options: ['Salesperson', 'Sales associate', 'Licensed broker associate', 'Agent'],
      correctIndex: 1,
      explanation: 'Florida uses the term "sales associate" for the entry-level license. This is different from most states that use "salesperson."',
      trapNote: 'Florida terminology: Sales Associate (entry) and Broker (advanced). Not "salesperson."',
    },
    {
      id: 'fl-q2',
      topicId: 'fl-transaction-broker',
      text: 'A Florida buyer contacts a real estate brokerage but does NOT sign any agency agreement. What relationship is presumed by Florida law?',
      options: [
        'No agency — the licensee is a subagent',
        'Buyer\'s agent — the licensee represents the buyer',
        'Transaction broker — the licensee represents neither party as a fiduciary',
        'Dual agent — the licensee represents both parties',
      ],
      correctIndex: 2,
      explanation: 'Florida\'s default is transaction broker. Without a written agreement establishing single agency or no-brokerage, the law presumes transaction broker status.',
      trapNote: 'This is uniquely Florida. Most states default to buyer\'s or seller\'s agent, or no agency. Florida defaults to transaction broker.',
    },
    {
      id: 'fl-q3',
      topicId: 'fl-johnson-v-davis',
      text: 'A Florida seller knows their home has a recurring roof leak that is not visible during a showing. Under Florida law, the seller:',
      options: [
        'Does not need to disclose if there is no mandatory disclosure form',
        'Must disclose the known defect under the common law principle established in Johnson v. Davis',
        'Only needs to disclose if the buyer asks directly',
        'Can avoid disclosure by selling the property "as-is"',
      ],
      correctIndex: 1,
      explanation: 'Johnson v. Davis requires Florida sellers to disclose known material defects that are not readily observable, even without a statutory form. Concealing the roof leak would be fraudulent misrepresentation.',
      trapNote: '"As-is" does not eliminate disclosure of known facts in Florida any more than it does in California.',
    },
  ],
};

// ─── New York ─────────────────────────────────────────────────────────────────

const newYork: StateContent = {
  state: 'new-york',
  name: 'New York',
  examInfo: '75 questions, 1.5 hours. Passing score: 70%. Administered by the NY DOS (Department of State).',
  passingScore: 70,
  stateTopics: [
    {
      id: 'ny-dos-licensing',
      title: 'NY DOS Licensing Requirements',
      summary: 'New York requires 77 hours of pre-license education for a salesperson. The Department of State (DOS) issues licenses. Salesperson license is good for 2 years.',
      examTip: 'New York calls the entry-level license "salesperson" (not sales associate). 77 hours for salesperson, 120 hours for broker. NY brokers need 2 years of experience or a 4-year degree + 1 year experience.',
      whatItIs: 'The NY Department of State (DOS) licenses real estate professionals. The 77-hour salesperson course covers principles, agency, fair housing, closings, and more. Licenses expire every 2 years.',
      mnemonic: 'NY DOS = 77 hours for salesperson, 120 hours for broker. License lasts 2 years.',
      recallPrompts: [
        'What New York agency licenses real estate agents?',
        'How many pre-license education hours does New York require for a salesperson?',
        'How long is a New York real estate salesperson license valid?',
      ],
    },
    {
      id: 'ny-agency-disclosure',
      title: 'NY Agency Disclosure Form',
      summary: 'New York requires licensees to give buyers and sellers an Agency Disclosure Form at the FIRST substantive contact. If representing both parties, the licensee must get written consent for dual agency.',
      examTip: 'NY is strict about WHEN the disclosure must be given: at or before the first "substantive contact" (any discussion about terms, price, or motivation). Missing this timing is a common exam trap.',
      whatItIs: 'New York Real Property Law § 443 requires agents to give a disclosure form explaining whether they represent the buyer, seller, or both. It must be signed by the client before any substantive discussion about the property.',
      mnemonic: 'NY Agency Disclosure = Give it at FIRST SUBSTANTIVE CONTACT. Not later. Not at the offer. FIRST contact.',
      recallPrompts: [
        'When must a New York licensee give the Agency Disclosure Form to a buyer?',
        'What does "first substantive contact" mean in New York agency law?',
        'What NY law governs the agency disclosure requirement?',
      ],
    },
    {
      id: 'ny-property-condition',
      title: 'NY Property Condition Disclosure Statement',
      summary: 'New York requires a Property Condition Disclosure Statement (PCDS) for residential 1–4 unit sales. If the seller doesn\'t provide it, the buyer receives a $500 credit at closing.',
      examTip: 'NY\'s PCDS is unique: if the seller refuses to fill it out or deliver it, the buyer gets a $500 credit — not the right to cancel. The seller can still sell without it. This is the exam trick NY loves to test.',
      whatItIs: 'The PCDS is a disclosure form covering the property\'s known conditions (roof, foundation, water, etc.). Sellers of 1–4 unit residential property must provide it. Unlike CA\'s TDS, the NY remedy for non-delivery is a $500 credit, not cancellation rights.',
      mnemonic: 'NY PCDS: No form = $500 credit. NOT cancellation. NOT $5000. Just $500.',
      recallPrompts: [
        'What happens in New York if a seller fails to deliver the Property Condition Disclosure Statement?',
        'What is the dollar amount of the credit a buyer receives in NY when the PCDS is not provided?',
        'Does the NY Property Condition Disclosure Statement give the buyer cancellation rights if not provided?',
      ],
    },
  ],
  stateQuestions: [
    {
      id: 'ny-q1',
      topicId: 'ny-dos-licensing',
      text: 'Which New York state agency is responsible for licensing real estate agents and brokers?',
      options: [
        'New York Real Estate Commission (NYREC)',
        'Department of Business and Professional Regulation (DBPR)',
        'Department of State (DOS)',
        'Division of Real Estate (DRE)',
      ],
      correctIndex: 2,
      explanation: 'The New York Department of State (DOS) licenses real estate professionals. This is different from California (DRE), Texas (TREC), and Florida (FREC/DBPR).',
      trapNote: 'Know your state agencies by state: CA = DRE, TX = TREC, FL = FREC/DBPR, NY = DOS.',
    },
    {
      id: 'ny-q2',
      topicId: 'ny-agency-disclosure',
      text: 'Under New York law, when must a real estate agent provide the Agency Disclosure Form to a buyer?',
      options: [
        'At the time of signing a purchase offer',
        'At the first open house the buyer attends',
        'At or before the first substantive contact',
        'Before the closing appointment',
      ],
      correctIndex: 2,
      explanation: 'New York Real Property Law § 443 requires the Agency Disclosure Form to be given at the first substantive contact — meaning any meeting or communication where the agent discusses the buyer\'s motivations, price, or terms.',
      trapNote: 'Agents who wait until the offer is signed are violating NY disclosure timing requirements.',
    },
    {
      id: 'ny-q3',
      topicId: 'ny-property-condition',
      text: 'A New York seller refuses to complete the Property Condition Disclosure Statement. What is the legal consequence?',
      options: [
        'The buyer may cancel the transaction',
        'The seller receives a $500 fine from the DOS',
        'The buyer receives a $500 credit at closing',
        'The sale cannot proceed without the disclosure',
      ],
      correctIndex: 2,
      explanation: 'New York\'s unique remedy: if the PCDS is not delivered to the buyer before signing a contract, the buyer is entitled to a $500 credit at closing. There is no cancellation right and no fine to the seller.',
      trapNote: 'This is one of NY\'s most tested exam quirks. It\'s $500 credit — not the right to cancel, not $5,000.',
    },
    {
      id: 'ny-q4',
      topicId: 'ny-dos-licensing',
      text: 'How many pre-license education hours are required for a New York real estate salesperson?',
      options: ['45 hours', '63 hours', '77 hours', '90 hours'],
      correctIndex: 2,
      explanation: 'New York requires 77 hours of pre-license education for a salesperson license. This is a unique number — most states use 45, 60, or 63 hours.',
      trapNote: '77 is the NY number. Don\'t confuse with FL (63), TX (180), or CA (135).',
    },
  ],
};

// ─── Exports ──────────────────────────────────────────────────────────────────

export const STATE_CONTENT: Record<string, StateContent> = {
  california,
  texas,
  florida,
  'new-york': newYork,
};

export function getStateContent(state: USState): StateContent | null {
  return STATE_CONTENT[state] ?? null;
}

export const ALL_STATE_TOPICS = Object.values(STATE_CONTENT).flatMap((sc) => sc.stateTopics);
export const ALL_STATE_QUESTIONS = Object.values(STATE_CONTENT).flatMap((sc) => sc.stateQuestions);
