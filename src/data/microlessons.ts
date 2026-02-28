import type { MicroLesson } from '@/types';

export const MICRO_LESSONS: MicroLesson[] = [
  {
    id: 'ml-bundle-of-rights',
    topicId: 'bundle-of-rights',
    title: 'Bundle of Rights',
    whatItIs: 'Real property ownership isn\'t a single right — it\'s a "bundle" of five separate legal rights: Disposition, Enjoyment, Exclusion, Possession, and Control (DEEP-C). You can own all five or have some taken away.',
    whyItMatters: 'Every government action, easement, or lien removes one or more rights from the bundle. Understanding WHICH rights are affected tells you exactly what the owner lost.',
    examTrap: 'When the government uses EMINENT DOMAIN, it removes ALL five rights. When ZONING restricts use, it only limits Control and Enjoyment — Possession, Disposition, and Exclusion remain. Don\'t confuse the two.',
    mnemonic: 'DEEP-C: Disposition, Enjoyment, Exclusion, Possession, Control',
    example: 'An owner has a neighbor who holds an easement to cross their land. The neighbor\'s easement removes the owner\'s Exclusion right (they can\'t exclude the neighbor) but leaves all other rights intact.',
    recallPrompts: [
      'Name the 5 rights in the bundle of rights using DEEP-C.',
      'If the government zones your property and limits how you can use it, which bundle rights are affected?',
      'Can you sell a property if someone holds an easement on it?',
    ],
  },
  {
    id: 'ml-concurrent-ownership',
    topicId: 'concurrent-ownership',
    title: 'Concurrent Ownership',
    whatItIs: 'Multiple people owning the same property at the same time. The main types are: Tenancy in Common (TIC), Joint Tenancy (JT), and Tenancy by the Entirety (TBE — married couples only).',
    whyItMatters: 'The type of concurrent ownership determines: who inherits if an owner dies, can a creditor take one owner\'s share, and can one owner sell without the others.',
    examTrap: 'Joint Tenancy has RIGHT OF SURVIVORSHIP — if one owner dies, their share passes automatically to surviving joint tenants (NOT through the will). Tenancy in Common does NOT have right of survivorship — a TIC owner can will their share to anyone.',
    mnemonic: 'TTIP = the 4 unities required for Joint Tenancy: Time, Title, Interest, Possession. Break any unity = JT converts to TIC.',
    example: 'A and B own as joint tenants. A dies. B automatically gets A\'s share — A\'s will cannot override this. If they were tenants in common, A\'s share would go to whoever A named in the will.',
    recallPrompts: [
      'What are the 4 unities required for joint tenancy (TTIP)?',
      'A joint tenant sells their share without permission. Does joint tenancy survive?',
      'What makes Tenancy by the Entirety different from Joint Tenancy?',
    ],
  },
  {
    id: 'ml-police-power',
    topicId: 'police-power',
    title: 'Police Power & Zoning',
    whatItIs: 'Police power is the government\'s authority to regulate property for public health, safety, and welfare — WITHOUT paying the owner. Zoning is the primary tool: it divides land into use categories (residential, commercial, industrial).',
    whyItMatters: 'It\'s one of the 4 PETE powers, but it\'s the only one with NO compensation. Property owners can have their land severely restricted without a cent in payment.',
    examTrap: 'If police power goes "too far" and destroys most of the property\'s value, courts may call it a "regulatory taking" — which DOES require compensation (this is a grey area the exam sometimes tests). A total taking of value = compensation required.',
    mnemonic: 'Police Power = P in PETE = no Payment. Eminent Domain = E in PETE = compensation required.',
    example: 'A city enacts a zoning ordinance prohibiting industrial use in a neighborhood. A factory owner must shut down (or is grandfathered as a nonconforming use). No compensation is paid.',
    recallPrompts: [
      'Which PETE power requires NO compensation to the property owner?',
      'What is a "nonconforming use" and how does it arise?',
      'What\'s the difference between a variance and a special use permit?',
    ],
  },
  {
    id: 'ml-three-approaches',
    topicId: 'three-approaches',
    title: 'Three Approaches to Value',
    whatItIs: 'Appraisers use three methods to estimate value: (1) Sales Comparison — compare to recent similar sales; (2) Cost — land + cost to build − depreciation; (3) Income — what income the property generates (NOI ÷ cap rate).',
    whyItMatters: 'Each approach is "most appropriate" for a different property type. Picking the wrong one on the exam = wrong answer.',
    examTrap: 'For income-producing commercial properties, always choose the Income Approach unless specifically told no income data exists. For single-family homes, it\'s Sales Comparison. For new or unique buildings, it\'s Cost.',
    mnemonic: 'MCI: Market (Sales Comparison), Cost, Income. Residential = M. Commercial = I. New/Unique = C.',
    example: 'Appraising a 50-unit apartment complex: Income Approach primary (NOI ÷ cap rate). Appraising a 3BR/2BA home: Sales Comparison primary (adjust for differences vs. comps).',
    recallPrompts: [
      'Which appraisal approach would you use for a church building?',
      'What formula is used in the Income Approach?',
      'Why can\'t you use the Sales Comparison approach for a property with no comparable sales?',
    ],
  },
  {
    id: 'ml-fiduciary-duties',
    topicId: 'fiduciary-duties',
    title: 'Fiduciary Duties (OLD CAR)',
    whatItIs: 'An agent owes six specific duties to their PRINCIPAL (client): Obedience, Loyalty, Disclosure, Confidentiality, Accounting, and Reasonable Care. These are fiduciary duties — the highest standard of care in the law.',
    whyItMatters: 'Agency makes up 17% of the national exam. These 6 duties are the backbone of every agency question. Get OLD CAR right and you\'ll get most of those points.',
    examTrap: 'Confidentiality SURVIVES the end of the agency relationship. Even after the listing expires or the deal closes, the agent cannot share the client\'s confidential information. The other five duties end when agency ends.',
    mnemonic: 'OLD CAR: Obedience (follow lawful instructions), Loyalty (client first), Disclosure (share material facts), Confidentiality (protect personal info forever), Accounting (no commingling), Reasonable Care (use skill).',
    example: 'The seller tells their agent they\'ll accept $30K below list if needed. That\'s confidential — the agent cannot share it with the buyer\'s agent, ever.',
    recallPrompts: [
      'Recite all 6 OLD CAR duties from memory.',
      'Which fiduciary duty survives after the agency relationship ends?',
      'A buyer\'s agent learns the seller is desperate. Can they share this with their buyer?',
    ],
  },
  {
    id: 'ml-contract-essentials',
    topicId: 'contract-essentials',
    title: 'Contract Essentials (CALM)',
    whatItIs: 'Four elements make a contract valid: Competent parties (legal age + sound mind), Agreement (offer + acceptance), Lawful purpose (can\'t contract to do something illegal), and Money/Consideration (something of value). Real estate contracts also MUST be in writing (Statute of Frauds).',
    whyItMatters: 'Contracts make up 17% of the exam. If you know what makes a contract valid vs. void vs. voidable, you can answer almost every contracts question.',
    examTrap: 'A verbal real estate contract is not VOID — it\'s UNENFORCEABLE. That\'s a different legal status. Also: earnest money is NOT required for a valid contract — it\'s just standard practice.',
    mnemonic: 'CALM: Competent parties, Agreement, Lawful purpose, Money (consideration). Plus: must be Written for real estate.',
    example: 'Two adults agree to buy/sell a house, sign a written purchase agreement with a price (consideration), for a lawful purpose. CALM + Written = valid, enforceable contract.',
    recallPrompts: [
      'What are the 4 CALM elements of a valid contract?',
      'Why can\'t you enforce a verbal real estate contract?',
      'Is a contract void or voidable if one party is a minor?',
    ],
  },
  {
    id: 'ml-protected-classes',
    topicId: 'protected-classes',
    title: 'The 7 Fair Housing Protected Classes',
    whatItIs: 'The federal Fair Housing Act of 1968 (and 1988 amendments) prohibits housing discrimination based on 7 protected classes: Race, Color, Religion, National Origin, Sex, Familial Status (families with children under 18), and Disability/Handicap.',
    whyItMatters: 'Fair housing violations carry serious civil AND criminal penalties. As a licensee, you must know what you can and cannot say or do.',
    examTrap: 'Race and Color are TWO SEPARATE protected classes — most people count 6 and miss this. Also: sexual orientation and age are NOT federal protected classes (though states may add them). The exam tests federal law.',
    mnemonic: 'FRESH NC: Familial status, Race, rEligion, Sex, Handicap, National origin, Color = 7 classes.',
    example: 'A landlord says "we don\'t rent to families with children" = illegal (Familial Status). Refusing to sell to someone "because of where they\'re from" = National Origin violation.',
    recallPrompts: [
      'Name all 7 federal Fair Housing protected classes.',
      'Is age a protected class under federal law?',
      'Can a private homeowner EVER discriminate when using a real estate agent?',
    ],
  },
  {
    id: 'ml-deed-types',
    topicId: 'deed-types',
    title: 'Types of Deeds',
    whatItIs: 'Three main deed types ranked by protection: (1) General Warranty Deed — seller guarantees title against ALL claims, ever. (2) Special Warranty Deed — seller guarantees only against claims during their ownership. (3) Quitclaim Deed — zero guarantees; transfers whatever interest exists.',
    whyItMatters: 'The exam regularly asks "which deed offers the most/least protection?" and "what deed is used in divorces?" You must know all three cold.',
    examTrap: 'A quitclaim deed is NOT fraudulent — it\'s just warranty-free. It can convey full, valid title or it can convey nothing. The buyer takes the risk. Used commonly in divorces, clearing clouds on title, and family transfers.',
    mnemonic: 'General Wanda guarantees EVERYTHING. Special Steve only guarantees HIS time. Quit-claim Quinn just quits and walks away.',
    example: 'Normal home sale → General Warranty Deed. Ex-spouse transferring their half in a divorce → Quitclaim Deed. Bank-owned (REO) property → often Special Warranty or Quitclaim (bank won\'t guarantee prior owner\'s title).',
    recallPrompts: [
      'Which deed type provides the strongest warranty to the buyer?',
      'In what situation would a quitclaim deed most commonly be used?',
      'What\'s the difference between what General and Special Warranty Deeds protect against?',
    ],
  },
  // ── Property Ownership ──────────────────────────────────────────────────────
  {
    id: 'ml-encumbrances',
    topicId: 'encumbrances',
    title: 'Encumbrances & Liens',
    whatItIs: 'An encumbrance is any claim, right, or burden attached to a property that affects its use or transfer. Liens are financial encumbrances (mortgage, tax lien, mechanic\'s lien). Easements and deed restrictions are non-financial encumbrances.',
    whyItMatters: 'Encumbrances run with the land — they follow the property, not the owner. A buyer who closes without discovering a lien may be stuck with it. Title search and insurance exist to catch these.',
    examTrap: 'A general lien (e.g., judgment lien) attaches to ALL property the debtor owns. A specific lien (e.g., mortgage) only attaches to the specific property named. Mechanic\'s liens are specific; judgment liens are general.',
    mnemonic: 'MARIA tests whether something is a fixture. Liens = financial burden. Easements = use right without ownership.',
    example: 'Utility company has an easement to run power lines across the back of your lot. That right follows the property forever — the next buyer also has to allow it.',
    recallPrompts: [
      'What is the difference between a lien and an easement?',
      'A mechanic places a lien on a property for unpaid work. Is this a specific or general lien?',
      'Does an encumbrance always prevent a property from being sold?',
    ],
  },

  // ── Government Powers ────────────────────────────────────────────────────────
  {
    id: 'ml-eminent-domain',
    topicId: 'eminent-domain',
    title: 'Eminent Domain',
    whatItIs: 'Eminent domain is the government\'s power to take private property for public use — but it MUST pay "just compensation" (fair market value). The legal process of forcing the sale is called condemnation.',
    whyItMatters: 'Unlike police power, eminent domain requires payment. The owner can challenge the AMOUNT in court (condemnation proceedings) but generally cannot block the taking if it\'s truly for public use.',
    examTrap: 'Inverse condemnation is when the government acts NEAR a property in a way that severely damages its value without formally condemning it (e.g., a new flight path over your house). The owner can sue to force the government to pay.',
    mnemonic: 'Eminent = they TAKE it. Condemnation = the legal process. Just compensation = fair market value, not owner\'s value.',
    example: 'City needs to build a highway and your property is in the path. They condemn it, pay you fair market value ($300K), and take title. You can sue if you think $300K is too low — but the taking will still happen.',
    recallPrompts: [
      'What is "just compensation" in an eminent domain taking?',
      'What is the difference between condemnation and inverse condemnation?',
      'Can a property owner refuse an eminent domain taking?',
    ],
  },
  {
    id: 'ml-taxation-escheat',
    topicId: 'taxation-escheat',
    title: 'Taxation & Escheat',
    whatItIs: 'Ad valorem property taxes are assessed annually based on the property\'s value (ad valorem = "according to value"). Special assessments are charged for specific improvements (new sidewalk, sewer). Escheat is the reversion of property to the state when an owner dies with no will and no heirs.',
    whyItMatters: 'Property taxes are a specific lien on that property — they are always paid first at closing. Unpaid property taxes can result in a tax sale. Escheat prevents property from being "ownerless."',
    examTrap: 'Ad valorem taxes are based on ASSESSED value — not market value. The assessed value is often a percentage of market value set by the local assessor. Don\'t say taxes are based on market value.',
    mnemonic: 'AD VAL = according to value. Special assessment = you pay for YOUR street getting paved. Escheat = estate goes to state (no heirs).',
    example: 'Your home has a market value of $400K but the county assesses it at 80% = $320K assessed value. A 2% tax rate = $6,400/year in property taxes.',
    recallPrompts: [
      'What does "ad valorem" mean?',
      'What is the difference between a property tax and a special assessment?',
      'Under what conditions does escheat occur?',
    ],
  },

  // ── Valuation ────────────────────────────────────────────────────────────────
  {
    id: 'ml-appraisal-principles',
    topicId: 'appraisal-principles',
    title: 'Appraisal Principles',
    whatItIs: 'Key economic principles that underpin all real estate valuation: Substitution (pay no more than an equally good substitute), Contribution (how much does a feature ADD to value?), Anticipation (future benefits affect present value), Conformity (value maximized when a property fits its neighborhood), Progression/Regression (a modest home benefits from being near expensive homes; an expensive home loses value near modest ones).',
    whyItMatters: 'These principles explain WHY appraisers make specific adjustments. Understanding them lets you choose the right answer when the question describes a valuation scenario.',
    examTrap: 'Substitution is the foundation of ALL THREE approaches. Contribution ≠ cost: spending $50K on a pool may only add $20K to market value. Regression and Progression are the "neighborhood effect" — the values around your property affect yours.',
    mnemonic: 'SCAR: Substitution, Contribution, Anticipation, Regression/Progression. Substitution is the ceiling. Contribution is the question "is it worth it?"',
    example: 'A neighborhood has 3BR homes at $300K. You build a 6BR mansion for $700K. Regression: the mansion is worth less because it\'s over-improved for the area. Put a modest home next to mansions: progression raises its value.',
    recallPrompts: [
      'What is the principle of substitution and why is it the foundation of appraisal?',
      'A homeowner spent $80K on a new kitchen. Does that mean the home is worth $80K more?',
      'What is the difference between regression and progression in real estate?',
    ],
  },
  {
    id: 'ml-depreciation',
    topicId: 'depreciation',
    title: 'Depreciation Types',
    whatItIs: 'Depreciation = any loss in property value from any cause. Three types: (1) Physical deterioration — wear and tear, deferred maintenance, age. (2) Functional obsolescence — poor or outdated design (one bathroom, low ceilings, outdated electrical). (3) External obsolescence — outside forces like a noisy highway, polluting factory, declining neighborhood.',
    whyItMatters: 'The Cost Approach to appraisal requires estimating ALL depreciation and subtracting it from replacement cost. External obsolescence always reduces value — and you can\'t fix it by spending money.',
    examTrap: 'External obsolescence is ALWAYS incurable — you cannot fix what\'s outside your property line. Physical and functional can each be curable OR incurable. "Curable" means it\'s economically worth fixing (the cost to fix < the value it adds).',
    mnemonic: 'PFE: Physical (wear), Functional (design), External (neighborhood). External = always incurable.',
    example: 'An old house: peeling paint = curable physical. Crumbling foundation = incurable physical. No second bathroom = curable functional. Low ceiling height = incurable functional. New airport opens nearby = external (incurable).',
    recallPrompts: [
      'Name the 3 types of depreciation using PFE.',
      'A new freeway opens 200 feet from a home, causing noise. What type of depreciation is this, and is it curable?',
      'What makes a depreciation "curable" vs "incurable"?',
    ],
  },

  // ── Financing ────────────────────────────────────────────────────────────────
  {
    id: 'ml-mortgage-instruments',
    topicId: 'mortgage-instruments',
    title: 'Mortgage Instruments',
    whatItIs: 'Two documents create a real estate loan: (1) The Promissory Note — the borrower\'s written promise to repay (the debt itself). (2) The Mortgage or Deed of Trust — pledges the property as collateral for the note. In mortgage states (2-party: lender + borrower), the borrower keeps legal title. In deed of trust states (3-party: borrower = trustor, lender = beneficiary, neutral third party = trustee), the trustee holds title.',
    whyItMatters: 'You can have a note without a mortgage (unsecured personal loan), but you cannot have a mortgage without a note. The note is what you\'re actually obligated to repay. The mortgage/deed of trust just gives the lender a claim against the property if you don\'t.',
    examTrap: 'In a deed of trust, the TRUSTEE holds legal title — NOT the lender. The borrower has equitable title (the right to use and enjoy the property). When the loan is paid off, the trustee reconveys title back to the borrower.',
    mnemonic: 'NOTE = I owe you. MORTGAGE = if I don\'t pay, you get the house. Mortgage states = 2 parties. Deed of trust states = 3 parties (trustee in the middle).',
    example: 'You borrow $300K to buy a home in a deed of trust state. You sign the note (promising to repay) and the deed of trust (giving the trustee title as collateral). You get equitable title — you live there. If you default, the trustee sells it without a court order.',
    recallPrompts: [
      'What is the difference between the promissory note and the mortgage?',
      'In a deed of trust, who holds legal title to the property?',
      'Can you have a mortgage without a note? Can you have a note without a mortgage?',
    ],
  },
  {
    id: 'ml-loan-types',
    topicId: 'loan-types',
    title: 'Loan Types (FHA / VA / Conventional)',
    whatItIs: 'FHA: government-insured loans for lower-income and first-time buyers. Min 3.5% down (580+ credit). Requires MIP (upfront + annual). VA: for veterans/active duty/surviving spouses. 0% down, no monthly PMI, but has a funding fee. Conventional: not government-backed. Typically 5-20% down. PMI required if <20% down; can be cancelled at 20% equity.',
    whyItMatters: 'The exam loves questions about which loan fits which buyer, what fees apply, and who can use each program.',
    examTrap: 'FHA = MIP (mortgage insurance premium, paid to the government). Conventional = PMI (private mortgage insurance, paid to private insurer). VA = funding fee (one-time), NO monthly mortgage insurance. Don\'t mix up the insurance names.',
    mnemonic: 'FHA = For Home Aspiring (first-timers, 3.5% down, MIP). VA = Veterans Always (0% down, no PMI). Conventional = Cash in pocket (bigger down, private PMI if under 20%).',
    example: 'First-time buyer, 600 credit score, $15K saved on a $300K home → FHA (5% ≈ $15K down, plus MIP). 10-year veteran, good credit, no savings → VA (0% down). Self-employed buyer, 800 credit, 25% down → Conventional (no PMI at all).',
    recallPrompts: [
      'What is the minimum down payment for an FHA loan with a credit score of 580+?',
      'Which loan type requires NO down payment and has NO monthly PMI?',
      'What is the difference between MIP (FHA) and PMI (conventional)?',
    ],
  },
  {
    id: 'ml-foreclosure',
    topicId: 'foreclosure',
    title: 'Foreclosure Methods',
    whatItIs: 'When a borrower defaults on a mortgage, the lender can foreclose. Two main methods: (1) Judicial foreclosure — goes through the court system; lender sues, gets a judgment, court orders a public sale. (2) Non-judicial (power of sale) — used in deed of trust states; the trustee holds a public sale without going to court. Faster for the lender.',
    whyItMatters: 'The method of foreclosure determines how quickly the lender can recover the property and whether the borrower gets a right of redemption (to buy back their home after the sale).',
    examTrap: 'Statutory redemption (right to buy back after the sale) only applies in judicial foreclosure states. In non-judicial states, there\'s often an equity of redemption (right to pay off the debt BEFORE the sale) but not after. Know the difference.',
    mnemonic: 'Judicial = Judge required = slower. Non-judicial = No judge = faster. Trust deed states = non-judicial default.',
    example: 'California is a deed of trust state. Lender records a Notice of Default, waits 3 months, records a Notice of Sale, waits 21 days, holds a trustee\'s sale. No court involved. Much faster than suing in court.',
    recallPrompts: [
      'What is the difference between judicial and non-judicial foreclosure?',
      'What is a "right of redemption" and when does it typically apply?',
      'Which type of security instrument (mortgage vs deed of trust) enables non-judicial foreclosure?',
    ],
  },

  // ── Agency ───────────────────────────────────────────────────────────────────
  {
    id: 'ml-agency-relationships',
    topicId: 'agency-relationships',
    title: 'Agency Relationships',
    whatItIs: 'Agency is created when a principal (client) hires an agent to act on their behalf. The seller who signs a listing agreement = principal; the listing agent = agent. The buyer who signs a buyer representation agreement = principal; the buyer\'s agent = agent. A party the agent helps without representing = customer (not client).',
    whyItMatters: 'The distinction between CLIENT and CUSTOMER determines what duties the agent owes. Clients get fiduciary duties (OLD CAR). Customers only get honesty and fair dealing.',
    examTrap: '"Helping someone look at homes" does NOT create an agency relationship without a signed agreement. Without a buyer representation agreement, you\'re helping a customer — not a client. This distinction changes your legal duties entirely.',
    mnemonic: 'CLIENT = signed agreement = fiduciary OLD CAR. CUSTOMER = no agreement = honesty only. PAC = Principal, Agent, Client (triangle of who\'s who).',
    example: 'A couple walks into an open house. The listing agent shows them around. No agreement is signed. They are customers — the agent is not their representative and owes them no fiduciary duties. They should be told this (agency disclosure).',
    recallPrompts: [
      'What is the difference between a client and a customer in agency law?',
      'What must happen to create a formal buyer agency relationship?',
      'What duties does an agent owe to a customer vs. a client?',
    ],
  },
  {
    id: 'ml-dual-agency',
    topicId: 'dual-agency',
    title: 'Dual Agency & Disclosure',
    whatItIs: 'Dual agency occurs when one agent (or brokerage) represents both the buyer and the seller in the same transaction. It creates a conflict of interest because the agent cannot be 100% loyal to either party. It is legal in most states ONLY with full written disclosure and informed written consent from both parties.',
    whyItMatters: 'Undisclosed dual agency is illegal and a serious license law violation. It can void the transaction, result in license revocation, and expose the agent to civil liability.',
    examTrap: 'Transaction broker (or facilitator) is different from dual agent. A transaction broker helps both parties without representing either — no fiduciary duties to anyone. A dual agent still has fiduciary duties to both, which is why it\'s so tricky.',
    mnemonic: 'D.I.C.E. = Disclose it, Inform both parties, get written Consent, Expect limited loyalty. No disclosure = illegal.',
    example: 'One agent lists the house AND finds the buyer from their own client list. Both parties must be told, both must sign a dual agency consent. Without consent, it\'s automatic license violation regardless of the agent\'s intent.',
    recallPrompts: [
      'What are the two requirements for dual agency to be legal?',
      'What is the difference between dual agency and a transaction broker?',
      'What happens if an agent acts as an undisclosed dual agent?',
    ],
  },

  // ── Contracts ────────────────────────────────────────────────────────────────
  {
    id: 'ml-contract-types',
    topicId: 'contract-types',
    title: 'Contract Types & Status',
    whatItIs: 'Bilateral contract: BOTH parties make promises (most real estate contracts — buyer promises to pay, seller promises to convey). Unilateral contract: ONE party promises if the other ACTS (option to buy — owner promises to sell IF buyer exercises the option). Contract status: Valid (all elements met), Void (never a contract), Voidable (valid but one party can cancel), Unenforceable (exists but courts won\'t enforce it).',
    whyItMatters: 'The difference between void, voidable, and unenforceable determines who has what rights. A void contract has no legal effect at all. A voidable contract is fine until the protected party cancels.',
    examTrap: 'A listing agreement is a bilateral contract (agent promises to market; seller promises to pay commission). An option is a UNILATERAL contract during the option period — the seller is bound but the buyer has no obligation to buy.',
    mnemonic: 'Bi = Both. Uni = One if other acts. VOID = never existed. VOIDABLE = one party can escape. UNENFORCEABLE = exists but courts won\'t touch it.',
    example: 'A minor signs a purchase agreement → voidable (minor can disaffirm). A contract for an illegal purpose (buy a meth lab) → void. A verbal real estate agreement → unenforceable (Statute of Frauds).',
    recallPrompts: [
      'What is the difference between a bilateral and a unilateral contract?',
      'Give an example of a voidable real estate contract.',
      'What makes a contract void vs. merely unenforceable?',
    ],
  },
  {
    id: 'ml-purchase-agreement',
    topicId: 'purchase-agreement',
    title: 'Purchase Agreement & Contingencies',
    whatItIs: 'The purchase agreement (sales contract) is the main contract of sale. It must be in writing (Statute of Frauds). Key elements: parties, property description, price, terms, closing date. Contingencies are conditions that must be met for the contract to proceed — financing contingency, inspection contingency, appraisal contingency.',
    whyItMatters: 'Contingencies are buyer-protection clauses. If a contingency fails (can\'t get financing, inspection reveals major defects), the buyer can exit the contract and get their earnest money back.',
    examTrap: 'Without a contingency, a buyer who backs out for cold feet likely forfeits their earnest money. With a properly invoked contingency, they get it back. Earnest money itself is NOT required for a valid contract — it\'s just standard practice.',
    mnemonic: 'The "Big Three" contingencies: FIA = Financing, Inspection, Appraisal. Fail any one → buyer exits with earnest money back.',
    example: 'Buyer offers $450K with a financing contingency requiring 6% rate or lower. Rates jump to 8% and buyer can\'t qualify. They invoke the financing contingency, back out, and get their $10K earnest money returned.',
    recallPrompts: [
      'What are the three most common contingencies in a purchase agreement?',
      'If a buyer backs out without a contingency, what usually happens to the earnest money?',
      'Is earnest money required to make a purchase agreement valid?',
    ],
  },

  // ── Fair Housing ─────────────────────────────────────────────────────────────
  {
    id: 'ml-prohibited-practices',
    topicId: 'prohibited-practices',
    title: 'Prohibited Fair Housing Practices',
    whatItIs: 'Three major illegal practices: (1) Steering — directing buyers toward or away from neighborhoods based on protected class. (2) Blockbusting — encouraging owners to sell by implying a protected class is "moving in" to cause fear and sell cheap (panic peddling). (3) Redlining — refusing mortgage loans or insurance in certain neighborhoods based on racial/ethnic composition.',
    whyItMatters: 'All three are federal crimes. Real estate agents are most commonly charged with steering. Banks are most commonly charged with redlining. Both civil and criminal penalties apply.',
    examTrap: 'Steering doesn\'t require INTENT to discriminate — if you consistently show a Hispanic buyer only homes in Hispanic neighborhoods, it\'s steering regardless of your motivation. Results matter, not just intent.',
    mnemonic: 'SBR: Steer the buyer. Bust the block. Redline the map. All three = illegal. Agent = steering. Bank = redlining. Investor = blockbusting.',
    example: 'An agent shows a Black couple homes only in predominantly Black neighborhoods while steering white clients to other areas — steering. A real estate investor goes door to door in a white neighborhood saying "minorities are moving in, sell now before prices drop" — blockbusting.',
    recallPrompts: [
      'What is the difference between steering and blockbusting?',
      'Who typically commits redlining, and what is it based on?',
      'Can steering occur even if the agent has no discriminatory intent?',
    ],
  },
  {
    id: 'ml-exemptions',
    topicId: 'exemptions',
    title: 'Fair Housing Exemptions',
    whatItIs: 'The Fair Housing Act has narrow exemptions: (1) Owner-occupied buildings with 4 or fewer units (Mrs. Murphy exemption — can discriminate in OWN building if living there, ONLY IF no discriminatory advertising and NO real estate agent used). (2) Single-family homes sold or rented by private owners WITHOUT a real estate agent and without discriminatory advertising. (3) Religious organizations (for non-commercial housing to their members). (4) Private clubs (non-commercial housing for members).',
    whyItMatters: 'Exemptions are rare and narrow. The exam tests whether you know when they apply — and the key rule is that a real estate agent being involved ALWAYS kills the exemption.',
    examTrap: 'The exemptions NEVER apply when a real estate agent or broker is involved — period. A seller using an agent cannot discriminate, ever. Also, even under an exemption, discriminatory ADVERTISING is still illegal (Fair Housing Amendment Act).',
    mnemonic: 'ROSIE: Religious org, Owner-occupied 4-plex (Mrs. Murphy), Single-family private sale (no agent, no ad), Intended for 55+ (senior housing). All lose if agent is used.',
    example: 'A woman owns a 4-unit building, lives in one unit, and refuses to rent to unmarried couples for religious reasons. She shows the units herself, posts no ads. Potentially exempt (Mrs. Murphy). Now she calls a real estate agent to help — exemption gone.',
    recallPrompts: [
      'What is the "Mrs. Murphy exemption" and when does it apply?',
      'Does using a real estate agent affect Fair Housing exemptions?',
      'Are discriminatory ads ever allowed, even under an exemption?',
    ],
  },

  // ── Property Transfer ─────────────────────────────────────────────────────────
  {
    id: 'ml-title-insurance',
    topicId: 'title-insurance',
    title: 'Title Search & Insurance',
    whatItIs: 'A title search examines public records (deeds, liens, judgments, taxes) to trace the chain of title and find any defects. Title insurance protects against losses from defects that the search didn\'t uncover — including hidden claims, forgeries, undisclosed heirs, and recording errors. Two policies: Owner\'s (protects buyer) and Lender\'s/Mortgagee\'s (protects lender).',
    whyItMatters: 'Most lenders require a lender\'s title policy. Buyers should also purchase an owner\'s policy — without it, they have no protection if a hidden title defect surfaces later.',
    examTrap: 'A lender\'s title policy does NOT protect the buyer — it only protects the lender up to the outstanding loan balance. Buyers must get their own separate owner\'s policy. Many buyers assume the lender\'s policy covers them. It does not.',
    mnemonic: 'OL = Owner (buyer) and Lender (bank) are two separate policies. Lender\'s protects the bank. Owner\'s protects you. Get BOTH.',
    example: 'You buy a home. A lender\'s title policy is purchased at closing. Five years later, a previously unknown heir appears with a valid claim to the property. Your lender is protected — but since you didn\'t buy an owner\'s policy, YOU must defend your title at your own expense.',
    recallPrompts: [
      'What is the difference between an owner\'s title policy and a lender\'s title policy?',
      'What does a title search look for?',
      'If a lender\'s title policy is purchased, does the buyer also need an owner\'s policy?',
    ],
  },
  {
    id: 'ml-closing-process',
    topicId: 'closing-process',
    title: 'Closing & Proration',
    whatItIs: 'Closing (or settlement) is when title officially transfers from seller to buyer. The HUD-1 or Closing Disclosure itemizes all costs. Proration fairly divides ongoing costs between buyer and seller as of the closing date. Property taxes, HOA dues, prepaid insurance, and rent are commonly prorated.',
    whyItMatters: 'The exam tests proration calculations and which party gets a credit (advantage) vs. a debit (cost). Getting the direction right is key.',
    examTrap: 'If taxes are paid in ARREARS (after the period), the seller owes for their time and gives the buyer a credit. If taxes are paid in ADVANCE, the seller already paid and gets a credit from the buyer. Direction of payment determines direction of proration.',
    mnemonic: 'Arrears = seller pays buyer (seller credits buyer). Advance = buyer pays seller (buyer credits seller). TITLE transfers on DELIVERY of deed — not recording.',
    example: 'Closing is June 30. Annual taxes of $3,600 are paid in arrears (at year end). Seller owes 6/12 × $3,600 = $1,800. Buyer gets a $1,800 credit on the closing statement and pays the full bill in December.',
    recallPrompts: [
      'If property taxes are paid in arrears and closing is on July 1, who owes whom a proration?',
      'When does title transfer in a real estate transaction?',
      'What is the difference between a debit and a credit on a closing statement?',
    ],
  },
];

export const getMicroLessonByTopicId = (topicId: string): MicroLesson | undefined =>
  MICRO_LESSONS.find((ml) => ml.topicId === topicId);

export const getMicroLessonById = (id: string): MicroLesson | undefined =>
  MICRO_LESSONS.find((ml) => ml.id === id);

export const ALL_RECALL_PROMPTS: Array<{ prompt: string; topicId: string; topicTitle: string }> =
  MICRO_LESSONS.flatMap((ml) =>
    ml.recallPrompts.map((prompt) => ({ prompt, topicId: ml.topicId, topicTitle: ml.title }))
  );
