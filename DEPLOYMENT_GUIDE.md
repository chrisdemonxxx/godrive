# 🚀 GoDrive - GitHub & Vercel Deployment Guide

> **Date**: December 22, 2024  
> **Status**: Ready for Deployment

---

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier works)
- Git installed locally
- Node.js 18+ installed

---

## Step 1: Create GitHub Repository

### Option A: Via GitHub Web Interface

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Repository details:
   - **Name**: `godrive`
   - **Description**: `Self-drive car rental platform for Bangalore - Peer-to-peer marketplace`
   - **Visibility**: Private (or Public)
   - **Initialize**: ❌ Don't initialize with README, .gitignore, or license
4. Click **"Create repository"**
5. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/godrive.git`)

### Option B: Via GitHub CLI (if installed)

```bash
gh repo create godrive --private --description "Self-drive car rental platform for Bangalore"
```

---

## Step 2: Push Code to GitHub

Run these commands in your terminal:

```bash
# Navigate to project directory
cd /mnt/projects/projects/godrive

# Check git status
git status

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - GoDrive MVP with premium UI

- Complete car rental platform
- UPI payment integration
- Admin & Host dashboards
- Premium landing page
- Google Maps with Leaflet fallback
- Production ready"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/godrive.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note**: You'll be prompted for GitHub credentials. Use a Personal Access Token if 2FA is enabled.

---

## Step 3: Deploy to Vercel

### 3.1 Connect Repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository:
   - Select **"Import Git Repository"**
   - Find and select `godrive` repository
   - Click **"Import"**

### 3.2 Configure Project

Vercel will auto-detect Vite. Configure:

- **Framework Preset**: Vite ✅ (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` ✅ (auto-detected)
- **Output Directory**: `dist` ✅ (auto-detected)
- **Install Command**: `npm install` ✅ (auto-detected)

### 3.3 Add Environment Variables

Click **"Environment Variables"** and add:

```
VITE_SUPABASE_URL=https://aqfmwziclbksxjuvwlls.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZm13emljbGJrc3hqdXZ3bGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MDA0MTcsImV4cCI6MjA4MTM3NjQxN30.W8tVh3lDGFUgkmYDPsALMGhzSrfibG9ThxWFjg28WDc
VITE_APP_URL=https://godrive.vercel.app
VITE_APP_NAME=GoDrive
VITE_APP_ENV=production
VITE_GOOGLE_MAPS_API_KEY=AIzaSyD_Hwye2DnWSygdPXO9AWg36Aws689KCmY
VITE_UPI_ID=meerm.u.s7772@axl
VITE_UPI_NAME=GoDrive
VITE_SUPPORT_PHONE=+919876543210
VITE_SUPPORT_EMAIL=support@godrive.in
```

**Important**: 
- Add these for **Production**, **Preview**, and **Development** environments
- Update `VITE_APP_URL` after first deployment with actual Vercel URL

### 3.4 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Vercel will provide a deployment URL (e.g., `godrive.vercel.app`)

---

## Step 4: Auto-Deployment Setup

### 4.1 Automatic Deployments

Vercel automatically sets up:
- ✅ **Production**: Deploys on push to `main` branch
- ✅ **Preview**: Deploys on pull requests
- ✅ **Development**: Deploys on push to other branches

### 4.2 Verify Auto-Deployment

1. Make a small change to any file
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test auto-deployment"
   git push origin main
   ```
3. Go to Vercel Dashboard → Your Project
4. You should see a new deployment starting automatically

---

## Step 5: Custom Domain (Optional)

### 5.1 Add Domain

1. In Vercel Dashboard → Project → Settings → Domains
2. Click **"Add Domain"**
3. Enter: `go-drive.in` (or your domain)
4. Follow DNS configuration instructions

### 5.2 DNS Configuration

Add these DNS records to your domain provider:

**Option A: CNAME (Recommended)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

**Option B: A Record**
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

### 5.3 SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt. Wait 1-24 hours for DNS propagation.

---

## Step 6: Post-Deployment Checklist

### 6.1 Database Migration

Run in Supabase SQL Editor:

```sql
-- File: supabase/migrations/007_add_upi_fields.sql
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS upi_transaction_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS payment_submitted_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_bookings_upi_txn ON bookings(upi_transaction_id) WHERE upi_transaction_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_payment_submitted ON bookings(payment_submitted_at) WHERE payment_submitted_at IS NOT NULL;
```

### 6.2 Update Environment Variables

After first deployment, update `VITE_APP_URL` in Vercel:
- Go to Settings → Environment Variables
- Update `VITE_APP_URL` to your actual Vercel URL or custom domain

### 6.3 Test Deployment

- [ ] Landing page loads
- [ ] Login flow works
- [ ] Car search works
- [ ] Booking flow works
- [ ] Payment submission works
- [ ] Admin panel accessible
- [ ] Maps load correctly

---

## Step 7: GitHub Actions (Optional)

Create `.github/workflows/ci.yml` for CI/CD:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run typecheck
      run: npm run typecheck
    
    - name: Run lint
      run: npm run lint
    
    - name: Build
      run: npm run build
```

---

## 🔧 Troubleshooting

### Build Fails

1. Check build logs in Vercel Dashboard
2. Verify all environment variables are set
3. Check Node.js version (should be 18+)
4. Ensure all dependencies are in `package.json`

### Environment Variables Not Working

1. Verify variables are set for correct environment (Production/Preview)
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

### Domain Not Working

1. Wait 24-48 hours for DNS propagation
2. Verify DNS records are correct
3. Check domain in Vercel Dashboard → Domains

---

## 📊 Deployment URLs

After deployment, you'll have:

- **Production**: `https://godrive.vercel.app` (or custom domain)
- **Preview**: `https://godrive-git-branch.vercel.app` (for PRs)
- **Admin**: `https://godrive.vercel.app/admin`
- **Host**: `https://godrive.vercel.app/host`

---

## ✅ Status: Ready for Deployment

All code is ready. Follow the steps above to deploy to production.

**Estimated Time**: 15-20 minutes

---

*Deployment guide created: December 22, 2024*
