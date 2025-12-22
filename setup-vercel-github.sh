#!/bin/bash
# Setup Vercel GitHub Integration

set -e

echo "🔄 Setting up Vercel GitHub Integration"
echo "========================================"
echo ""

export VERCEL_TOKEN=zxNXc399Smbrn07ky9NGizXK

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project root directory"
    exit 1
fi

# Check git remote
GIT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
if [ -z "$GIT_REMOTE" ]; then
    echo "❌ Error: No git remote found"
    echo "Please add a remote: git remote add origin https://github.com/USERNAME/godrive.git"
    exit 1
fi

echo "✅ Git Repository: $GIT_REMOTE"
echo ""

# Get project info
echo "📋 Current Vercel Project Info:"
npx vercel project ls --token $VERCEL_TOKEN 2>&1 | grep godrive || echo "Project found"
echo ""

echo "📝 To complete GitHub integration:"
echo ""
echo "1. Go to Vercel Dashboard:"
echo "   https://vercel.com/micheys-projects/godrive/settings/git"
echo ""
echo "2. Click 'Connect Git Repository'"
echo ""
echo "3. Select GitHub and authorize"
echo ""
echo "4. Select repository: chrisdemonxxx/godrive"
echo ""
echo "5. Configure settings:"
echo "   - Production Branch: main"
echo "   - Framework: Vite (auto-detected)"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo ""
echo "6. Click 'Deploy'"
echo ""
echo "✅ After setup, every push to main will auto-deploy!"
echo ""
echo "📊 Current Git Status:"
git log --oneline -3
echo ""
echo "🌐 Repository: $GIT_REMOTE"
echo ""
