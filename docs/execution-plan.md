# GoDrive Execution Plan: Parallel Tracks While Legal Pending

> **Status**: Legal consultation in progress
> **Approach**: Advance all non-blocked activities to hit the ground running post-registration
> **Timeline**: Weeks 1-4 (Pre-Legal) + Weeks 5-8 (Post-Legal Launch)

---

## TRACK 1: TECHNICAL DEVELOPMENT (No Legal Blockers)

### Week 1 - Core Infrastructure
**Day 1-2: Project Setup**
- [ ] Create Supabase project (free tier - no company needed)
  - Go to: https://supabase.com/dashboard
  - Create project: "godrive-dev"
  - Region: Mumbai (ap-south-1)
  - Save credentials securely
- [ ] Run database migrations (schema from docs/database-schema.sql)
- [ ] Configure Supabase Auth for Phone OTP
- [ ] Set up Supabase Storage buckets (car-images, documents)

**Day 3-4: Authentication**
- [ ] Build phone OTP login screen
- [ ] Build OTP verification screen
- [ ] Create auth context/provider
- [ ] Test complete auth flow

**Day 5-7: Landing Page**
- [ ] Hero section with value proposition
- [ ] "How it Works" section (3 steps)
- [ ] Host benefits section
- [ ] Guest benefits section
- [ ] "Coming Soon" email capture form
- [ ] Mobile responsive design

### Week 2 - Car Listing System
- [ ] Multi-step car listing form
- [ ] Image upload with compression
- [ ] Location picker (Google Maps)
- [ ] Pricing configuration
- [ ] Features selection
- [ ] Preview and submit flow
- [ ] Host dashboard (my cars view)

### Week 3 - Search & Discovery
- [ ] Search page with filters
- [ ] Location-based search (PostGIS)
- [ ] Date range availability check
- [ ] Car detail page
- [ ] Map view of listings
- [ ] Save to favorites

### Week 4 - Booking Foundation
- [ ] Booking request flow (without payment)
- [ ] Host accept/decline interface
- [ ] Booking status management
- [ ] Email notifications (Resend - free tier)
- [ ] Basic dashboards for host & guest

**⏸️ Payment Integration** - Hold until legal entity confirmed, then:
- [ ] Razorpay account setup (needs company PAN/GST)
- [ ] Payment flow implementation
- [ ] Security deposit handling
- [ ] Host payout system

---

## TRACK 2: MARKETING & CONTENT (Start Immediately)

### Week 1 - Brand Foundation

**Social Media Setup (Personal accounts OK for now)**
- [ ] Instagram: @godlovement (or similar available handle)
- [ ] Twitter/X: @GodriveIn
- [ ] LinkedIn Company Page (can create without registration)
- [ ] YouTube channel (for future content)

**Brand Assets to Create**
- [ ] Logo variations (you have the main logo)
- [ ] Brand color palette document
- [ ] Social media templates (Canva)
- [ ] Email signature
- [ ] WhatsApp Business profile

### Week 2 - Content Creation Sprint

**Blog Posts to Write (SEO Foundation)**
1. "Complete Guide to Self-Drive Car Rental in Bangalore" (pillar content)
2. "Bangalore to Coorg Road Trip: Ultimate Driving Guide 2025"
3. "Weekend Getaways from Bangalore Under 300km"
4. "Self-Drive vs Chauffeur: Which is Right for Your Trip?"
5. "How Much Can You Earn Renting Your Car in Bangalore?"

**Social Content Calendar (First 30 Days)**
- Day 1: Brand announcement teaser
- Day 3: "Coming soon to Bangalore" 
- Day 5: Road trip destination feature (Coorg)
- Day 7: Host earning potential infographic
- Day 10: User problem we're solving
- Day 14: Behind the scenes (building GoDrive)
- Day 21: Destination feature (Mysore)
- Day 28: Countdown to launch

### Week 3 - Lead Generation Setup

**Host Prospect List Building**
Target areas in Bangalore:
1. HSR Layout
2. Koramangala
3. Indiranagar
4. Whitefield
5. Electronic City

**Methods (all legal before company registration):**
- [ ] Personal network outreach
- [ ] LinkedIn connections in Bangalore tech
- [ ] Apartment complex WhatsApp groups
- [ ] Car enthusiast communities
- [ ] OLX/Facebook Marketplace car sellers (potential hosts)

**Lead Capture**
- [ ] Google Form for host interest
- [ ] Google Form for guest waitlist
- [ ] Notion database for tracking
- [ ] WhatsApp broadcast list setup

### Week 4 - Pre-Launch Buzz

**Micro-Influencer Outreach**
Identify 10-15 Bangalore-based:
- Travel bloggers (5-50k followers)
- Car reviewers
- Lifestyle influencers
- Tech reviewers who do weekend vlogs

**Template Outreach Message:**
```
Hi [Name],

Love your content on [specific video/post]! 

I'm launching GoDrive - a new self-drive car rental platform 
in Bangalore that's focused on actually having great customer 
support (unlike the current options 😅).

Would love to offer you a free rental for a weekend trip in 
exchange for honest feedback/content. No pressure for positive 
review - just want real opinions.

Interested?
```

**PR Preparation**
- [ ] Draft press release
- [ ] Compile media list (YourStory, Inc42, ET, TOI Bangalore)
- [ ] Founder story narrative
- [ ] Key stats/differentiators document

---

## TRACK 3: HOST ACQUISITION (Soft Start)

### Approach: "Interest List" Not Commitments

Since we can't sign formal agreements yet, build warm pipeline:

**Week 1-2: Personal Network**
- [ ] List everyone you know in Bangalore with cars
- [ ] List everyone your ground team knows
- [ ] Personal outreach explaining concept
- [ ] Goal: 20 "interested" hosts

**Week 3-4: Extended Network**
- [ ] LinkedIn posts about what you're building
- [ ] WhatsApp status updates
- [ ] Ask interested hosts for referrals
- [ ] Goal: 50 "interested" hosts

**Host Interest Form Fields:**
1. Name
2. Phone/WhatsApp
3. Car make/model/year
4. Area in Bangalore
5. How many days/month car sits idle?
6. Expected monthly earning goal
7. Any concerns about renting?
8. How did you hear about us?

**Follow-up Sequence:**
- Day 0: Thank you + "we'll contact when launching"
- Day 7: Share a blog post about earning potential
- Day 14: Ask if they have questions
- Day 21: Share progress update
- Pre-launch: "Ready to list? Here's what you need"

---

## TRACK 4: GROUND TEAM ACTIVATION (Bangalore)

### Immediate Tasks for On-Ground Team

**Week 1: Reconnaissance**
- [ ] Visit 5-10 Zoomcar pickup locations
- [ ] Note: Car conditions, wait times, user complaints
- [ ] Take photos (for competitive intelligence)
- [ ] Talk to users about their experience
- [ ] Document findings

**Week 2: Area Mapping**
- [ ] Identify high-density car parking areas
- [ ] Note apartment complexes with good car populations
- [ ] Identify co-working spaces (potential partnerships)
- [ ] Map IT parks and tech corridors
- [ ] Find popular weekend trip starting points

**Week 3-4: Relationship Building**
- [ ] Connect with 2-3 apartment complex RWAs
- [ ] Meet car washing/detailing service owners
- [ ] Connect with local mechanics (referral potential)
- [ ] Identify potential brand ambassadors

**Materials Needed for Ground Team:**
1. GoDrive pitch deck (digital)
2. Host benefits one-pager
3. FAQ document
4. Business cards (can print with "Coming Soon")
5. QR code to interest form

---

## TRACK 5: COMPETITIVE INTELLIGENCE

### Ongoing Research Tasks

**Zoomcar Deep Dive**
- [ ] Create accounts on Zoomcar, Revv, MyChoize
- [ ] Book at least 1 rental from each
- [ ] Document entire experience
- [ ] Screenshot all touchpoints
- [ ] Note pain points firsthand

**Review Mining**
- [ ] Export Zoomcar reviews from Play Store
- [ ] Categorize complaints by type
- [ ] Identify most common issues
- [ ] Use insights for messaging

**Pricing Analysis**
- [ ] Track pricing for 10 car types across platforms
- [ ] Note surge pricing patterns
- [ ] Document security deposit amounts
- [ ] Create competitive pricing matrix

---

## LEGAL PREPARATION (While Waiting)

### Documents to Prepare for Lawyer Review

**Once Entity Decided, Need:**
1. Terms of Service (platform)
2. Privacy Policy
3. Host Agreement Template
4. Guest Agreement Template
5. Cancellation & Refund Policy
6. Damage Claim Process Document
7. Insurance Disclosure

**Questions for Lawyer:**
1. Best entity structure (Pvt Ltd vs LLP?)
2. Rent-a-Cab license requirements in Karnataka
3. Insurance requirements for P2P model
4. GST registration threshold
5. TDS obligations on host payouts
6. Data protection compliance (upcoming India law)
7. Liability limitations we can include

**I can draft all policy documents for lawyer review - let me know when ready**

---

## BUDGET: PRE-LAUNCH PHASE

### Month 1 Estimated Spend

| Item | Cost | Notes |
|------|------|-------|
| Supabase | ₹0 | Free tier sufficient |
| Domain (temp) | ₹500 | Can use .com initially |
| Canva Pro | ₹500 | Design assets |
| Google Workspace | ₹0 | Use personal initially |
| Content freelancer | ₹5,000-10,000 | Optional, can do ourselves |
| Printed materials | ₹2,000 | Business cards, flyers |
| Misc tools | ₹1,000 | Various subscriptions |
| **Total** | **₹9,000-14,000** | |

### Ground Team Costs (If Applicable)

| Item | Cost | Notes |
|------|------|-------|
| Travel/transport | ₹3,000-5,000/month | Area visits |
| Meeting expenses | ₹2,000/month | Coffee meetings |
| Communication | ₹500/month | Calls, data |
| **Total** | **₹5,500-7,500/month** | |

---

## SUCCESS METRICS: PRE-LAUNCH

### By End of Week 4, Target:

| Metric | Target |
|--------|--------|
| Interested hosts | 50+ |
| Waitlist signups (guests) | 200+ |
| Instagram followers | 500+ |
| Blog posts published | 5+ |
| Influencers contacted | 15+ |
| Technical MVP | 80% complete |
| Ground team area coverage | 5 neighborhoods |

---

## IMMEDIATE NEXT ACTIONS (Today/Tomorrow)

### Billy's Actions:
1. ☐ Schedule lawyer call (aim for this week)
2. ☐ Create Supabase account
3. ☐ Decide on temporary domain
4. ☐ Share ground team contact for coordination

### Claude's Actions (I'll prepare):
1. ☐ Create all social media content templates
2. ☐ Write first 2 blog posts
3. ☐ Build landing page code
4. ☐ Create host pitch deck
5. ☐ Design host interest form
6. ☐ Draft policy documents for lawyer review

### Ground Team Actions:
1. ☐ Start personal network host outreach
2. ☐ Visit 3 Zoomcar pickup locations this week
3. ☐ Create list of 20 potential host contacts
4. ☐ Join 5 apartment WhatsApp groups in target areas

---

## TIMELINE VISUALIZATION

```
WEEK 1          WEEK 2          WEEK 3          WEEK 4          WEEK 5+
|               |               |               |               |
├─ Auth ────────┤               |               |               |
├─ Landing ─────┤               |               |               |
|               ├─ Car Listing ─┤               |               |
|               |               ├─ Search ──────┤               |
|               |               |               ├─ Booking ─────┤
|               |               |               |               |
├─ Social Setup─┼─ Content ─────┼─ Lead Gen ────┼─ Pre-Launch ──┤
|               |               |               |               |
├─ Host Prospect List Building ─────────────────┼─ Formal ──────┤
|               |               |               |   Onboarding  |
|               |               |               |               |
└─ LEGAL CONSULTATION ──────────────────────────┴─ REGISTERED ──┘
```

---

*This plan allows maximum progress while legal is pending. Update daily in standup.*
