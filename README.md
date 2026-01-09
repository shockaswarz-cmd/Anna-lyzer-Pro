# Bourarro Properties

A premium property management and investment platform specializing in luxury serviced accommodation and guaranteed rent schemes in London.

## Features

- **Property Portfolio**: Dynamic display of luxury properties integrated with Lodgify.
- **Investment Platform**: Detailed information on property investment strategies and guaranteed rent schemes.
- **Service Management**: Comprehensive overview of management services for landlords.
- **Quote System**: Custom quote request flow with email notifications.
- **SEO Optimized**: Built-in sitemap generation and semantic HTML for visibility.

## Tech Stack

- **Frontend**: React, Vite, Framer Motion, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js (Express), Drizzle ORM, PostgreSQL.
- **Integrations**: SendGrid (Email), Lodgify (Property Listings).
- **Styling**: Modern, high-end aesthetic with responsive layouts.

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=your_postgresql_url
   SENDGRID_API_KEY=your_sendgrid_key
   LODGIFY_API_KEY=your_lodgify_key
   PORT=5000
   ```

### Development

Run the development server:

```bash
npm run dev
```

### Build

Create a production build:

```bash
npm run build
```

## License

MIT
