# 6 — Dropshipping Operations Workflow

## Supplier Sourcing Checklist

Before placing any orders, verify each supplier against this checklist:

- [ ] Supplier has **200+ orders** on the product listing (AliExpress) or verified reviews (CJDropshipping/Spocket)
- [ ] Seller response time is **< 24 hours** (test with a pre-sales question)
- [ ] Product has **4.5★ or higher** rating with photo reviews
- [ ] Supplier can provide a **product spec sheet** or safety datasheet (SDS) on request
- [ ] Supplier offers **custom packaging / white-label** (peel-and-stick label at minimum)
- [ ] Supplier confirms **ePacket, AliExpress Standard Shipping, or US warehouse** option
- [ ] Ask explicitly: *"Do your products comply with US cosmetic regulations (FDA 21 CFR Part 700)?"*
- [ ] Verify no prohibited ingredients (e.g., mercury, formaldehyde, restricted parabens at illegal levels)
- [ ] Confirm **refund/replacement policy** for damaged/lost shipments in writing (DM or email)
- [ ] Order a **sample** before going live (see Sample Order Checklist)

### Recommended Supplier Platforms

| Platform | Best For | MOQ | White-label |
|----------|----------|-----|-------------|
| CJDropshipping | Custom packaging + US warehouse | 1 (dropship) | Yes (label $0.5/unit) |
| AliExpress + DSers | Low startup cost, huge catalog | 1 | Sometimes |
| Spocket | US/EU suppliers, faster shipping | 1 | Some suppliers |
| Zendrop | US warehouse, fast fulfillment | 1 | Yes (paid plan) |
| SaleHoo | Vetted directory | Varies | Varies |

---

## Sample Order Checklist

Order 3–5 units before going live. Review each unit against:

- [ ] **Packaging integrity** — no crushed, dented, or wet boxes on arrival
- [ ] **Contents match listing** — correct count, correct product variant
- [ ] **Scent/texture/formula** — matches supplier description and any lab test
- [ ] **Label accuracy** — ingredient list legible, brand name correct, no competitor branding visible
- [ ] **Shipping time** — record actual days from order to delivery (compare to stated time)
- [ ] **Tracking accuracy** — was tracking updated promptly? Did it match reality?
- [ ] **Unboxing experience** — would a customer be delighted? Note any improvement needed
- [ ] **Product performance** — does the pod dissolve as expected? Does it foam properly?
- [ ] **Photo and video** — take real product photos during unboxing for use in ads

---

## QC Checklist (Ongoing — Random Sample per Batch)

Every 50 orders, request a free unit from the supplier for QC:

- [ ] Correct pod count per pack
- [ ] No leakage, breakage, or packaging failure
- [ ] Batch date / expiry date visible (cosmetics)
- [ ] Ingredient list matches approved spec sheet
- [ ] No unauthorized label changes
- [ ] Fragrance and color consistent with previous batch
- [ ] Weight within ±5% of spec

---

## Shipping Times Policy Logic

| Scenario | Customer Promise | What You Tell the Customer |
|----------|-----------------|---------------------------|
| US warehouse stock | 5–7 business days | "Ships within 1 business day. Delivered in 5–7 business days." |
| CN standard shipping | 10–18 business days | "Ships within 2 business days. Delivered in 10–18 business days." |
| Peak season (Nov–Jan) | Add 3–5 days buffer | Add a site-wide banner: "Holiday orders: allow extra 3–5 days" |
| Expedited option | 3–5 business days (US warehouse) | Offer as an upsell at checkout for $7.99 |

> **Rule:** Always add 2 extra days to the supplier's stated shipping time.  
> Never promise a specific delivery date — promise a window.

---

## Returns & Refunds Decision Tree

```
Customer contacts support
        │
        ▼
Is the item damaged / defective?
  ├── YES → Offer replacement (no return required)
  │          Send replacement + apology note
  │          File claim with supplier
  └── NO  ─┬─ Did they use the product?
            │
            ├── YES (opened) → Offer 50% store credit
            │                  ("We can't resell opened pods")
            │
            └── NO (unopened, within 30 days)
                    │
                    ├── Reason: "Changed mind / don't need it"
                    │     → Offer store credit OR return (customer pays return shipping)
                    │
                    ├── Reason: "Allergic reaction / skin irritation"
                    │     → Full refund, no return required
                    │       Document the batch number
                    │       Monitor for pattern (>3 complaints = pull SKU)
                    │
                    └── Reason: "Not as described / wrong item"
                          → Full refund + replacement if desired
                            Supplier dispute for credit
```

**30-day return window. No restocking fee. Store credit preferred over cash refund.**

---

## Customer Support Macros

### Macro 1 — Order Status / Where Is My Order?

**Subject:** Your FaceTea Shop order update

> Hi [First Name],
>
> Thanks for your order! Your pods are on their way. 🎉
>
> Your tracking number is: **[TRACKING]**
> Track here: **[CARRIER_LINK]**
>
> Expected delivery: **[DATE_WINDOW]**
>
> If anything looks off, just reply to this email and we'll sort it out within one business day.
>
> Warm regards,
> [Name], FaceTea Shop Support

---

### Macro 2 — Damaged / Defective Item

**Subject:** We're making this right, [First Name]

> Hi [First Name],
>
> I'm so sorry your order arrived in less-than-perfect condition — that's not the experience we want for you.
>
> I've already arranged a replacement shipment at no cost to you. Your new order number is **[NEW_ORDER]** and it will ship within 1 business day.
>
> You don't need to send anything back. Enjoy the replacement with our compliments.
>
> If you have any other questions, I'm right here.
>
> [Name], FaceTea Shop Support

---

### Macro 3 — Refund Request (Opened Product)

**Subject:** About your return request

> Hi [First Name],
>
> Thank you for reaching out. Because pods are a personal hygiene product, we're unable to accept returns on opened packs for health reasons.
>
> However, I'd love to make this right. I can offer you a **50% store credit** ($[AMOUNT]) toward any future order — no expiry date, use it whenever you're ready.
>
> Just reply to this email and I'll activate the credit on your account immediately.
>
> [Name], FaceTea Shop Support

---

### Macro 4 — Skin Sensitivity / Reaction Report

**Subject:** We take this seriously — and we've got you covered

> Hi [First Name],
>
> Thank you for letting us know. Your comfort and safety are our top priority, and I'm genuinely sorry to hear you had a reaction.
>
> I've issued a **full refund** of $[AMOUNT] to your original payment method. You should see it within 3–5 business days.
>
> You don't need to return anything.
>
> As a reminder, if you experience any severe or persistent reaction, please consult a healthcare professional. Our formula is dermatologically tested, but individual sensitivities vary.
>
> [Name], FaceTea Shop Support

---

### Macro 5 — Subscription / Refill Reminder (Proactive Outreach, Day 25)

**Subject:** Your pods are almost out — ready for more?

> Hi [First Name],
>
> It's been about 25 days since your FaceTea Shop Starter Pack arrived — meaning you're probably on your last pod or two! 🫧
>
> Tap below to reorder in one click:
>
> 👉 **[REORDER_LINK]** — Same pack, $34.99
> 💚 **[BUNDLE_LINK]** — 3-Month Supply, $79.99 (save $24.98)
>
> Your skin will thank you. 😊
>
> [Name], FaceTea Shop Team
> P.S. Use code **REFILL10** for 10% off your next order.

---

## Order Fulfillment Workflow

### Manual (1–20 orders/day)

1. **Morning check (8 AM)** — Review new orders in Stripe Dashboard → Payments
2. **Log to spreadsheet** — Order ID, SKU, customer name, shipping address, email
3. **Place order with supplier** — Copy address from Stripe into CJDropshipping / AliExpress dashboard
4. **Get tracking number** — Supplier provides within 24–48 hours
5. **Send tracking email** — Use Template 7 (Order Shipped) via Mailchimp or manually
6. **Day 25 proactive email** — Trigger Macro 5 manually (or via Mailchimp automation)

### Semi-Automated (20+ orders/day)

| Tool | Function | Cost |
|------|----------|------|
| **DSers** (AliExpress) | Bulk order placement to AliExpress in 1 click | Free |
| **CJDropshipping Chrome Extension** | Auto-fill CJDropshipping orders | Free |
| **AutoDS** | Full auto-fulfillment + tracking sync | $9.90/mo (basic) |
| **Zendrop** | Auto-fulfillment with tracking sync | $49/mo (pro) |

> **Recommended path:** Start manual. At 20+ orders/day, add DSers (free) for AliExpress orders.  
> At 50+ orders/day, evaluate AutoDS or Zendrop for full automation.
