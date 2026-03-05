# Connecting facetea.org to Your WordPress.com Site

Your WordPress site is currently at: `dgrelli-bopge.wpcomstaging.com`
Your target domain is: `www.facetea.org`

---

## Prerequisites

- A WordPress.com plan that supports custom domains (Personal plan or higher)
- Access to your domain registrar's DNS settings (wherever you bought facetea.org)

---

## Option A: Add Domain via WordPress.com (Recommended)

This is the simplest method — WordPress.com handles most of the DNS for you.

### Step 1: Add the Domain in WordPress.com
1. Go to your WordPress.com dashboard: https://wordpress.com/home
2. Navigate to **Upgrades > Domains** (or **Settings > Domains**)
3. Click **"Add a domain"**
4. Select **"Use a domain I own"**
5. Enter: `facetea.org`
6. WordPress.com will display the DNS records you need to set

### Step 2: Update DNS at Your Registrar
WordPress.com will ask you to add these records at your domain registrar (GoDaddy, Namecheap, Google Domains, etc.):

**Option A1: Change Nameservers (easiest)**
If WordPress.com offers to manage your DNS, change your nameservers to:
```
ns1.wordpress.com
ns2.wordpress.com
```

**Option A2: Add DNS Records Manually**
If you prefer to keep your current nameservers, add these records:

| Type | Host/Name | Value | TTL |
|------|-----------|-------|-----|
| A | @ | 192.0.78.24 | 3600 |
| A | @ | 192.0.78.25 | 3600 |
| CNAME | www | `dgrelli-bopge.wpcomstaging.com` | 3600 |

> **Note:** The A record IPs above are WordPress.com's standard IPs. WordPress.com may show you different IPs during setup — always use the ones they display.

### Step 3: Verify and Set as Primary
1. Back in WordPress.com **Domains** settings, click **Verify**
2. DNS propagation takes 15 minutes to 48 hours (usually under 1 hour)
3. Once verified, click **"Make primary"** to set `facetea.org` as your main domain
4. WordPress.com will automatically redirect `dgrelli-bopge.wpcomstaging.com` to `facetea.org`

### Step 4: SSL Certificate
WordPress.com automatically provisions a free SSL certificate for your custom domain. This may take up to 72 hours but is usually done within minutes of DNS verification.

---

## Option B: Transfer Domain to WordPress.com

If you want WordPress.com to fully manage your domain:

1. Go to **Upgrades > Domains > Add a domain > Transfer**
2. Enter `facetea.org`
3. You'll need the **transfer authorization code** (EPP code) from your current registrar
4. Follow the prompts to complete the transfer (takes 5–7 days)

---

## Troubleshooting

### "Domain not verified" after 24 hours
- Double-check DNS records at your registrar match exactly what WordPress.com shows
- Make sure there are no conflicting A or CNAME records
- Use https://dnschecker.org to verify propagation

### "SSL not working" (shows insecure warning)
- Wait up to 72 hours after DNS verification
- Go to **Upgrades > Domains**, click on `facetea.org`, and check SSL status
- If still not working, contact WordPress.com support

### Where did I buy facetea.org?
If you don't remember your registrar, look up your domain at https://whois.domaintools.com/facetea.org — the registrar will be listed.

---

## After Connection

Once `facetea.org` is live:
1. Update your **WooCommerce > Settings > General** store URL if needed
2. Update any hardcoded links in your site content
3. Test that `facetea.org`, `www.facetea.org`, and the old staging URL all work
4. Set up email forwarding (e.g., `support@facetea.org`) via your registrar or WordPress.com
