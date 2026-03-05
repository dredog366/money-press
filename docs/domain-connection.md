# Connecting facetea.org to Your WordPress.com Site

Your WordPress site is currently at: `dgrelli-bopge.wpcomstaging.com`
Your target domain is: `facetea.org`

**Your setup:**
- **Domain purchased through:** Vercel
- **Domain managed at:** Vercel Dashboard (vercel.com/dashboard)
- **Registered:** 2026-03-03 (via Name.com as registrar behind the scenes)

---

## Prerequisites

- A WordPress.com plan that supports custom domains (Personal plan or higher)
- Access to your **Vercel** account (where you bought facetea.org)

---

## Step 1: Change DNS Records in Vercel

1. Go to https://vercel.com/dashboard
2. Click on **Domains** in the top nav (or go to https://vercel.com/dashboard/domains)
3. Click on **facetea.org**
4. Go to the **DNS Records** tab

### Remove Existing Records
Delete any A records or CNAME records that Vercel auto-created (these point to Vercel's servers — you don't want that if you're using WordPress.com).

### Add WordPress.com Records

Add these DNS records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 192.0.78.24 | 60 |
| A | @ | 192.0.78.25 | 60 |
| CNAME | www | `dgrelli-bopge.wpcomstaging.com` | 60 |

> **Important:** WordPress.com may show you different IPs during setup (Step 2). Always use the IPs that WordPress.com displays — they override the ones above.

### Alternative: Change Nameservers
If you prefer to let WordPress.com manage all DNS:

1. In Vercel **Domains > facetea.org**, look for **Nameservers** settings
2. Change nameservers from Vercel's defaults to:
```
ns1.wordpress.com
ns2.wordpress.com
```
3. Save — note this means Vercel will no longer manage DNS for this domain

---

## Step 2: Add the Domain in WordPress.com

1. Log in to https://wordpress.com/home
2. Select your site (`dgrelli-bopge.wpcomstaging.com`)
3. Go to **Upgrades > Domains** (or **Settings > Domains**)
4. Click **"Add a domain"**
5. Select **"Use a domain I own"** (also called "Connect a domain")
6. Enter: `facetea.org`
7. WordPress.com will show you the DNS records needed — **use those exact IPs** for the A records if they differ from what's above
8. WordPress.com will attempt to verify the DNS

---

## Step 3: Verify in WordPress.com

1. Go back to WordPress.com **Upgrades > Domains**
2. Click **"Verify"** next to `facetea.org`
3. DNS propagation usually takes 15 minutes to 1 hour, but can take up to 48 hours
4. You can check propagation at https://dnschecker.org (search for `facetea.org` A record)
5. Once verified, click **"Make primary"** to set `facetea.org` as your main domain
6. WordPress.com will automatically redirect `dgrelli-bopge.wpcomstaging.com` to `facetea.org`

---

## Step 4: SSL Certificate

WordPress.com automatically provisions a free SSL certificate for your custom domain. This usually happens within minutes of DNS verification, but can take up to 72 hours.

You'll know it's working when `https://facetea.org` shows a padlock icon in the browser.

---

## Troubleshooting

### "Domain not verified" after several hours
- Log back into Vercel and confirm the DNS records are saved correctly
- Make sure you **deleted** the old Vercel A/CNAME records that pointed to Vercel's servers (like `76.76.21.21`)
- Check propagation at https://dnschecker.org (search for `facetea.org`)

### "ERR_NAME_NOT_RESOLVED" or site won't load
- DNS changes can take up to 48 hours to propagate (usually 15 min – 1 hour)
- Clear your browser cache and try in an incognito/private window

### "SSL not working" (shows insecure warning)
- Wait up to 72 hours after DNS verification
- Go to **Upgrades > Domains** in WordPress.com, click on `facetea.org`, check SSL status
- If still not working after 72 hours, contact WordPress.com support

### Still seeing Vercel's default page or parking page
- The old DNS records are still cached. Wait for propagation or try from a different device/network.
- Double-check that you removed Vercel's A record pointing to `76.76.21.21`

---

## After Connection

Once `facetea.org` is live:
1. Update your **WooCommerce > Settings > General** store URL if needed
2. Update any hardcoded links in your site content
3. Test that `facetea.org`, `www.facetea.org`, and the old staging URL all work
4. Set up email forwarding (e.g., `support@facetea.org`) — Vercel doesn't offer email, so you'll need a service like Zoho Mail (free tier), Google Workspace, or Cloudflare Email Routing
