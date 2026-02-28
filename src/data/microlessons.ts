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
];

export const getMicroLessonByTopicId = (topicId: string): MicroLesson | undefined =>
  MICRO_LESSONS.find((ml) => ml.topicId === topicId);

export const getMicroLessonById = (id: string): MicroLesson | undefined =>
  MICRO_LESSONS.find((ml) => ml.id === id);
