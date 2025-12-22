#!/bin/bash

# GoDrive - Complete Deployment Script
# This script helps deploy GoDrive to GitHub and Vercel

set -e

echo "🚀 GoDrive - Complete Deployment"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check git status
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Git not initialized${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Git repository ready${NC}"
echo ""

# Check if remote exists
if git remote get-url origin &>/dev/null; then
    REMOTE_URL=$(git remote get-url origin)
    echo -e "${GREEN}✅ Remote 'origin' exists:${NC} $REMOTE_URL"
    echo ""
    read -p "Push to existing remote? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}⏭️  Skipped. Run 'git push -u origin main' when ready.${NC}"
        exit 0
    fi
else
    echo -e "${YELLOW}📝 No remote repository configured.${NC}"
    echo ""
    echo "To deploy, you need to:"
    echo "1. Create a GitHub repository at: https://github.com/new"
    echo "   - Name: godrive"
    echo "   - Don't initialize with README"
    echo "   - Click 'Create repository'"
    echo ""
    read -p "Enter your GitHub repository URL (or press Enter to skip): " REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        echo -e "${YELLOW}⏭️  Skipping GitHub push. Create repository and run this script again.${NC}"
        echo ""
        echo "Or manually run:"
        echo "  git remote add origin https://github.com/YOUR_USERNAME/godrive.git"
        echo "  git push -u origin main"
        exit 0
    fi
    
    git remote add origin "$REPO_URL"
    echo -e "${GREEN}✅ Remote added: $REO_URL${NC}"
    echo ""
fi

# Ensure we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${YELLOW}🔄 Renaming branch to 'main'...${NC}"
    git branch -M main
fi

# Push to GitHub
echo -e "${GREEN}🚀 Pushing to GitHub...${NC}"
echo ""

if git push -u origin main; then
    echo ""
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    echo ""
    echo "📋 Next Steps for Vercel Deployment:"
    echo ""
    echo "1. Go to: https://vercel.com/new"
    echo "2. Click 'Import Git Repository'"
    echo "3. Select your 'godrive' repository"
    echo "4. Click 'Import'"
    echo "5. Add environment variables (see DEPLOYMENT_GUIDE.md)"
    echo "6. Click 'Deploy'"
    echo ""
    echo "Environment variables to add:"
    echo "  VITE_SUPABASE_URL=https://aqfmwziclbksxjuvwlls.supabase.co"
    echo "  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    echo "  VITE_GOOGLE_MAPS_API_KEY=AIzaSyD_Hwye2DnWSygdPXO9AWg36Aws689KCmY"
    echo "  VITE_UPI_ID=meerm.u.s7772@axl"
    echo "  (See DEPLOYMENT_GUIDE.md for full list)"
    echo ""
    echo -e "${GREEN}✨ Your code is now on GitHub!${NC}"
else
    echo ""
    echo -e "${RED}❌ Push failed. Check your credentials and try again.${NC}"
    echo ""
    echo "If you have 2FA enabled, use a Personal Access Token:"
    echo "  https://github.com/settings/tokens"
    exit 1
fi
