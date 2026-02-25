# money-press — WooCommerce Dropshipping Store

A complete, CLI-first blueprint for launching a WooCommerce dropshipping store on a $0–$200 budget.  
All commands are copy-pasteable. All templates are paste-ready. All prompts are ready to run.

---

## Quick Start

```bash
# Clone and run the automated setup script
git clone https://github.com/dredog366/money-press.git
cd money-press
cp scripts/setup.sh /your/web/root/setup.sh
# Edit the variables at the top of setup.sh, then:
bash setup.sh
```

---

## Table of Contents

| # | Document | What's inside |
|---|----------|---------------|
| 1 | [Assumptions](docs/01-assumptions.md) | Server prereqs, what is assumed, missing-piece install commands |
| 2 | [Product Research](docs/02-product-research.md) | Selection criteria, ranked shortlist of 10, top pick with rationale |
| 3 | [Brand & Positioning](docs/03-brand-positioning.md) | Name ideas, tagline, brand voice, visual style guide |
| 4 | [Technical Build Plan](docs/04-technical-build.md) | Step-by-step WP-CLI + shell commands (server → SSL → WP → Woo → theme → pages) |
| 5 | [WooCommerce Configuration](docs/05-woo-configuration.md) | Plugins, settings, CLI commands for Woo options |
| 6 | [Dropshipping Ops Workflow](docs/06-dropshipping-ops.md) | Supplier sourcing, QC, returns tree, support macros, fulfillment SOP |
| 7 | [Site Copy Templates](docs/07-site-copy-templates.md) | Paste-ready copy for every page |
| 8 | [Tracking & Analytics](docs/08-tracking-analytics.md) | GA4 setup, pixel setup, UTM conventions, KPI list |
| 9 | [Launch Plan](docs/09-launch-plan.md) | 7-day launch + 30-day growth plan |
| 10 | [AI Asset Prompts](docs/10-ai-asset-prompts.md) | Logo, lifestyle, mockup, and video storyboard prompts |
| B | [setup.sh](scripts/setup.sh) | Bonus: single bash script to automate the entire build |

---

## Chosen Product

**Daily Foaming Facial Wash Refill Pods** — a lightweight, repeat-purchase skincare consumable.  
See [Product Research](docs/02-product-research.md) for the full ranking and rationale.

## Chosen Brand

**LatherLoop** — *"Your daily ritual, simplified."*  
See [Brand & Positioning](docs/03-brand-positioning.md) for the full style guide.

---

## Budget Snapshot

| Item | Cost |
|------|------|
| Domain (.com, 1 yr) | ~$12 |
| VPS (e.g. Hetzner CX22 / DigitalOcean Basic) | $6–$12/mo |
| SSL | $0 (Let's Encrypt) |
| Plugins (all free tier) | $0 |
| Theme (Astra free) | $0 |
| First ad test budget | $50–$100 |
| Sample orders (3–5 units) | $20–$40 |
| **Total first-month** | **~$100–$165** |

---

## Legal Disclaimers

- No medical/health cure claims are made anywhere in this project.  
- No trademarked brand names are referenced in product copy.  
- All supplier relationships are at arm's length; always verify import regulations for your specific SKU.
