# 📦 GitHub Repository Setup

## Quick Setup Commands

Run these commands to set up and push to GitHub:

```bash
cd /mnt/projects/projects/godrive

# 1. Initialize git (if not already done)
git init

# 2. Configure git (if not already configured)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 3. Add all files
git add .

# 4. Create initial commit
git commit -m "Initial commit - GoDrive MVP

- Complete car rental platform
- UPI payment integration  
- Admin & Host dashboards
- Premium landing page
- Google Maps with Leaflet fallback
- Production ready"

# 5. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/godrive.git

# 6. Rename branch to main
git branch -M main

# 7. Push to GitHub
git push -u origin main
```

---

## 🔐 GitHub Authentication

If you get authentication errors:

### Option 1: Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use token as password when pushing

### Option 2: SSH Key

1. Generate SSH key: `ssh-keygen -t ed25519 -C "your.email@example.com"`
2. Add to GitHub: Settings → SSH and GPG keys → New SSH key
3. Change remote URL: `git remote set-url origin git@github.com:YOUR_USERNAME/godrive.git`

---

## 📋 Repository Settings

After creating the repository, configure:

1. **Settings → General → Features**
   - ✅ Issues
   - ✅ Projects
   - ✅ Wiki (optional)

2. **Settings → Branches**
   - Add branch protection rule for `main` (optional)

3. **Settings → Secrets and variables → Actions**
   - Add secrets if using GitHub Actions

---

## ✅ Verification

After pushing, verify:

- [ ] All files are in repository
- [ ] README.md is visible
- [ ] .gitignore is working (no node_modules)
- [ ] Branch is named `main`

---

*GitHub setup guide - December 22, 2024*
