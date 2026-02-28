import type { TrapPair } from '@/types';

export const TRAP_PAIRS: TrapPair[] = [
  {
    id: 'trap-jt-tic',
    title: 'Joint Tenancy vs. Tenancy in Common',
    sectionId: 'property-ownership',
    conceptA: {
      name: 'Joint Tenancy',
      description: 'Co-ownership WITH right of survivorship. A deceased owner\'s share passes automatically to surviving joint tenants — not through the will.',
      keyFact: 'Requires 4 unities (TTIP): same Time, Title, Interest, Possession. Selling your share severs the JT for that share.',
    },
    conceptB: {
      name: 'Tenancy in Common',
      description: 'Co-ownership WITHOUT right of survivorship. Each owner\'s share is separate and transferable. At death it goes through the estate, not to other co-owners.',
      keyFact: 'Shares can be unequal. Any owner can sell or will their share independently. Only unity required: possession.',
    },
    mnemonic: 'JT = Joint Team (survivorship keeps it together). TIC = Team In Crisis (anyone can sell or will their share away).',
    dannyNote: 'Watch for a joint tenant DYING → JT survivors get it automatically (will cannot override). Watch for a joint tenant SELLING → that share converts to TIC. These two triggers are on almost every exam.',
    questions: [
      {
        id: 'tp-jt-tic-1',
        text: 'Two sisters own as joint tenants. One dies and leaves her interest to her son in her will. Who owns the property now?',
        answer: 'A',
        explanation: 'A — The surviving sister gets the full property. Right of survivorship overrides the will. The will cannot control joint tenancy property.',
      },
      {
        id: 'tp-jt-tic-2',
        text: 'Three friends own as tenants in common. One wants to force a sale the others oppose. She can:',
        answer: 'B',
        explanation: 'B — File a partition action. Any TIC owner can force a court-ordered division or sale of the property. This is a key right that TIC owners have that cannot be blocked by the other co-owners.',
      },
      {
        id: 'tp-jt-tic-3',
        text: 'The single most important distinction between JT and TIC is:',
        answer: 'A',
        explanation: 'A — JT has right of survivorship; TIC does not. Everything else (equal possession, shared ownership) is common to both. Survivorship is the defining difference.',
      },
    ],
  },
  {
    id: 'trap-deeds',
    title: 'General Warranty vs. Special Warranty vs. Quitclaim',
    sectionId: 'property-transfer',
    conceptA: {
      name: 'General Warranty Deed',
      description: 'Grantor warrants title against ALL claims from ALL time — including before the grantor\'s ownership. Maximum protection for the buyer.',
      keyFact: 'Standard in most residential sales. Grantor personally liable if any defect surfaces from any era.',
    },
    conceptB: {
      name: 'Special Warranty Deed',
      description: 'Grantor only warrants against claims arising DURING their period of ownership. "I only guarantee my own time."',
      keyFact: 'Common in commercial sales and bank-owned (REO) properties. Bank can\'t warrant what prior owners did.',
    },
    conceptC: {
      name: 'Quitclaim Deed',
      description: 'No warranties whatsoever. Transfers "whatever interest I have" — which may be everything or nothing.',
      keyFact: 'Used in divorces, family transfers, clearing title clouds. Fast, no warranties to negotiate.',
    },
    mnemonic: 'General Wanda guarantees EVERYTHING. Special Steve only guarantees HIS time. Quitclaim Quinn just walks away.',
    dannyNote: '"Most protection" = General Warranty. "Divorce transfer" = Quitclaim. "Bank-owned REO sale" = Special Warranty or Quitclaim. "Strongest covenants" = General Warranty — every time.',
    questions: [
      {
        id: 'tp-deeds-1',
        text: 'An executor selling estate property can\'t know the full title history. Most appropriate deed:',
        answer: 'B',
        explanation: 'B — Special Warranty Deed. The executor can only guarantee the period they controlled the property. A general warranty would expose the estate to historical claims the executor has no way to know about.',
      },
      {
        id: 'tp-deeds-2',
        text: 'A court orders a divorcing husband to transfer his interest in the marital home to his wife. Typically used deed:',
        answer: 'C',
        explanation: 'C — Quitclaim Deed. Simple, fast, and appropriate when both parties know exactly what\'s being transferred and warranty protection isn\'t needed.',
      },
      {
        id: 'tp-deeds-3',
        text: 'Which deed creates the greatest personal liability for the grantor?',
        answer: 'A',
        explanation: 'A — General Warranty Deed. The grantor guarantees title from all time, including before their ownership. A defect from 50 years ago still exposes the general warranty grantor.',
      },
    ],
  },
  {
    id: 'trap-pete',
    title: 'Eminent Domain vs. Police Power',
    sectionId: 'government-powers',
    conceptA: {
      name: 'Eminent Domain',
      description: 'Government TAKES private property for public use and MUST pay just compensation (fair market value). Legal process = condemnation.',
      keyFact: 'Compensation required. Ownership transfers. Owner can contest the amount — not usually the taking itself.',
    },
    conceptB: {
      name: 'Police Power',
      description: 'Government REGULATES land use for public health, safety, and welfare — with NO compensation required.',
      keyFact: 'No ownership transfer. No compensation. Exception: "regulatory taking" that destroys all value may require compensation.',
    },
    mnemonic: 'TAKE = Eminent Domain = PAY. REGULATE = Police Power = no pay.',
    dannyNote: 'Key question: did the government TAKE your land or just LIMIT what you can do with it? Take = pay. Limit = no pay. Only exception: a total regulatory taking (destroying all value) blurs the line.',
    questions: [
      {
        id: 'tp-pete-1',
        text: 'A city requires all new homes to have fire sprinklers. No compensation paid. This is:',
        answer: 'B',
        explanation: 'B — Police Power. Building codes are a classic police power exercise — regulating for public safety, no ownership transferred, no compensation required.',
      },
      {
        id: 'tp-pete-2',
        text: 'State takes 10 feet of a front yard for road widening and pays fair market value. This is:',
        answer: 'A',
        explanation: 'A — Eminent Domain. The government took actual ownership of a portion of the property for public use (road) and paid just compensation. Key: they TOOK land, not just regulated it.',
      },
      {
        id: 'tp-pete-3',
        text: 'A regulation prohibits any development on wetlands. An owner\'s entire parcel is wetland, making it worthless. Owner sues for compensation. This is called:',
        answer: 'B',
        explanation: 'B — Inverse condemnation / regulatory taking. When regulation destroys all economic value, courts may require compensation even without formal condemnation.',
      },
    ],
  },
  {
    id: 'trap-fha-pmi',
    title: 'FHA MIP vs. Conventional PMI',
    sectionId: 'financing',
    conceptA: {
      name: 'FHA MIP (Mortgage Insurance Premium)',
      description: 'Required on ALL FHA loans. Two parts: upfront MIP at closing + annual MIP paid monthly. Cannot be cancelled on most loans originated after 2013.',
      keyFact: 'Paid to the government. Applies even with 20%+ down (on newer FHA loans). Cannot be avoided on FHA.',
    },
    conceptB: {
      name: 'PMI (Private Mortgage Insurance)',
      description: 'Required on conventional loans when LTV exceeds 80% (less than 20% down). Paid to a private insurer. Cancellable when borrower reaches 20% equity.',
      keyFact: 'Paid to private company. Protects lender. Cancellable by law (Homeowners Protection Act) at 20% equity.',
    },
    mnemonic: 'FHA → MIP (government). Conventional → PMI (private). VA → funding fee (one-time, no monthly insurance). USDA → guarantee fee.',
    dannyNote: '"Which loan requires MIP?" = FHA. Every time. VA has NO monthly insurance — just a one-time funding fee. The exam loves making you confuse these four insurance mechanisms.',
    questions: [
      {
        id: 'tp-fha-pmi-1',
        text: 'A buyer puts 25% down on an FHA loan. Will they owe mortgage insurance?',
        answer: 'A',
        explanation: 'A — Yes. FHA loans originated after June 2013 require MIP for the life of the loan regardless of down payment (unless 10%+ down, after 11 years it drops). This differs from conventional PMI which cancels at 20% equity.',
      },
      {
        id: 'tp-fha-pmi-2',
        text: 'A conventional borrower reaches 80% LTV. Lender keeps charging PMI. The federal law that protects the borrower is:',
        answer: 'B',
        explanation: 'B — Homeowners Protection Act. It requires lenders to cancel PMI at 80% LTV (borrower request) and automatically at 78% LTV based on original amortization schedule.',
      },
      {
        id: 'tp-fha-pmi-3',
        text: 'Which loan has a one-time funding fee but NO monthly mortgage insurance?',
        answer: 'C',
        explanation: 'C — VA loan. VA charges an upfront funding fee (financeable into the loan) but zero monthly mortgage insurance. This makes VA very attractive for eligible veterans.',
      },
    ],
  },
  {
    id: 'trap-void-voidable',
    title: 'Void vs. Voidable vs. Unenforceable',
    sectionId: 'contracts',
    conceptA: {
      name: 'Void',
      description: 'No legal effect — never was a contract. As if it never existed. Neither party can enforce it.',
      keyFact: 'Examples: contract for illegal purpose, contract with no consideration.',
    },
    conceptB: {
      name: 'Voidable',
      description: 'A valid contract that the PROTECTED party (minor, fraud victim, person under duress) may choose to cancel. Until cancelled, it is enforceable.',
      keyFact: 'Only the protected party can void it. Adults cannot use the minor\'s age to escape.',
    },
    conceptC: {
      name: 'Unenforceable',
      description: 'Contract exists and may have had all required elements, but courts will not enforce it due to a procedural defect.',
      keyFact: 'Most common: oral real estate contract (Statute of Frauds). Both parties leave with what they have — no court order.',
    },
    mnemonic: 'VOID = dead at birth. VOIDABLE = alive but sick — one party can escape. UNENFORCEABLE = alive but court won\'t help.',
    dannyNote: 'Minor signs contract = voidable (minor can escape, adult cannot). Illegal purpose = void. Verbal real estate deal = unenforceable. These three show up constantly.',
    questions: [
      {
        id: 'tp-void-1',
        text: 'A seller threatens a buyer with harm unless they sign a purchase agreement. The buyer signs. Status:',
        answer: 'B',
        explanation: 'B — Voidable. Duress makes a contract voidable by the victim. The buyer can cancel; the seller remains bound until the buyer decides.',
      },
      {
        id: 'tp-void-2',
        text: 'Two parties verbally agree on a $2M commercial property sale. Nothing written. Status:',
        answer: 'C',
        explanation: 'C — Unenforceable. The Statute of Frauds requires real estate contracts in writing. Courts will not enforce the verbal agreement, leaving both parties where they started.',
      },
      {
        id: 'tp-void-3',
        text: 'Two parties contract in writing to sell stolen goods. Status:',
        answer: 'A',
        explanation: 'A — Void. Illegal purpose = no contract at all. Cannot be ratified or enforced. Courts ignore it entirely.',
      },
    ],
  },
  {
    id: 'trap-sbr',
    title: 'Steering vs. Blockbusting vs. Redlining',
    sectionId: 'fair-housing',
    conceptA: {
      name: 'Steering',
      description: 'Directing BUYERS toward or away from neighborhoods based on their protected class. Agent controls where the buyer looks.',
      keyFact: 'Committed by agents. No explicit mention needed — coded language ("changing neighborhood") is enough.',
    },
    conceptB: {
      name: 'Blockbusting',
      description: 'Encouraging OWNERS to panic-sell cheap by implying a protected class is "moving in." Also called panic peddling.',
      keyFact: 'Committed by investors/agents. Targets sellers. Purpose: buy cheap, sell high to incoming buyers.',
    },
    conceptC: {
      name: 'Redlining',
      description: 'Refusing mortgage loans or insurance in certain areas based on the racial/ethnic composition of the neighborhood.',
      keyFact: 'Committed by lenders and insurers. Targets entire neighborhoods. Named for literal red lines drawn on maps.',
    },
    mnemonic: 'SBR: Steer → agent controls buyer\'s route. Bust → investor exploits seller\'s fear. Red → lender draws lines on the map.',
    dannyNote: 'Pattern: WHO is the bad actor? Agent = steering. Investor/developer = blockbusting. Bank = redlining. WHO is targeted? Buyer = steering. Seller = blockbusting. Neighborhood = redlining.',
    questions: [
      {
        id: 'tp-sbr-1',
        text: 'An investor tells homeowners "values are about to drop because of who\'s moving in" and offers to buy cheap. This is:',
        answer: 'B',
        explanation: 'B — Blockbusting. The investor is using fear of protected class to pressure panic-selling. Classic panic peddling.',
      },
      {
        id: 'tp-sbr-2',
        text: 'A mortgage lender automatically rejects loans for properties in certain zip codes based on their racial composition. This is:',
        answer: 'C',
        explanation: 'C — Redlining. Discriminating based on geographic area\'s racial composition rather than individual creditworthiness.',
      },
      {
        id: 'tp-sbr-3',
        text: 'An agent never shows a Latino couple homes north of Main Street without explanation. This is:',
        answer: 'A',
        explanation: 'A — Steering. The agent controls WHERE the buyers can look based on their protected class. No explicit statement needed — the pattern is enough.',
      },
    ],
  },
  {
    id: 'trap-client-customer',
    title: 'Client vs. Customer',
    sectionId: 'agency',
    conceptA: {
      name: 'Client (Principal)',
      description: 'Has a signed agency agreement. Agent owes FULL FIDUCIARY DUTIES (OLD CAR). Agent actively advocates for this person.',
      keyFact: 'Created by signed listing or buyer representation agreement. Written agreement is the trigger.',
    },
    conceptB: {
      name: 'Customer (Non-Client)',
      description: 'Party the agent assists but does NOT represent. Agent owes only honesty, fair dealing, and material fact disclosure. No fiduciary duties.',
      keyFact: 'A buyer walking into an open house without a representation agreement = customer of the listing agent.',
    },
    mnemonic: 'CLIENT = Contracted → gets OLD CAR. CUSTOMER = just visiting → gets honesty only.',
    dannyNote: 'The listing agent\'s client is the SELLER. A buyer without a signed agreement = customer. This means the agent must relay the buyer\'s "I can go $30K higher" to the seller — that\'s loyalty to the client (seller).',
    questions: [
      {
        id: 'tp-cc-1',
        text: 'A buyer at an open house tells the listing agent they\'re desperate and can go $30K above asking. The agent must:',
        answer: 'A',
        explanation: 'A — Tell the seller. The listing agent\'s client is the seller. The buyer without a representation agreement is a customer. Loyalty to the client (seller) requires passing along this information.',
      },
      {
        id: 'tp-cc-2',
        text: 'What best creates a buyer-client relationship?',
        answer: 'B',
        explanation: 'B — A signed buyer representation agreement. Simply searching together, viewing homes, or even making offers does not automatically create an agency relationship. The signed written agreement is the trigger.',
      },
      {
        id: 'tp-cc-3',
        text: 'An agent knows their seller is 3 months behind on the mortgage. Must they disclose this to buyers?',
        answer: 'B',
        explanation: 'B — No. The seller\'s financial distress and motivation are confidential. Material facts about the PROPERTY must be disclosed. Personal financial situations of the client are protected by the Confidentiality duty.',
      },
    ],
  },
  {
    id: 'trap-depreciation-types',
    title: 'Physical vs. Functional vs. External Obsolescence',
    sectionId: 'valuation',
    conceptA: {
      name: 'Physical Deterioration',
      description: 'Loss in value from WEAR, AGE, and deferred maintenance. The physical condition of the structure itself is the problem.',
      keyFact: 'Can be curable (peeling paint) or incurable (crumbling foundation). Source: inside the building, related to age/condition.',
    },
    conceptB: {
      name: 'Functional Obsolescence',
      description: 'Loss in value from POOR DESIGN or OUTDATED FEATURES that no longer meet market standards.',
      keyFact: 'Can be curable (add a bathroom) or incurable (ceiling too low to fix). Source: inside the property, related to design.',
    },
    conceptC: {
      name: 'External / Economic Obsolescence',
      description: 'Loss in value from forces OUTSIDE the property — nearby nuisance, neighborhood decline, economic factors.',
      keyFact: 'ALWAYS incurable — you cannot fix what\'s outside your property line. Examples: new highway, factory, declining area.',
    },
    mnemonic: 'PFE: Physical = age/wear. Functional = design flaw. External = outside forces. Only external is always incurable.',
    dannyNote: 'Ask yourself: WHERE does the problem come from? INSIDE the building (age/condition) = physical. ABOUT the building\'s design = functional. OUTSIDE the property = external (and always incurable). External is the one the exam really wants you to get right.',
    questions: [
      {
        id: 'tp-dep-1',
        text: 'A 5BR home has only one bathroom. This measurably reduces value. This is:',
        answer: 'B',
        explanation: 'B — Functional obsolescence (curable). The deficiency is in the DESIGN — inadequate bathrooms for the bedroom count. Inside the property, design-related. Curable if adding bathrooms costs less than value added.',
      },
      {
        id: 'tp-dep-2',
        text: 'A major employer closes nearby, causing unemployment and driving down home values in the area. This is:',
        answer: 'C',
        explanation: 'C — External obsolescence. The cause of value loss is entirely outside the property boundaries — economic forces in the surrounding area. Always incurable.',
      },
      {
        id: 'tp-dep-3',
        text: 'Which type of depreciation is ALWAYS incurable?',
        answer: 'C',
        explanation: 'C — External (economic) obsolescence. Because the cause is outside the property, no amount of investment in the property can cure it. Physical and functional can each be curable or incurable.',
      },
    ],
  },
  {
    id: 'trap-mortgage-dot',
    title: 'Mortgage vs. Deed of Trust',
    sectionId: 'financing',
    conceptA: {
      name: 'Mortgage',
      description: '2-party instrument: borrower (mortgagor) pledges property to lender (mortgagee). Borrower keeps legal title. Lender holds a lien.',
      keyFact: 'Foreclosure requires judicial process (court). States: FL, NY, NJ, OH, others. Slower, more borrower protection.',
    },
    conceptB: {
      name: 'Deed of Trust',
      description: '3-party instrument: borrower (trustor) → trustee holds legal title → for lender (beneficiary). Non-judicial foreclosure possible.',
      keyFact: 'Faster power-of-sale foreclosure. States: CA, TX, CO, AZ, VA, others. Trustee reconveys title when loan is paid off.',
    },
    mnemonic: 'MORTGAGE = 2 parties. DEED OF TRUST = 3 parties. More parties = faster foreclosure.',
    dannyNote: '"Who holds legal title?" — Mortgage state = BORROWER. Deed of trust state = TRUSTEE. In both cases borrower has equitable title (right to use the property). This exact question appears on nearly every exam.',
    questions: [
      {
        id: 'tp-mot-1',
        text: 'In a deed of trust, who holds LEGAL title during the loan period?',
        answer: 'B',
        explanation: 'B — The trustee. A neutral third-party trustee holds legal title on behalf of the lender. The borrower retains equitable title — the right to use and enjoy the property.',
      },
      {
        id: 'tp-mot-2',
        text: 'In a mortgage state, a borrower defaults. What type of foreclosure is required?',
        answer: 'A',
        explanation: 'A — Judicial foreclosure. In mortgage states the lender holds a lien (not title). They must sue in court, get a judgment, and proceed to a court-ordered sale.',
      },
      {
        id: 'tp-mot-3',
        text: 'Which security instrument enables non-judicial (power of sale) foreclosure?',
        answer: 'B',
        explanation: 'B — Deed of Trust. Because the trustee already holds legal title, they can conduct a sale without court intervention when the borrower defaults.',
      },
    ],
  },
  {
    id: 'trap-approaches',
    title: 'Sales Comparison vs. Cost vs. Income Approach',
    sectionId: 'valuation',
    conceptA: {
      name: 'Sales Comparison (Market)',
      description: 'Compares subject to recent similar sales (comps) with adjustments for differences. Primary for residential.',
      keyFact: 'Formula: comp price ± adjustments = value. Requires comparable sales data to exist.',
    },
    conceptB: {
      name: 'Cost Approach',
      description: 'Land value + cost to reproduce/replace building − depreciation. Used for new, unique, or special-purpose properties.',
      keyFact: 'Formula: Land + (Replacement Cost − Depreciation). Best for: schools, churches, new construction.',
    },
    conceptC: {
      name: 'Income (Capitalization) Approach',
      description: 'Value based on income generated: NOI ÷ cap rate. Primary for investment and income-producing properties.',
      keyFact: 'Formula: Value = NOI ÷ Cap Rate. Best for: apartment buildings, commercial, rentals.',
    },
    mnemonic: 'MCI: Market = residential. Cost = new/unique. Income = investment. Residential → M. Commercial/rental → I. Church → C.',
    dannyNote: '"Which approach is most appropriate?" — Home with comps = Sales Comparison. Commercial rental = Income. Church or new building = Cost. Exam trick: applying Cost to a rental or Income to a house will always be wrong.',
    questions: [
      {
        id: 'tp-app-1',
        text: 'Appraiser values a newly built church in a rural area. No comparable sales exist. Most appropriate approach:',
        answer: 'B',
        explanation: 'B — Cost Approach. Special-use properties with no comps and no rental income are best valued by cost: land + replacement cost − depreciation.',
      },
      {
        id: 'tp-app-2',
        text: 'Appraiser values a 30-unit apartment complex. Primary approach:',
        answer: 'C',
        explanation: 'C — Income Approach. Income-producing properties are valued based on the income they generate. NOI ÷ cap rate is the standard formula.',
      },
      {
        id: 'tp-app-3',
        text: 'Appraiser values a 3BR/2BA home in a neighborhood with three recent comparable sales. Primary approach:',
        answer: 'A',
        explanation: 'A — Sales Comparison. Residential property with available comps → sales comparison is the standard primary method, reflecting what buyers actually pay.',
      },
    ],
  },
];

export const getTrapsBySection = (sectionId: string) =>
  TRAP_PAIRS.filter((t) => t.sectionId === sectionId);
