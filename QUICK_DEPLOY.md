# ⚡ Quick Deployment Guide

## 🚀 Deploy in 5 Minutes

### Step 1: Create GitHub Repository (2 min)

1. Go to https://github.com/new
2. Repository name: `godrive`
3. Description: `Self-drive car rental platform for Bangalore`
4. Visibility: Private (or Public)
5. **Don't** initialize with README
6. Click **"Create repository"**
7. Copy the repository URL

### Step 2: Push Code (1 min)

Run the deployment script:

```bash
cd /mnt/projects/projects/godrive
./deploy.sh
```

Or manually:

```bash
git add .
git commit -m "Initial commit - GoDrive MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/godrive.git
git push -u origin main
```

### Step 3: Deploy to Vercel (2 min)

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select `godrive` repository
4. Click **"Import"**
5. Add environment variables (see below)
6. Click **"Deploy"**

### Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
VITE_SUPABASE_URL=https://aqfmwziclbksxjuvwlls.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxZm13emljbGJrc3hqdXZ3bGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4MDA0MTcsImV4cCI6MjA4MTM3NjQxN30.W8tVh3lDGFUgkmYDPsALMGhzSrfibG9ThxWFjg28WDc
VITE_APP_NAME=GoDrive
VITE_APP_ENV=production
VITE_GOOGLE_MAPS_API_KEY=AIzaSyD_Hwye2DnWSygdPXO9AWg36Aws689KCmY
VITE_UPI_ID=meerm.u.s7772@axl
VITE_UPI_NAME=GoDrive
VITE_SUPPORT_PHONE=+919876543210
VITE_SUPPORT_EMAIL=support@godrive.in
```

**Note**: Update `VITE_APP_URL` after first deployment with your Vercel URL.

### Step 4: Auto-Deployment ✅

Vercel automatically:
- ✅ Deploys on every push to `main` branch
- ✅ Creates preview deployments for PRs
- ✅ Provides HTTPS and CDN
- ✅ Handles SSL certificates

---

## 🎯 That's It!

Your app will be live at: `https://godrive.vercel.app`

**Auto-deployment is already configured!** Every push to `main` will trigger a new deployment.

---

*Quick deploy guide - December 22, 2024*
