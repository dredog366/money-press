# Connecting facetea.org to Your WordPress.com Site

Your WordPress site is currently at: `dgrelli-bopge.wpcomstaging.com`
Your target domain is: `facetea.org`

**Your setup:**
- **Domain purchased through:** Hostinger (registered via Name.com behind the scenes)
- **Domain managed at:** Hostinger dashboard (hpanel.hostinger.com)
- **Registered:** 2026-03-03

The domain is currently pointing to Hostinger's servers. We need to change the nameservers in Hostinger to point to WordPress.com instead.

---

## Prerequisites

- A WordPress.com plan that supports custom domains (Personal plan or higher)
- Access to your **Hostinger** account (where you bought facetea.org)

---

## Step 1: Change Nameservers in Hostinger (Do This First)

1. Log in to **Hostinger** at https://hpanel.hostinger.com
2. In the left sidebar, click **Domains**
3. Click on **facetea.org**
4. Look for **DNS / Nameservers** (may be under "DNS Zone" or "Nameservers" tab)
5. Switch to **custom nameservers** (instead of Hostinger's default)
6. **Delete** the existing Hostinger nameservers
7. **Add** these two WordPress.com nameservers:
```
ns1.wordpress.com
ns2.wordpress.com
```
8. **Save** changes

> **Note:** Hostinger may warn you that changing nameservers means their hosting won't work for this domain. That's fine — you want WordPress.com to handle it now.

---

## Step 2: Add the Domain in WordPress.com

1. Log in to https://wordpress.com/home
2. Select your site (`dgrelli-bopge.wpcomstaging.com`)
3. Go to **Upgrades > Domains** (or **Settings > Domains**)
4. Click **"Add a domain"**
5. Select **"Use a domain I own"** (also called "Connect a domain")
6. Enter: `facetea.org`
7. WordPress.com will attempt to verify the nameservers

---

## Alternative: Use DNS Records Instead of Nameservers

If you prefer to keep Hostinger managing DNS (and just point records to WordPress.com):

1. In Hostinger, go to **Domains > facetea.org > DNS Zone**
2. **Delete** any existing A records (they point to Hostinger's servers)
3. **Delete** any existing CNAME record for `www`
4. **Add** the following records:

| Type | Host/Name | Value | TTL |
|------|-----------|-------|-----|
| A | @ (or blank) | 192.0.78.24 | 300 |
| A | @ (or blank) | 192.0.78.25 | 300 |
| CNAME | www | `dgrelli-bopge.wpcomstaging.com` | 300 |

> **Important:** Use the exact IPs that WordPress.com shows you in Step 2 — they may differ from the ones above. Always trust what WordPress.com displays.

5. Save all changes

---

## Step 3: Verify in WordPress.com

1. Go back to WordPress.com **Upgrades > Domains**
2. Click **"Verify"** next to `facetea.org`
3. DNS propagation usually takes 15 minutes to 1 hour, but can take up to 48 hours
4. You can check propagation status at https://dnschecker.org (search for `facetea.org` A record)
5. Once verified, click **"Make primary"** to set `facetea.org` as your main domain
6. WordPress.com will automatically redirect `dgrelli-bopge.wpcomstaging.com` → `facetea.org`

---

## Step 4: SSL Certificate

WordPress.com automatically provisions a **free SSL certificate** for your custom domain. This usually happens within minutes of DNS verification, but can take up to 72 hours.

You'll know it's working when `https://facetea.org` shows a padlock icon in the browser.

---

## Troubleshooting

### "Domain not verified" after several hours
- Log back into Hostinger and confirm the nameservers or DNS records are saved correctly
- Make sure you **deleted** the old Hostinger A records if using the DNS records method
- Check propagation at https://dnschecker.org (search for `facetea.org`)

### "ERR_NAME_NOT_RESOLVED" or site won't load
- Nameserver changes can take up to 48 hours to fully propagate (usually 1–2 hours)
- Clear your browser cache and try in an incognito/private window

### "SSL not working" (shows insecure warning)
- Wait up to 72 hours after DNS verification
- Go to **Upgrades > Domains** in WordPress.com, click on `facetea.org`, check SSL status
- If still not working after 72 hours, contact WordPress.com support

### Still seeing the Hostinger default page
- The old DNS records are still cached. Wait for propagation or try from a different device/network.

---

## After Connection

Once `facetea.org` is live:
1. Update your **WooCommerce > Settings > General** store URL if needed
2. Update any hardcoded links in your site content
3. Test that `facetea.org`, `www.facetea.org`, and the old staging URL all work
4. Set up email forwarding (e.g., `support@facetea.org`) via Hostinger's email settings
