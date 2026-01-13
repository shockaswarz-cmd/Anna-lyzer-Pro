# Anna Lyzer Pro

**Anna Lyzer Pro** is an advanced AI-powered deal sourcing and analysis platform for UK property investors. It aggregates data from major portals, performs real-time financial modeling (BTL, BRRR, HMO, R2R), and assesses risks using Article 4 and flood data.

## Features

- **Multi-Strategy Engine**: Analyze deals for Buy-to-Let, BRRR, HMO, Serviced Accommodation, and Rent-to-Rent.
- **Smart Scraper**: Robust ingestion from Rightmove, Zoopla, and OnTheMarket with Firecrawl integration + resilient legacy fallback.
- **Risk Intelligence**: Automated detection of Article 4 areas, flood zones, and EPC ratings.
- **Investor Pack Generator**: One-click PDF generation for deal packaging.
- **Comparative Analysis**: Live comparable data for sales and rental estimations.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Backend/Auth**: Firebase (Auth + Firestore)
- **Scraping**: Firecrawl SDK + Axios/Cheerio Fallback
- **Testing**: Vitest + Playwright

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/shockaswarz-cmd/Anna-lyzer-Pro.git
cd Anna-lyzer-Pro
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Environment Variables**

Create a `.env.local` file in the root directory:

```env
# Firecrawl Scraper
FIRECRAWL_API_KEY=your_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...

# (Optional) Google Maps / Other APIs
NEXT_PUBLIC_GOOGLE_MAPS_KEY=...
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Testing

- **Unit Tests**: `npm run test`
- **E2E Tests**: `npm run test:e2e`

## Deployment

This project is optimized for deployment on **Vercel**.

1. Link your project:
   ```bash
   npx vercel link
   ```
2. Push to main to trigger a production build (if connected to GitHub).
