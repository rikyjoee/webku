# TikTok Downloader Web Application

## Overview

This is a full-stack web application that allows users to download TikTok videos and extract audio from them. The application features a modern React frontend with a Node.js/Express backend, designed to provide a simple and user-friendly interface for downloading TikTok content in various formats.

**Status**: Fully functional - successfully downloads real TikTok videos without watermarks using TikWM API integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Development**: Hot reloading with Vite integration in development mode

### Data Storage
- **Primary Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with TypeScript schema definitions
- **Session Storage**: PostgreSQL table for session management
- **File Storage**: Temporary storage for downloaded content (not persistent)
- **Storage Implementation**: Migrated from in-memory storage to PostgreSQL database storage

## Key Components

### Database Schema
- **Downloads Table**: Stores download requests with metadata
  - `id`: Primary key
  - `url`: TikTok video URL
  - `title`: Video title (extracted)
  - `duration`: Video duration in seconds
  - `thumbnail`: Thumbnail URL
  - `format`: Output format (mp4/mp3)
  - `quality`: Quality setting (hd/standard)
  - `status`: Processing status (pending/processing/completed/failed)
  - `downloadUrl`: Final download URL
  - `createdAt`: Timestamp

### Frontend Components
- **DownloadForm**: Main interface for URL input and download initiation
- **VideoPreview**: Displays video metadata and format selection
- **ProgressBar**: Shows download progress status
- **FeatureCard**: Promotional content cards
- **DeviceGuide**: Instructions for different devices
- **FaqSection**: Frequently asked questions

### API Endpoints
- `POST /api/video-info`: Extract video metadata from TikTok URL
- `POST /api/downloads`: Create new download request
- `GET /api/downloads/:id`: Get download status
- `GET /api/downloads`: List recent downloads

## Data Flow

1. **User Input**: User pastes TikTok URL into the form
2. **URL Validation**: Client-side validation for TikTok URL format
3. **Video Info Extraction**: Request to `/api/video-info` to get metadata
4. **Format Selection**: User chooses between MP4 video or MP3 audio
5. **Download Request**: POST to `/api/downloads` with selected options
6. **Processing**: Server simulates video processing (placeholder implementation)
7. **Status Updates**: Client polls for download status updates
8. **Download Ready**: User receives download link when processing completes

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Query
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date formatting

### Backend Dependencies
- **Express.js**: Web framework with middleware support
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Session Management**: express-session, connect-pg-simple
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution

### Build Tools
- **Vite**: Frontend build tool with React plugin
- **TypeScript**: Type checking and compilation
- **ESBuild**: Backend bundling for production
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development
- Vite dev server for frontend with hot reloading
- tsx for backend development with file watching
- Integrated development environment with proxy setup

### Production Build
- Frontend: Vite build to `dist/public` directory
- Backend: ESBuild bundle to `dist/index.js`
- Static file serving from Express for production

### Environment Configuration
- Database URL from environment variables
- Separate development and production configurations
- Replit-specific optimizations for cloud deployment

### Database Setup
- Drizzle migrations in `migrations/` directory
- Schema definitions in `shared/schema.ts`
- Database push command: `npm run db:push`

## Key Architectural Decisions

### Monorepo Structure
- **Problem**: Manage frontend and backend code together
- **Solution**: Shared workspace with common TypeScript configuration
- **Benefits**: Shared types, simplified deployment, consistent tooling

### Database Storage Architecture
- **Problem**: Persistent storage for download history and metadata
- **Solution**: PostgreSQL database with Drizzle ORM for type-safe queries
- **Benefits**: Data persistence, scalability, production-ready storage

### Shared Schema Validation
- **Problem**: Ensure type safety between frontend and backend
- **Solution**: Shared Zod schemas in `shared/` directory
- **Benefits**: Single source of truth, compile-time type checking

### Component-Based UI Architecture
- **Problem**: Maintainable and reusable UI components
- **Solution**: shadcn/ui with Radix UI primitives
- **Benefits**: Accessibility, consistency, customization flexibility

### Progressive Enhancement
- **Problem**: Ensure app works without JavaScript
- **Solution**: Server-side rendering capability with Express
- **Benefits**: Better SEO, improved performance, graceful degradation