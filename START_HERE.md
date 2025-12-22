# 🚀 START HERE - Deploy GoDrive

> **Ready to deploy? Follow these simple steps!**

---

## ⚡ Quick Deploy (3 Steps)

### 1️⃣ Create GitHub Repository

Go to: **https://github.com/new**
- Name: `godrive`
- **Don't** initialize with README
- Click **"Create repository"**
- **Copy the URL**

### 2️⃣ Push to GitHub

Run this command:
```bash
cd /mnt/projects/projects/godrive
./DEPLOY.sh
```

Paste your GitHub URL when prompted.

### 3️⃣ Deploy to Vercel

1. Go to: **https://vercel.com/new**
2. Import `godrive` repository
3. Add environment variables (see below)
4. Click **"Deploy"**

---

## 🔑 Environment Variables for Vercel

Add these in Vercel Dashboard:

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

---

## ✅ That's It!

Your app will be live at: `https://godrive.vercel.app`

**Auto-deployment is enabled** - every push to `main` will auto-deploy!

---

## 📚 Need More Details?

- `DEPLOY_NOW_INSTRUCTIONS.md` - Detailed step-by-step guide
- `DEPLOYMENT_GUIDE.md` - Complete deployment documentation
- `QUICK_DEPLOY.md` - 5-minute quick reference

---

*Start here - December 22, 2024*
