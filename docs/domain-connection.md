# Connecting facetea.org to Your WordPress.com Site

Your WordPress site is currently at: `dgrelli-bopge.wpcomstaging.com`
Your target domain is: `facetea.org`

**Your setup:**
- **Domain registrar:** Name.com, Inc.
- **Current hosting pointed to:** Hostinger International Limited
- **Registered:** 2026-03-03

The domain is currently pointing to Hostinger, not WordPress.com. We need to change the DNS records at Name.com to point to your WordPress.com site instead.

---

## Prerequisites

- A WordPress.com plan that supports custom domains (Personal plan or higher)
- Access to your **Name.com** account (where you bought facetea.org)

---

## Step 1: Add the Domain in WordPress.com

1. Log in to https://wordpress.com/home
2. Select your site (`dgrelli-bopge.wpcomstaging.com`)
3. Go to **Upgrades > Domains** (or **Settings > Domains**)
4. Click **"Add a domain"**
5. Select **"Use a domain I own"** (also called "Connect a domain")
6. Enter: `facetea.org`
7. WordPress.com will show you the DNS records you need to add — **write these down or screenshot them**

---

## Step 2: Update DNS Records at Name.com

1. Log in to your **Name.com** account at https://www.name.com/account
2. Click on **"My Domains"**
3. Click on **facetea.org**
4. Go to the **"DNS Records"** tab (or "Manage DNS")

### Option A: Change Nameservers to WordPress.com (Easiest)

This lets WordPress.com manage all DNS for you:

1. In Name.com, go to **Nameservers** section
2. Remove the current Hostinger nameservers
3. Add these WordPress.com nameservers:
```
ns1.wordpress.com
ns2.wordpress.com
```
4. Save changes

### Option B: Add DNS Records Manually (Keep Name.com as DNS manager)

If you prefer to keep Name.com managing your DNS:

1. **Delete** any existing A records pointing to Hostinger IPs
2. **Delete** any existing CNAME record for `www` pointing to Hostinger
3. **Add** the following records:

| Type | Host/Name | Value | TTL |
|------|-----------|-------|-----|
| A | @ (or blank) | 192.0.78.24 | 300 |
| A | @ (or blank) | 192.0.78.25 | 300 |
| CNAME | www | `dgrelli-bopge.wpcomstaging.com` | 300 |

> **Important:** Use the exact IPs that WordPress.com shows you in Step 1 — they may differ from the ones above. Always trust what WordPress.com displays.

4. Save all changes

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
- Log back into Name.com and confirm the DNS records are saved correctly
- Make sure you **deleted** the old Hostinger A records — conflicting records will block verification
- Check propagation at https://dnschecker.org

### "ERR_NAME_NOT_RESOLVED" or site won't load
- If you changed nameservers (Option A), it can take up to 48 hours for the change to fully propagate
- Clear your browser cache and try in an incognito/private window

### "SSL not working" (shows insecure warning)
- Wait up to 72 hours after DNS verification
- Go to **Upgrades > Domains** in WordPress.com, click on `facetea.org`, check SSL status
- If still not working after 72 hours, contact WordPress.com support

### Still seeing the Hostinger site
- The old DNS records are still cached. Wait for propagation or try from a different device/network.

---

## After Connection

Once `facetea.org` is live:
1. Update your **WooCommerce > Settings > General** store URL if needed
2. Update any hardcoded links in your site content
3. Test that `facetea.org`, `www.facetea.org`, and the old staging URL all work
4. Set up email forwarding (e.g., `support@facetea.org`) via Name.com's email forwarding settings
