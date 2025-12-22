# 🌐 Domain Setup: go-drive.in

## ✅ Current Status

- Domain `go-drive.in` has been added to your Vercel project
- **Next Step**: Configure DNS at your domain registrar

## 📋 DNS Configuration

### Method 1: Use Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/micheys-projects/godrive/settings/domains
   - Or: https://vercel.com/dashboard → Select "godrive" project → Settings → Domains

2. **Find your domain**
   - Look for `go-drive.in` in the domains list
   - Click on it to see DNS configuration instructions

3. **Get DNS Records**
   - Vercel will show you the exact DNS records needed
   - Usually includes:
     - A record pointing to Vercel's IP
     - CNAME record for www subdomain

### Method 2: Manual DNS Configuration

Add these DNS records at your domain registrar:

#### For Root Domain (go-drive.in):
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

#### For WWW Subdomain (www.go-drive.in):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

**Note**: Vercel may provide different IP addresses. Check the Vercel Dashboard for the exact values.

### Method 3: Use Vercel Nameservers (Easiest)

1. In Vercel Dashboard → Domains → go-drive.in
2. Copy the nameservers (usually 4 nameservers)
3. Go to your domain registrar
4. Replace existing nameservers with Vercel's nameservers
5. Save and wait for propagation

## 🔧 Step-by-Step Instructions

### Step 1: Access Your Domain Registrar

Log in to where you purchased `go-drive.in` (e.g., GoDaddy, Namecheap, Google Domains, etc.)

### Step 2: Find DNS Settings

Look for:
- DNS Management
- DNS Settings
- Name Servers
- DNS Records

### Step 3: Add DNS Records

**If using A/CNAME records:**
- Add the A record for root domain
- Add the CNAME record for www subdomain

**If using nameservers:**
- Replace existing nameservers with Vercel's nameservers

### Step 4: Wait for Propagation

- DNS changes can take 24-48 hours to propagate
- You can check status: https://dnschecker.org/#A/go-drive.in

### Step 5: Verify in Vercel

1. Go back to Vercel Dashboard → Domains
2. Vercel will automatically verify once DNS is correct
3. SSL certificate will be auto-provisioned (up to 24 hours)

## 🔄 After DNS is Configured

Once the domain is verified:

1. **Update Environment Variable**:
   ```bash
   # Update VITE_APP_URL to use custom domain
   export VERCEL_TOKEN=zxNXc399Smbrn07ky9NGizXK
   echo "https://go-drive.in" | npx vercel env rm VITE_APP_URL production --token $VERCEL_TOKEN
   echo "https://go-drive.in" | npx vercel env add VITE_APP_URL production --token $VERCEL_TOKEN
   ```

2. **Redeploy** (if needed):
   - Vercel will automatically use the domain once verified
   - Or trigger a new deployment

## 🌐 Access Your Site

Once configured:
- **Primary**: https://go-drive.in
- **WWW**: https://www.go-drive.in
- **Vercel URL**: https://godrive-navy.vercel.app (still works)

## ⏱️ Timeline

- **DNS Propagation**: 24-48 hours
- **Domain Verification**: Automatic after DNS is correct
- **SSL Certificate**: Up to 24 hours after verification

## 🆘 Troubleshooting

### Domain Not Verifying
- ✅ Check DNS records are correct
- ✅ Wait 24-48 hours for propagation
- ✅ Verify using: `dig go-drive.in` or `nslookup go-drive.in`
- ✅ Check Vercel Dashboard for specific error messages

### SSL Certificate Not Issuing
- ✅ Ensure DNS is correctly configured
- ✅ Wait up to 24 hours after DNS verification
- ✅ Check Vercel Dashboard → Domains → SSL status

### Site Not Loading
- ✅ Verify DNS propagation: https://dnschecker.org
- ✅ Check Vercel deployment is successful
- ✅ Verify domain is assigned to correct project
- ✅ Clear browser cache

## 📞 Need Help?

1. Check Vercel Dashboard for domain status
2. Review DNS configuration at your registrar
3. Contact your domain registrar support if needed
4. Vercel Support: https://vercel.com/support

---

**Domain**: go-drive.in  
**Project**: godrive  
**Vercel URL**: https://godrive-navy.vercel.app  
**Status**: Waiting for DNS configuration
