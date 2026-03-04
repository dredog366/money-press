# 11 — Hostinger DNS Records for facetea.org

Captured: 2026-03-04

---

## MX Records (Email Routing)

| Type | Name | Points To              | Priority | TTL   |
|------|------|------------------------|----------|-------|
| MX   | @    | mx1.hostinger.com      | 5        | 14400 |
| MX   | @    | mx2.hostinger.com      | 10       | 14400 |

---

## ALIAS / A Record

| Type  | Name | Points To                     | TTL |
|-------|------|-------------------------------|-----|
| ALIAS | @    | facetea.org.cdn.hstgr.net     | 300 |

---

## CNAME Records

| Type  | Name                          | Points To                                    | TTL |
|-------|-------------------------------|----------------------------------------------|-----|
| CNAME | www                           | www.facetea.org.cdn.hstgr.net                | 300 |
| CNAME | autoconfig                    | autoconfig.mail.hostinger.com                | 300 |
| CNAME | autodiscover                  | autodiscover.mail.hostinger.com              | 300 |
| CNAME | hostingermail-a._domainkey    | hostingermail-a.dkim.mail.hostinger.com      | 300 |
| CNAME | hostingermail-b._domainkey    | hostingermail-b.dkim.mail.hostinger.com      | 300 |
| CNAME | hostingermail-c._domainkey    | hostingermail-c.dkim.mail.hostinger.com      | 300 |

---

## TXT Records

| Type | Name   | Value                                            | TTL  |
|------|--------|--------------------------------------------------|------|
| TXT  | @      | v=spf1 include:_spf.mail.hostinger.com ~all      | 3600 |
| TXT  | _dmarc | v=DMARC1; p=none                                 | 3600 |

---

## Notes

- **ALIAS @** points to Hostinger's CDN (`cdn.hstgr.net`) — this handles the root domain with CDN acceleration.
- **CNAME www** mirrors the root via the same CDN.
- **DKIM CNAMEs** (a/b/c) enable email authentication for Hostinger mail.
- **SPF TXT** authorizes Hostinger's mail servers to send on behalf of facetea.org.
- **DMARC** is currently set to `p=none` (monitor-only). Consider upgrading to `p=quarantine` or `p=reject` once email delivery is confirmed stable.
- **MX priority 5** (mx1) is primary; **priority 10** (mx2) is fallback.
