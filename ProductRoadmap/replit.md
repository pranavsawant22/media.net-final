# Overview

AdEasy is a self-serve campaign creation tool designed specifically for SMB (Small and Medium Business) advertisers. The application simplifies the complex process of creating ad campaigns by providing a guided 5-step wizard interface that can be completed in under 5 minutes. The tool focuses on ease of use, speed, and AI assistance to help small business owners with limited budgets (₹500-₹50,000) and no dedicated marketing teams create effective advertising campaigns.

The application is built as a full-stack web prototype with a React frontend and Express.js backend, featuring a complete campaign creation workflow from initial setup through launch and management via a dashboard interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React 18 with TypeScript, utilizing Vite as the build tool for fast development and optimized production builds. The application follows a component-based architecture with:

- **Routing**: Wouter for lightweight client-side routing between the campaign creator and dashboard pages
- **State Management**: React hooks for local state management with React Query for server state management and caching
- **UI Components**: Shadcn/ui component library built on Radix UI primitives, providing accessible and customizable components
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming support
- **Form Handling**: React Hook Form with Zod for validation

## Backend Architecture
The backend uses Express.js with TypeScript in ESM module format, providing:

- **API Structure**: RESTful endpoints for campaign CRUD operations
- **Storage Layer**: Abstracted storage interface with in-memory implementation for demo purposes, designed to be easily swapped with database implementations
- **Development Setup**: Vite middleware integration for seamless full-stack development experience

## Data Storage Solutions
The application uses a flexible storage abstraction pattern:

- **Storage Interface**: `IStorage` interface defining methods for user and campaign operations
- **In-Memory Storage**: `MemStorage` class implementing the interface with Map-based storage for demo purposes
- **Database Ready**: Drizzle ORM configured with PostgreSQL schema definitions, ready for production database integration
- **Schema Definition**: Shared TypeScript types and Zod schemas between frontend and backend

## Authentication and Authorization
Currently implements a basic structure with user schema definitions but no active authentication flow, designed for easy extension with session-based or token-based authentication.

## Campaign Creation Workflow
The application implements a multi-step wizard pattern:

1. **Welcome Screen**: Introduction and onboarding
2. **Objective Selection**: Choose between Brand Awareness, Website Traffic, or Sales & Conversions
3. **Budget Configuration**: Slider-based budget selection with real-time reach estimation
4. **Creative Development**: Product description input with AI-powered ad copy generation
5. **Audience Targeting**: Location, age, and gender targeting with auto-suggestion features
6. **Preview & Launch**: Campaign review and launch confirmation
7. **Dashboard**: Post-launch campaign management and monitoring

## Progress Tracking
Visual progress indicator showing completion percentage (20% increments) with persistent state management across navigation.

# External Dependencies

## UI and Styling
- **Shadcn/ui**: Complete component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography

## State Management and Data Fetching
- **TanStack React Query**: Server state management, caching, and synchronization
- **React Hook Form**: Form state management and validation
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

## Database and Schema
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL dialect support
- **Neon Database**: Serverless PostgreSQL database provider (configured but not actively used)
- **Drizzle Zod**: Schema validation integration between Drizzle and Zod

## AI Integration
- **OpenAI API**: GPT-powered ad copy generation with multiple variant suggestions
- **Environment Configuration**: API key management through environment variables

## Development and Build Tools
- **Vite**: Fast build tool and development server
- **ESBuild**: Fast bundler for production builds
- **TypeScript**: Type safety across the entire application
- **Replit Integration**: Development environment optimization with error overlays and cartographer plugin

## Utility Libraries
- **Class Variance Authority**: Component variant management
- **CLSX**: Conditional className utilities
- **Date-fns**: Date manipulation and formatting
- **Wouter**: Lightweight routing library
- **Nanoid**: Unique ID generation

The architecture is designed for scalability and maintainability, with clear separation of concerns and the ability to easily swap implementations (particularly the storage layer) when moving from prototype to production.