# 🚀 Vercel Deployment - Step by Step

## Prerequisites

✅ Code is ready  
✅ GitHub repository created  
✅ Environment variables documented  

---

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `godrive`
3. Description: `Self-drive car rental platform for Bangalore - Peer-to-peer marketplace`
4. Visibility: Choose Private or Public
5. **Important**: Don't initialize with README, .gitignore, or license
6. Click **"Create repository"**
7. **Copy the repository URL** (e.g., `https://github.com/YOUR_USERNAME/godrive.git`)

---

## Step 2: Push Code to GitHub

Run these commands:

```bash
cd /mnt/projects/projects/godrive

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - GoDrive MVP

- Complete car rental platform
- UPI payment integration
- Admin & Host dashboards with analytics
- Premium landing page with animations
- Google Maps with Leaflet fallback
- Production ready for deployment"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/godrive.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note**: If prompted for credentials:
- Username: Your GitHub username
- Password: Use a Personal Access Token (not your password)
  - Generate at: GitHub → Settings → Developer settings → Personal access tokens

---

## Step 3: Deploy to Vercel

### 3.1 Sign Up / Sign In

1. Go to https://vercel.com
2. Sign in with GitHub (recommended for auto-deployment)

### 3.2 Import Repository

1. Click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Find and select `godrive` repository
4. Click **"Import"**

### 3.3 Configure Project

Vercel auto-detects Vite. Verify:

- **Framework Preset**: Vite ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `dist` ✅
- **Install Command**: `npm install` ✅

### 3.4 Add Environment Variables

Click **"Environment Variables"** and add these:

**For Production, Preview, and Development:**

```
VITE_SUPABASE_URL
https://aqfmwziclbksxjuvwlls.supabase.co

VITE_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZm13emljbGJrc3hqdXZ3bGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MDA0MTcsImV4cCI6MjA4MTM3NjQxN30.W8tVh3lDGFUgkmYDPsALMGhzSrfibG9ThxWFjg28WDc

VITE_APP_NAME
GoDrive

VITE_APP_ENV
production

VITE_GOOGLE_MAPS_API_KEY
AIzaSyD_Hwye2DnWSygdPXO9AWg36Aws689KCmY

VITE_UPI_ID
meerm.u.s7772@axl

VITE_UPI_NAME
GoDrive

VITE_SUPPORT_PHONE
+919876543210

VITE_SUPPORT_EMAIL
support@godrive.in
```

**Important**: 
- Add `VITE_APP_URL` after first deployment (use your Vercel URL)
- Select all three environments: Production, Preview, Development

### 3.5 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Your app will be live at: `https://godrive.vercel.app` (or similar)

---

## Step 4: Auto-Deployment Setup ✅

**Auto-deployment is automatic!** Vercel automatically:

- ✅ **Production**: Deploys on every push to `main` branch
- ✅ **Preview**: Creates preview deployments for pull requests
- ✅ **Development**: Deploys on push to other branches

### Verify Auto-Deployment

1. Make a small change (e.g., update README)
2. Commit and push:
   ```bash
   git add README.md
   git commit -m "Test auto-deployment"
   git push origin main
   ```
3. Go to Vercel Dashboard
4. You should see a new deployment starting automatically

---

## Step 5: Update App URL (After First Deployment)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add or update:
   ```
   VITE_APP_URL
   https://godrive.vercel.app
   ```
   (Use your actual Vercel URL)
3. Redeploy or wait for next auto-deployment

---

## Step 6: Custom Domain (Optional)

### 6.1 Add Domain

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Click **"Add Domain"**
3. Enter: `go-drive.in` (or your domain)
4. Click **"Add"**

### 6.2 Configure DNS

Add these DNS records at your domain provider:

**For root domain:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 6.3 SSL Certificate

Vercel automatically provisions SSL certificates. Wait 1-24 hours for DNS propagation.

---

## ✅ Post-Deployment Checklist

- [ ] Run database migration `007_add_upi_fields.sql` in Supabase
- [ ] Test landing page loads
- [ ] Test login flow
- [ ] Test car search
- [ ] Test booking flow
- [ ] Test payment submission
- [ ] Test admin panel (`/admin`)
- [ ] Test host dashboard (`/host`)
- [ ] Verify maps load correctly
- [ ] Check mobile responsiveness

---

## 🔧 Troubleshooting

### Build Fails

1. Check build logs in Vercel Dashboard
2. Verify Node.js version (should be 18+)
3. Check all environment variables are set
4. Ensure `package.json` has all dependencies

### Environment Variables Not Working

1. Verify variables are set for correct environment
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)
4. Ensure no extra spaces in values

### Domain Issues

1. Wait 24-48 hours for DNS propagation
2. Verify DNS records are correct
3. Check domain status in Vercel Dashboard

---

## 📊 Deployment URLs

After deployment:

- **Production**: `https://godrive.vercel.app`
- **Preview**: `https://godrive-git-branch.vercel.app` (for PRs)
- **Admin**: `https://godrive.vercel.app/admin`
- **Host**: `https://godrive.vercel.app/host`

---

## 🎯 Status: Ready for Deployment

Follow the steps above to deploy GoDrive to production.

**Estimated Time**: 10-15 minutes

---

*Vercel deployment guide - December 22, 2024*
