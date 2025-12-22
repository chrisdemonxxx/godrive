# 🚗 GoDrive - Self-Drive Car Rentals in Bangalore

> **Peer-to-peer car rental marketplace** | Built with React, TypeScript, Supabase, and Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/godrive)

---

## ✨ Features

- 🚗 **Car Listings** - Hosts can list their cars with photos, pricing, and availability
- 🔍 **Smart Search** - Find cars by location, dates, and preferences
- 💳 **UPI Payments** - Seamless payment integration with automatic fallback
- 📱 **Mobile-First** - Responsive design optimized for mobile devices
- 🗺️ **Maps Integration** - Google Maps with OpenStreetMap fallback
- 👥 **User Dashboards** - Separate dashboards for guests, hosts, and admins
- ⭐ **Reviews & Ratings** - Trust system with reviews and ratings
- 🔐 **Secure Auth** - Phone OTP authentication via Supabase

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account
- Google Maps API key (optional)

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/godrive.git
cd godrive

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your environment variables
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...
# VITE_GOOGLE_MAPS_API_KEY=... (optional)

# Run development server
npm run dev
```

Visit `http://localhost:5173`

---

## 📦 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Maps**: Google Maps API + Leaflet (fallback)
- **Payments**: UPI integration
- **Charts**: Recharts
- **UI Components**: Radix UI
- **Deployment**: Vercel

---

## 🗂️ Project Structure

```
godrive/
├── src/
│   ├── modules/          # Feature modules
│   │   ├── auth/         # Authentication
│   │   ├── cars/         # Car listings
│   │   ├── bookings/     # Booking management
│   │   ├── payments/     # Payment flow
│   │   ├── admin/        # Admin dashboard
│   │   └── host/          # Host dashboard
│   ├── shared/           # Shared components & utilities
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # API clients & integrations
│   │   ├── schemas/      # Zod validation schemas
│   │   └── types/        # TypeScript types
│   └── pages/            # Page components
├── supabase/
│   └── migrations/       # Database migrations
└── public/               # Static assets
```

---

## 🔧 Environment Variables

Create `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key (optional)
VITE_UPI_ID=your_upi_id
VITE_APP_URL=http://localhost:5173
```

See `.env.example` for all variables.

---

## 📊 Database Setup

1. Create a Supabase project
2. Run migrations in order:
   ```bash
   # In Supabase SQL Editor, run:
   - 001_extensions_enums.sql
   - 002_core_tables.sql
   - 003_bookings_payments.sql
   - 004_reviews_messages.sql
   - 005_indexes_functions.sql
   - 006_triggers_rls.sql
   - 007_add_upi_fields.sql
   ```

---

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🙏 Acknowledgments

- Built for Bangalore, India
- Inspired by Zoomcar, Turo, and Airbnb
- Powered by Supabase and Vercel

---

**Made with ❤️ in Bangalore**
