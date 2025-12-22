# Domain Configuration Guide - go-drive.in

## ✅ Domain Added to Vercel Project

The domain `go-drive.in` has been added to your Vercel project. However, you need to configure DNS settings to complete the setup.

## 📋 DNS Configuration Steps

### Step 1: Get DNS Records from Vercel

1. Go to your Vercel Dashboard: https://vercel.com/micheys-projects/godrive/settings/domains
2. Find `go-drive.in` in the domains list
3. Click on it to see the DNS configuration

### Step 2: Configure DNS at Your Domain Registrar

You need to add DNS records at your domain registrar (where you purchased `go-drive.in`).

**Option A: Use Vercel Nameservers (Recommended)**

1. In Vercel Dashboard → Domains → go-drive.in
2. Copy the nameservers provided (usually 4 nameservers like `ns1.vercel-dns.com`)
3. Go to your domain registrar's DNS settings
4. Replace existing nameservers with Vercel's nameservers
5. Wait 24-48 hours for propagation

**Option B: Add DNS Records Manually**

Add these DNS records at your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Or if Vercel provides specific IPs:
- Check Vercel Dashboard for exact A record values
- Usually: `76.76.21.21` or Vercel's provided IPs

### Step 3: Verify Domain

1. After DNS changes, go back to Vercel Dashboard
2. Vercel will automatically verify the domain
3. SSL certificate will be automatically provisioned (can take up to 24 hours)

### Step 4: Update Environment Variable

Once the domain is verified and working:

```bash
# Update VITE_APP_URL to use the custom domain
export VERCEL_TOKEN=zxNXc399Smbrn07ky9NGizXK
echo "https://go-drive.in" | npx vercel env rm VITE_APP_URL production --token $VERCEL_TOKEN
echo "https://go-drive.in" | npx vercel env add VITE_APP_URL production --token $VERCEL_TOKEN
```

Or update it in Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Edit `VITE_APP_URL`
3. Change to: `https://go-drive.in`
4. Redeploy

## 🔍 Current Status

- ✅ Domain added to Vercel project
- ⏳ Waiting for DNS configuration
- ⏳ Waiting for domain verification
- ⏳ SSL certificate will be auto-provisioned

## 📝 Quick Commands

```bash
# Check domain status
npx vercel domains ls --token YOUR_TOKEN

# Inspect domain configuration
npx vercel domains inspect go-drive.in --token YOUR_TOKEN

# Add alias (alternative method)
npx vercel alias https://godrive-navy.vercel.app go-drive.in --token YOUR_TOKEN
```

## 🌐 Access Your Site

Once DNS is configured and verified:
- **Primary**: https://go-drive.in
- **WWW**: https://www.go-drive.in (if configured)
- **Vercel**: https://godrive-navy.vercel.app (still works)

## ⚠️ Important Notes

1. **DNS Propagation**: Can take 24-48 hours
2. **SSL Certificate**: Auto-provisioned after DNS verification (up to 24 hours)
3. **Domain Verification**: Vercel will verify automatically once DNS is correct
4. **HTTPS**: Automatically enabled after SSL is provisioned

## 🆘 Troubleshooting

### Domain Not Verifying
- Check DNS records are correct
- Wait 24-48 hours for propagation
- Verify nameservers are pointing to Vercel

### SSL Certificate Not Issuing
- Ensure DNS is correctly configured
- Wait up to 24 hours after DNS verification
- Check Vercel Dashboard for SSL status

### Site Not Loading
- Verify DNS propagation: `dig go-drive.in` or `nslookup go-drive.in`
- Check Vercel deployment is successful
- Verify domain is assigned to correct project

---

**Last Updated**: December 22, 2024
**Domain**: go-drive.in
**Project**: godrive (micheys-projects)
