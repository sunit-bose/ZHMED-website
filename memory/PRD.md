# ZH Medsolutions — Product Requirements (PRD)

## Original Problem Statement
> My company is named as ZH Medsolutions providing support end to end billing solutions to US healthcare providers and hospital; Services which are provided are ERA Enrollment, Credential, Coding, Charge Entry, Payment posting, EDI rejection, AR followup, Denial followup, Correspondence and documentation, patient statement, appeal submissions and Credit Balance.
> Have load images of the my company logo and motto.

Motto: **"You Care For Your Patients, We Care For You."**

## User Choices (explicit)
- Marketing website + services showcase + **smart in-house consultation booking** (no Google Calendar OAuth).
- Business hours: **Mon–Sun, 9 AM – 6 PM EST** (30-min slots).
- Palette aligned with the logo (deep teal-navy `#2E5A6E` + soft sky-blue `#A8C5D6` + white).
- **Resources / Blog** section included (SEO for healthcare billing insights).

## Architecture
- **Backend** — FastAPI (`/app/backend/server.py`), MongoDB (`bookings`, `contacts`).
- **Frontend** — React + React Router + Tailwind + Shadcn UI + lucide-react + sonner.
- **Auth** — Single admin token via `X-Admin-Token` header (env var `ADMIN_TOKEN`).

## Personas
- **Healthcare provider / practice admin** — Browses services, books a free consultation, downloads insights.
- **Hospital RCM lead** — Reads case-study-like resources, contacts via form.
- **ZH Medsolutions internal admin** — Logs into `/admin` to view & manage bookings + inquiries.

## Implemented (Dec 2025)
- Landing page: Hero with brand motto & RCM snapshot widget, 12-service grid (clickable to booking with pre-selected service), 4-step process timeline, About + stats, Blog preview, Contact form, Footer.
- Multi-step Booking flow: Service → Date (shadcn Calendar, past dates disabled) → Time slots (live availability from API) → Details → Success confirmation.
- Resources index + dynamic detail page (4 seeded long-form posts).
- Admin dashboard at `/admin` (token sign-in, bookings table with status updates, contacts table, stats cards).
- Backend APIs: `/api/services`, `/api/blog[/{slug}]`, `/api/bookings/availability`, `/api/bookings` (POST/GET/PATCH), `/api/contact` (POST/GET), `/api/admin/verify`.
- Slot collision detection (HTTP 409 on duplicate booking).
- Brand: logo & motto from user-provided assets used in navbar + footer.
- Fonts: Manrope (display) + IBM Plex Sans (body) + Spectral (editorial accents).
- Fixed: webpack-dev-server v5 / react-scripts 5 incompatibility (migrated `onAfterSetupMiddleware` and `https` options in `craco.config.js`).

## P0 Backlog (next)
- Email notifications on booking creation (admin + customer) — Resend / SendGrid.
- Replace placeholder contact email/phone/address with real ones (currently `contact@zhmedsolutions.org`, `+1 (555) 010-0420`, Wilmington DE).

## P1 Backlog
- Live blog (Markdown / CMS) instead of seeded data.
- Case studies section with measurable outcomes.
- Specialty-specific landing pages (Cardiology, OB-GYN, etc.) for SEO.
- Live chat widget for sales inquiries.
- Sitemap.xml + robots.txt + OpenGraph metadata per page.

## P2 / Future
- Real Google Calendar two-way sync.
- Client portal for existing clients to view weekly RCM dashboards.
- Stripe / invoicing for monthly billing of services.
- Multi-language (EN / ES).
