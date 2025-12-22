#!/bin/bash

# GoDrive - Deployment Script
# This script helps you deploy GoDrive to GitHub and Vercel

set -e

echo "🚀 GoDrive Deployment Script"
echo "=============================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Check git config
if [ -z "$(git config user.name)" ]; then
    echo "⚠️  Git user.name not set. Please configure:"
    echo "   git config user.name 'Your Name'"
    exit 1
fi

if [ -z "$(git config user.email)" ]; then
    echo "⚠️  Git user.email not set. Please configure:"
    echo "   git config user.email 'your.email@example.com'"
    exit 1
fi

# Check if remote exists
if ! git remote get-url origin &>/dev/null; then
    echo "📝 Please add your GitHub repository as remote:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/godrive.git"
    echo ""
    read -p "Enter your GitHub repository URL: " REPO_URL
    if [ -n "$REPO_URL" ]; then
        git remote add origin "$REPO_URL"
        echo "✅ Remote added: $REPO_URL"
    else
        echo "❌ No repository URL provided. Exiting."
        exit 1
    fi
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit. Repository is up to date."
else
    # Commit changes
    echo "💾 Creating commit..."
    git commit -m "Deploy GoDrive MVP - Premium UI & Advanced Dashboards

- Complete car rental platform
- UPI payment integration
- Admin & Host dashboards with analytics
- Premium landing page with animations
- Google Maps with Leaflet fallback
- Production ready for deployment"
    
    echo "✅ Commit created"
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")

if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    echo "🔄 Renaming branch to main..."
    git branch -M main
    CURRENT_BRANCH="main"
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
echo ""
read -p "Push to GitHub? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push -u origin "$CURRENT_BRANCH"
    echo ""
    echo "✅ Code pushed to GitHub!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to https://vercel.com"
    echo "2. Import your GitHub repository"
    echo "3. Add environment variables (see DEPLOYMENT_GUIDE.md)"
    echo "4. Deploy!"
else
    echo "⏭️  Skipping push. Run 'git push -u origin main' when ready."
fi

echo ""
echo "✨ Deployment script complete!"
