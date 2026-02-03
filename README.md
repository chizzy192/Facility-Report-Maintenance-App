# Facility Report Maintenance App

A comprehensive web application designed to streamline facility maintenance workflows for schools and institutions. This platform enables users to submit maintenance reports, track their progress, and manage maintenance tasks efficiently.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [User Roles](#user-roles)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Configuration](#configuration)

## Overview

The Facility Report Maintenance App is a full-featured maintenance management system that bridges the gap between facility users, technicians, and administrators. The platform simplifies the process of reporting maintenance issues and managing their resolution with real-time tracking and status updates.

**Key Benefits:**
- Reduce maintenance request processing time
- Improve communication between reporters and technicians
- Track maintenance history and completion rates
- Manage technician assignments and workloads
- Centralized facility management dashboard

## Features

### For Reporters
- **Easy Reporting**: Submit maintenance requests with descriptions, photos, and priority levels
- **Real-time Tracking**: Monitor the status of submitted reports from submission to completion
- **View History**: Access all submitted reports and their current status
- **Notifications**: Receive updates on report status changes
- **Categorized Issues**: Organize reports by maintenance categories

### For Technicians
- **Task Management**: View and manage assigned maintenance tasks
- **Status Updates**: Mark tasks as in-progress or completed
- **Task Organization**: Track assigned, in-progress, and completed tasks
- **Notifications**: Receive alerts for newly assigned tasks

### For Administrators
- **Dashboard Analytics**: View all facility reports and their status
- **User Management**: Manage reporter and technician accounts
- **Category Management**: Create and organize maintenance categories
- **Task Assignment**: Assign maintenance tasks to technicians
- **Settings**: Configure system-wide settings
- **Review Queue**: Review pending maintenance tasks before assignment

## User Roles

The application supports three distinct user roles with specific permissions:

### 1. **Reporter** (Facility Users)
- Submit new maintenance requests
- Upload photos and descriptions
- Track request status in real-time
- View notification updates
- Access personal report history

### 2. **Technician**
- View assigned maintenance tasks
- Update task progress and status
- Mark tasks as completed
- Track assigned, in-progress, and completed tasks
- Receive notifications for new assignments

### 3. **Administrator**
- Full system access
- Review all maintenance reports
- Manage user accounts and roles
- Create and modify maintenance categories
- Assign tasks to technicians
- View system analytics and settings
- Configure application settings

## Tech Stack

### Frontend
- **React 19.2**: Modern JavaScript library for building user interfaces
- **Vite 7.2**: Fast build tool and development server
- **React Router 7.9**: Client-side routing
- **Tailwind CSS 4.1**: Utility-first CSS framework
- **Headless UI 2.2**: Accessible UI components
- **Heroicons 2.2**: Beautiful SVG icons
- **Lucide React 0.553**: Additional icon library

### Backend & Services
- **Supabase 2.81**: Backend-as-a-Service platform
  - PostgreSQL database
  - Authentication (email/password)
  - Real-time capabilities
  - Storage for file uploads

### Additional Libraries
- **React Dropzone 14.3**: File upload handling
- **React Masonry CSS 1.0**: Responsive grid layouts
- **Tailwind Plus Elements**: Extended Tailwind components

### Development Tools
- **ESLint 9.39**: Code linting
- **Vite React Plugin 5.1**: React refresh support
- **TypeScript Support**: Type definitions for React

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Supabase account (free tier available)
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Facility-Report-Maintenance-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the project root with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Verify Installation**
   ```bash
   npm run lint
   ```

## Getting Started

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Code Linting

Check code quality and style issues:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/           # Reusable React components
│   ├── Buttons.jsx
│   ├── CategoryDropDown.jsx
│   ├── DropDown.jsx
│   ├── Footer.jsx
│   ├── FormInput.jsx
│   ├── Header.jsx
│   ├── HeroHeader.jsx
│   ├── ImageFile.jsx
│   ├── MenuBar.jsx
│   ├── PriorityBadge.jsx
│   ├── ProtectedRoute.jsx      # Route protection by role
│   ├── SectionHeader.jsx
│   ├── SideBar.jsx
│   ├── StatusBadge.jsx
│   ├── TechnicianDropDown.jsx
│   ├── TechnicianPopUp.jsx
│   └── Theme.jsx
├── context/              # React Context for state management
│   └── AuthContext.jsx   # Authentication state & logic
├── pages/                # Page components
│   ├── LandingPage.jsx   # Public landing page
│   ├── Login.jsx         # User login
│   ├── SignUp.jsx        # User registration
│   ├── Admin/            # Admin-only pages
│   │   ├── AdminDashboard.jsx
│   │   └── Sections/
│   │       ├── AdminReviewTasks.jsx
│   │       ├── Categories.jsx
│   │       ├── Reports.jsx
│   │       ├── Settings.jsx
│   │       └── Users.jsx
│   ├── Reporter/         # Reporter-only pages
│   │   ├── ReporterDashboard.jsx
│   │   └── Sections/
│   │       ├── Home.jsx
│   │       ├── MyReports.jsx
│   │       ├── Notifications.jsx
│   │       └── SubmitReport.jsx
│   └── Technician/       # Technician-only pages
│       ├── TechnicianDashboard.jsx
│       └── Sections/
│           ├── AssignedTasks.jsx
│           ├── Completed.jsx
│           ├── InProgress.jsx
│           └── TechnicianNotification.jsx
├── assets/               # Static assets (images, icons)
├── App.jsx              # Root application component
├── index.css            # Global styles
├── main.jsx             # Application entry point
├── router.jsx           # Route configuration
└── supabaseClient.js    # Supabase client initialization
```

## Development

### Code Style & Standards

This project uses ESLint to maintain consistent code quality. The configuration includes:
- React best practices
- React Hooks rules
- React Refresh compatibility checks

### Component Organization

Components are organized by responsibility:
- **Layout Components**: Header, Footer, SideBar, MenuBar
- **UI Components**: Buttons, FormInput, DropDown, Badge components
- **Feature Components**: Dashboard pages and section views
- **Utility Components**: ProtectedRoute, Theme

### Authentication Flow

The application uses Supabase authentication with role-based access control:

1. User signs up or logs in through `Login.jsx` or `SignUp.jsx`
2. AuthContext manages session and user data
3. ProtectedRoute component verifies user role
4. User is redirected to appropriate dashboard based on role

### Styling

This project uses Tailwind CSS with a custom configuration:
- View [tailwind.config.js](tailwind.config.js) for custom theme colors and utilities
- Global styles defined in [src/index.css](src/index.css)

## Deployment

### Deploy to Vercel (Recommended)

The project includes `vercel.json` configuration for easy Vercel deployment:

```bash
npm install -g vercel
vercel
```

Follow the prompts to connect your repository and deploy.

### Environment Variables in Production

Ensure these variables are set in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Configuration

### Supabase Setup

To set up Supabase for this project:

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Create the following tables in your PostgreSQL database:
   - `profiles` - User profile information
   - `reports` - Maintenance reports
   - `tasks` - Technician tasks
   - `categories` - Maintenance categories
   - `notifications` - User notifications

3. Set up authentication policies for row-level security (RLS)

4. Copy your Supabase URL and anon key to the `.env` file

### Tailwind Configuration

Customize colors and styles in [tailwind.config.js](tailwind.config.js):
- Define custom color palette
- Add custom utilities
- Configure plugins

## Troubleshooting

**Issue**: Port 5173 already in use
- **Solution**: `npm run dev -- --port 3000`

**Issue**: Supabase connection errors
- **Solution**: Verify environment variables are correctly set in `.env`

**Issue**: Build errors
- **Solution**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Contributing

When contributing to this project:
1. Create a feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -m "Description of changes"`
3. Run linting: `npm run lint`
4. Push to branch: `git push origin feature/feature-name`
5. Submit a pull request

## License

[Add your license information here]

## Support

For questions or issues, please:
- Check the documentation in this README
- Review the code comments in relevant files
- Open an issue in the repository

---

**Last Updated**: February 2026
