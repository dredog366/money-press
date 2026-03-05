# Connecting facetea.org to Your Hostinger WordPress/WooCommerce Site

Your target domain is: `facetea.org`

**Your setup:**
- **Domain purchased through:** Vercel (registrar: Name.com behind the scenes)
- **Domain managed at:** Vercel Dashboard (vercel.com/dashboard)
- **Hosting:** Hostinger (WordPress + WooCommerce)

---

## Option A: Change Nameservers to Hostinger (Recommended)

This hands all DNS management to Hostinger — simplest approach.

### Step 1: Find Hostinger's Nameservers

1. Log in to https://hpanel.hostinger.com
2. Go to **Hosting > Manage** for your plan
3. In the sidebar, click **Plan Details** or **Account Details**
4. Note the nameservers — they look like:
```
ns1.dns-parking.com
ns2.dns-parking.com
```
Or for premium plans:
```
ns1.hostinger.com
ns2.hostinger.com
```

### Step 2: Update Nameservers in Vercel

1. Go to https://vercel.com/dashboard
2. Click **Domains** in the top nav
3. Click on **facetea.org**
4. Find the **Nameservers** section
5. Change the nameservers from Vercel's defaults to Hostinger's nameservers (from Step 1)
6. Save

> **Note:** After this change, Vercel no longer manages DNS for facetea.org. All DNS records will be managed in Hostinger's hPanel.

### Step 3: Add Domain in Hostinger

1. In hPanel, go to **Hosting > Manage**
2. Click **Domains** in the sidebar
3. Click **Add Domain**
4. Enter `facetea.org` and click **Add**
5. Hostinger will auto-configure the A records, CNAME, and SSL

### Step 4: Wait for Propagation

- Nameserver changes take **1–48 hours** to propagate (usually 1–4 hours)
- Check at https://dnschecker.org — search for `facetea.org` NS record
- Once propagated, `facetea.org` will point to your Hostinger server

---

## Option B: Keep DNS on Vercel, Point A Records to Hostinger

Use this if you want Vercel to keep managing DNS but serve the site from Hostinger.

### Step 1: Find Your Hostinger Server IP

1. Log in to https://hpanel.hostinger.com
2. Go to **Hosting > Manage**
3. In the sidebar, click **Plan Details** or **Hosting Account**
4. Find **Server IP Address** (looks like `123.456.78.90`)

### Step 2: Update DNS Records in Vercel

1. Go to https://vercel.com/dashboard
2. Click **Domains** > **facetea.org** > **DNS Records**
3. **Delete** any existing A records or CNAME records (these point to Vercel's servers)
4. Add these records:

| Type  | Name | Value                      | TTL   |
|-------|------|----------------------------|-------|
| A     | @    | `<your Hostinger server IP>` | 3600  |
| CNAME | www  | `facetea.org`              | 3600  |

### Step 3: Add Domain in Hostinger

1. In hPanel, go to **Hosting > Manage > Domains**
2. Click **Add Domain** > enter `facetea.org`
3. Select **"I already pointed my domain"** (since DNS is on Vercel)

### Step 4: Force SSL in Hostinger

1. In hPanel, go to **Security > SSL**
2. Click **Install** for facetea.org
3. Select **Free SSL (Let's Encrypt)**
4. Wait a few minutes for the certificate to provision

---

## After Domain Connection

Once `facetea.org` is resolving to your Hostinger server:

1. **Set WordPress Site URL**
   - In hPanel, go to **WordPress > Dashboard**
   - Or in wp-admin: **Settings > General**
   - Set both **WordPress Address** and **Site Address** to `https://facetea.org`

2. **WooCommerce Store URL**
   - Go to **WooCommerce > Settings > General**
   - Confirm store address uses `facetea.org`

3. **Force HTTPS**
   - In hPanel: **Security > SSL > Force HTTPS** — toggle ON
   - Or install the "Really Simple SSL" plugin

4. **Set up email**
   - Hostinger includes free email hosting
   - In hPanel: **Emails > Manage**
   - Create `support@facetea.org` or `hello@facetea.org`
   - This is a major advantage over Vercel (which has no email service)

5. **Test everything**
   - `https://facetea.org` loads your WordPress site
   - `https://www.facetea.org` redirects to the above
   - WooCommerce checkout works
   - SSL padlock shows in browser

---

## Troubleshooting

### Site still shows Vercel page
- Old DNS is cached. Wait for propagation or try incognito/different device.
- Verify at https://dnschecker.org that the A record points to Hostinger's IP (not `76.76.21.21`).

### "Domain not pointed" in Hostinger
- Nameserver/DNS changes haven't propagated yet. Wait 1–4 hours.
- Double-check the nameservers or A record are correct.

### SSL certificate won't install
- SSL requires the domain to resolve to Hostinger first. Wait for DNS propagation.
- In hPanel: **Security > SSL** > click **Install** again after propagation.

### WordPress shows "localhost" or staging URL
- Go to wp-admin **Settings > General** and update both URL fields to `https://facetea.org`.
- If locked out, edit via hPanel **File Manager**: `wp-config.php` — add:
```php
define('WP_HOME', 'https://facetea.org');
define('WP_SITEURL', 'https://facetea.org');
```
