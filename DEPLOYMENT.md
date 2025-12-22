# GoDrive Deployment Guide

## Prerequisites

- Node.js 18+
- npm or pnpm
- GitHub account
- Vercel account (free)
- Supabase project (already set up)

## Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - GoDrive MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/godrive.git
git push -u origin main
```

## Step 2: Deploy Database Migration

1. Go to Supabase Dashboard → SQL Editor
2. Run the migration file: `supabase/migrations/007_add_upi_fields.sql`
3. Verify the columns were added:
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'bookings' 
   AND column_name IN ('upi_transaction_id', 'payment_submitted_at');
   ```

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL` = `https://aqfmwziclbksxjuvwlls.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = (your anon key)
   - `VITE_APP_URL` = `https://your-app.vercel.app`
   - `VITE_APP_NAME` = `GoDrive`
   - `VITE_APP_ENV` = `production`
   - `VITE_UPI_ID` = `meerm.u.s7772@axl`
   - `VITE_UPI_NAME` = `GoDrive`
   - `VITE_SUPPORT_PHONE` = `+919876543210`
   - `VITE_SUPPORT_EMAIL` = `support@godrive.in`
6. Click "Deploy"

## Step 4: Configure Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., `godrive.in`)
3. Follow DNS configuration instructions
4. SSL will be automatically configured

## Step 5: Verify Deployment

1. Visit your deployed URL
2. Test the following:
   - [ ] Landing page loads
   - [ ] Login flow works
   - [ ] Car search works
   - [ ] Booking flow works
   - [ ] Payment submission works
   - [ ] Admin panel accessible

## Step 6: Set Up Monitoring (Optional)

1. Add Sentry for error tracking (future)
2. Set up Vercel Analytics
3. Configure uptime monitoring

## Troubleshooting

### Build Fails
- Check environment variables are set
- Verify all dependencies are in package.json
- Check build logs in Vercel dashboard

### Database Connection Issues
- Verify Supabase URL and keys
- Check RLS policies
- Test connection in Supabase dashboard

### Payment Not Working
- Verify UPI ID is correct
- Check admin panel for pending payments
- Verify database migration ran successfully

---

**Deployment Status**: Ready for production deployment
