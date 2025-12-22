#!/bin/bash

# GoDrive - Push to GitHub Script
# Run this after creating your GitHub repository

set -e

echo "🚀 GoDrive - Push to GitHub"
echo "============================"
echo ""

# Check if remote exists
if git remote get-url origin &>/dev/null; then
    echo "✅ Remote 'origin' already exists:"
    git remote -v
    echo ""
    read -p "Push to existing remote? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "⏭️  Skipped. Run 'git push -u origin main' when ready."
        exit 0
    fi
else
    echo "📝 No remote repository configured."
    echo ""
    echo "Please create a GitHub repository first:"
    echo "1. Go to https://github.com/new"
    echo "2. Repository name: godrive"
    echo "3. Don't initialize with README"
    echo "4. Click 'Create repository'"
    echo ""
    read -p "Enter your GitHub repository URL: " REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        echo "❌ No repository URL provided. Exiting."
        exit 1
    fi
    
    git remote add origin "$REPO_URL"
    echo "✅ Remote added: $REPO_URL"
    echo ""
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "🔄 Current branch is '$CURRENT_BRANCH'. Renaming to 'main'..."
    git branch -M main
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
echo ""

git push -u origin main

echo ""
echo "✅ Successfully pushed to GitHub!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your GitHub repository"
echo "3. Add environment variables (see DEPLOYMENT_GUIDE.md)"
echo "4. Deploy!"
echo ""
echo "✨ Your code is now on GitHub!"
