# ⚡ Deploy GoDrive Now - Quick Commands

## 🚀 Ready to Deploy!

Your code is committed and ready. Follow these steps:

---

## Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `godrive`
3. **Don't** initialize with README
4. Click **"Create repository"**
5. **Copy the repository URL**

---

## Step 2: Push to GitHub

Run these commands (replace `YOUR_USERNAME`):

```bash
cd /mnt/projects/projects/godrive

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/godrive.git

# Push to GitHub
git push -u origin main
```

**If authentication fails:**
- Use Personal Access Token as password
- Generate at: https://github.com/settings/tokens

---

## Step 3: Deploy to Vercel

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select `godrive`
4. Click **"Import"**
5. Add environment variables (see below)
6. Click **"Deploy"**

---

## Environment Variables for Vercel

Copy-paste these in Vercel:

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

**After first deployment**, add:
```
VITE_APP_URL=https://your-app.vercel.app
```

---

## ✅ Auto-Deployment

Once connected, Vercel automatically:
- Deploys on every push to `main`
- Creates previews for PRs
- Handles SSL and CDN

**That's it! Your app will be live in ~3 minutes.**

---

*Quick deploy - December 22, 2024*
