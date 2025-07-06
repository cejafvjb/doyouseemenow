# Do You See Me? - Image Upload Gallery

## Overview

"Do You See Me?" is a minimalist image gallery application that allows users to upload and share images. The application features QR code accessibility and is optimized for mobile devices. It's built as a full-stack web application with a React frontend, Express backend, and PostgreSQL database using Drizzle ORM.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React with TypeScript, using Vite for build tooling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **File Upload**: Multer for handling multipart form data
- **Image Processing**: Sharp for image optimization and resizing

## Key Components

### Frontend Architecture
- **Component Structure**: Uses shadcn/ui design system with customizable components
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Drag & Drop**: React Beautiful DND for admin image reordering functionality
- **Animations**: Framer Motion for smooth UI animations
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **API Structure**: RESTful endpoints for image management
- **File Storage**: Local file storage with configurable upload directory
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)
- **Middleware**: Custom logging, error handling, and file upload processing
- **Development**: Vite integration for hot module replacement in development

### Database Schema
- **Images Table**: Stores image metadata including filename, original name, mimetype, size, sort order, and creation timestamp
- **Users Table**: Simple user management for admin authentication
- **Migrations**: Drizzle migrations for schema version control

## Data Flow

1. **Image Upload**: Users drag/drop or select images → Multer processes multipart data → Sharp optimizes images → Files saved to uploads directory → Metadata stored in database
2. **Image Display**: Frontend queries `/api/images` → Backend retrieves sorted image list from database → Images served from static uploads directory
3. **Admin Operations**: Admin login → JWT/session authentication → Drag-and-drop reordering → PATCH requests update sort order → Database reflects new order

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL client optimized for serverless environments
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **express**: Web framework for Node.js
- **multer**: File upload middleware
- **sharp**: High-performance image processing

### UI/UX Dependencies
- **@radix-ui/***: Accessible, unstyled UI primitives
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **react-beautiful-dnd**: Drag and drop functionality
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

The application is configured for deployment on platforms that support Node.js:

1. **Build Process**: 
   - Frontend: Vite builds React app to `dist/public`
   - Backend: esbuild bundles server to `dist/index.js`
   - Database: Drizzle pushes schema changes

2. **Environment Variables**:
   - `DATABASE_URL`: PostgreSQL connection string (required)
   - `NODE_ENV`: Environment setting (development/production)

3. **File Storage**: 
   - Local uploads directory (needs persistent storage in production)
   - Static file serving through Express

4. **Database Setup**:
   - Run `npm run db:push` to apply schema
   - Database auto-provisioning through Drizzle config

## Changelog

```
Changelog:
- July 06, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```