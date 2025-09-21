# Bourarro Properties - Real Estate Investment Platform

## Overview

This is a modern real estate property management and investment platform inspired by Bourarro.com. The application provides guaranteed rent services for landlords, offering professional property management with features like 0% commission, 3-5 year flexible leases, and comprehensive property care. Built as a full-stack web application with a focus on trust-building, professional aesthetics, and user-friendly property investment solutions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type-safe component development
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system following Bourarro-inspired guidelines
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Theme System**: Custom light/dark mode implementation with CSS variables

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful endpoints with standardized error handling and logging middleware
- **Validation**: Zod schemas for runtime type checking and data validation
- **Storage**: In-memory storage implementation with interface for future database integration

### Data Storage Solutions
- **Current**: In-memory storage with Maps for development and prototyping
- **Database Ready**: Drizzle ORM configured for PostgreSQL with Neon serverless database
- **Schema**: Defined database tables for users and quote requests with proper typing
- **Migrations**: Drizzle-kit setup for database schema management

### Component Design System
- **Design Language**: Clean, professional aesthetic with deep navy and trust blue color palette
- **Typography**: Inter font family for modern, readable text hierarchy
- **Layout**: Responsive grid system with generous whitespace and consistent spacing primitives
- **Interactive Elements**: Hover states, elevation effects, and smooth transitions for enhanced UX
- **Accessibility**: Radix UI primitives ensure WCAG compliance and keyboard navigation

### Development Workflow
- **Build System**: Vite for fast development server and optimized production builds
- **Development Tools**: Hot module replacement, error overlays, and Replit integration
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Asset Management**: Structured asset organization with path aliases for clean imports

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL serverless database for production data storage
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Session Management**: Connect-pg-simple for PostgreSQL-backed session storage

### UI and Design
- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Icons**: Lucide React for consistent iconography
- **Carousel**: Embla Carousel for testimonials and image galleries
- **Styling**: Tailwind CSS with PostCSS for utility-first styling approach

### Development and Build Tools
- **Bundler**: Vite with React plugin for fast development and optimized builds
- **Build Target**: ESBuild for server-side code compilation
- **Development Environment**: Replit-specific plugins for cloud development integration

### Form and Validation
- **Form Library**: React Hook Form for performant form state management
- **Validation**: Zod for runtime schema validation and TypeScript integration
- **Resolvers**: Hookform resolvers for seamless Zod integration

### Property Data Integration
- **Market Data**: Placeholder implementation for UK property market data (postcodes, pricing, rental yields)
- **Calculation Engine**: Property valuation and guaranteed rent calculation algorithms
- **Geographic Data**: UK postcode validation and extraction utilities