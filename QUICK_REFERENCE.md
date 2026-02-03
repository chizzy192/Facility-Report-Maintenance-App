# Quick Reference Guide

## Documentation Files Overview

### 📋 [README.md](README.md)
**Start here!** Overview of the project, features, tech stack, and basic setup.
- Project overview and benefits
- Features for each user role
- Installation steps
- Tech stack overview
- Deployment instructions

### 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md)
Detailed technical architecture and design patterns.
- System architecture diagram
- Layered architecture explanation
- Data flow diagrams
- Component hierarchy
- State management strategy
- Database schema
- Security measures

### ⚙️ [SETUP.md](SETUP.md)
Complete setup guide for development environment and database.
- Prerequisites and installation
- Supabase project setup
- Database table creation
- SQL scripts ready to use
- Storage bucket configuration
- Environment variables setup
- Sample data for testing
- Troubleshooting guide

### 🔌 [API.md](API.md)
API reference for Supabase operations and integrations.
- Authentication API (signup, login, logout)
- Database CRUD operations
- File upload/download
- Real-time subscriptions
- Query patterns and examples
- Error handling
- Best practices

### 💻 [DEVELOPMENT.md](DEVELOPMENT.md)
Developer guide for working with the codebase.
- Development server setup
- Component creation and usage
- State management patterns
- Database operations in code
- Styling with Tailwind
- Routing configuration
- Form handling
- File uploads
- Debugging tips
- Code quality tools
- Production build process

### 🎯 [FEATURES.md](FEATURES.md)
User features and workflows documentation.
- Feature overview by role
- Complete user workflows
- Status transitions
- Notification rules
- Permission matrix
- Step-by-step feature guides

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure at a Glance

```
Facility-Report-Maintenance-App/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components by role
│   ├── context/         # React Context (AuthContext)
│   ├── assets/          # Images and icons
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   ├── router.jsx       # Route definitions
│   ├── index.css        # Global styles
│   └── supabaseClient.js # Supabase setup
├── public/              # Static files
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS config
├── vite.config.js       # Vite config
├── vercel.json         # Vercel deployment config
└── Documentation files (README, ARCHITECTURE, SETUP, API, etc.)
```

---

## User Roles & Permissions

### 👤 Reporter (Facility User)
**Can:**
- Submit maintenance reports with photos
- View submitted reports and their status
- Track real-time progress
- Receive notifications

### 🔧 Technician (Maintenance Worker)
**Can:**
- View assigned maintenance tasks
- Update task status (assigned → in progress → completed)
- Track organized task lists by status
- Receive task notifications

### 👨‍💼 Admin (System Administrator)
**Can:**
- View all reports and tasks
- Assign tasks to technicians
- Manage user accounts and roles
- Create and manage maintenance categories
- Configure system settings
- Review pending reports

---

## Common Tasks

### Setup & Installation
1. Read: [README.md](README.md) - Project Overview
2. Read: [SETUP.md](SETUP.md) - Complete Setup Guide
3. Follow Supabase database setup steps
4. Configure `.env` file

### For Developers
1. Read: [DEVELOPMENT.md](DEVELOPMENT.md) - Development Guide
2. Read: [ARCHITECTURE.md](ARCHITECTURE.md) - Technical Architecture
3. Use [API.md](API.md) as reference for database operations

### Understanding Features
1. Read: [FEATURES.md](FEATURES.md) - Feature Overview
2. Find specific user workflow
3. Review related pages in source code

### Adding New Features
1. Read: [ARCHITECTURE.md](ARCHITECTURE.md) - Design patterns
2. Read: [DEVELOPMENT.md](DEVELOPMENT.md) - Component creation
3. Check [API.md](API.md) for database operations
4. Use existing components as templates

### Deploying to Production
1. Read: [README.md](README.md#deployment) - Deployment section
2. Verify environment variables
3. Run: `npm run build`
4. Follow Vercel deployment steps

---

## Technology Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 19.2 |
| Build Tool | Vite | 7.2 |
| Routing | React Router | 7.9 |
| Styling | Tailwind CSS | 4.1 |
| Backend | Supabase | 2.81 |
| Database | PostgreSQL | (Supabase) |
| Authentication | Supabase Auth | Built-in |
| File Storage | Supabase Storage | Built-in |

---

## Database Tables Quick Reference

| Table | Purpose | Key Columns |
|-------|---------|------------|
| `profiles` | User accounts & roles | user_id, full_name, email, role |
| `reports` | Maintenance requests | reporter_id, title, priority, status |
| `tasks` | Assigned maintenance work | report_id, technician_id, status |
| `categories` | Maintenance types | name, description, color |
| `notifications` | User notifications | user_id, type, message, is_read |

---

## Common File Locations

### Pages
- Reporter Dashboard: `src/pages/Reporter/ReporterDashboard.jsx`
- Admin Dashboard: `src/pages/Admin/AdminDashboard.jsx`
- Technician Dashboard: `src/pages/Technician/TechnicianDashboard.jsx`

### Components
- Authentication: `src/context/AuthContext.jsx`
- Route Protection: `src/components/ProtectedRoute.jsx`
- Navigation: `src/components/Header.jsx`, `src/components/SideBar.jsx`

### Configuration
- Routes: `src/router.jsx`
- Supabase: `src/supabaseClient.js`
- Styles: `src/index.css`, `tailwind.config.js`

### API
- All Supabase operations use: `import { supabase } from '../supabaseClient'`

---

## Feature Status

### ✅ Implemented
- User authentication (signup/login)
- Role-based access control
- Report submission
- Report tracking
- Task assignment
- Task status updates
- Notifications system
- Category management
- User management
- Admin dashboard

### 🔄 In Development / Suggestions
- Advanced analytics dashboard
- Bulk operations
- Export reports to PDF
- Search functionality enhancement
- Performance metrics
- Task priority queue
- Automated escalation
- Integration with email notifications

---

## Key Concepts

### Authentication Flow
User → Login/Signup → Supabase Auth → Profile Created → Role Assigned → Redirected to Dashboard

### Report Lifecycle
Submitted → Pending Review → Assigned → In Progress → Completed → Archived

### Task Lifecycle
Created → Assigned → In Progress → Completed

### State Management
- **Global**: AuthContext (user, session, role)
- **Local**: Component state (forms, UI toggles)
- **Database**: Supabase (persistent data)

### Data Security
- Row-Level Security (RLS) on all tables
- Role-based access control
- Environment variables for secrets
- Secure file uploads

---

## Troubleshooting Quick Links

| Issue | Location |
|-------|----------|
| Setup problems | [SETUP.md - Troubleshooting](SETUP.md#troubleshooting-setup) |
| Development errors | [DEVELOPMENT.md - Debugging](DEVELOPMENT.md#debugging) |
| Database errors | [API.md - Error Handling](API.md#error-handling) |
| Connection issues | [SETUP.md - Troubleshooting](SETUP.md#troubleshooting-setup) |

---

## File Editing Tips

When editing files, consider impact on:
- `router.jsx` - Changes routing structure
- `AuthContext.jsx` - Changes authentication flow
- Components - Updates UI/UX
- CSS files - Affects styling globally
- Database schema - Requires migrations

---

## Performance Considerations

- ✅ Code splitting with React Router
- ✅ Lazy loading for heavy components
- ✅ Tailwind CSS for optimized bundle
- ✅ Image optimization before upload
- ✅ Debouncing for search operations

---

## Security Checklist

Before going to production:
- [ ] Remove console.log statements
- [ ] Verify all environment variables are set
- [ ] Check RLS policies in database
- [ ] Test authentication flow
- [ ] Verify role-based access control
- [ ] Review error messages (not exposing sensitive info)
- [ ] Test file upload permissions
- [ ] Run lint check: `npm run lint`

---

## Next Steps

1. **New to the project?**
   → Read [README.md](README.md) then [SETUP.md](SETUP.md)

2. **Setting up development?**
   → Follow [SETUP.md](SETUP.md) completely, then read [DEVELOPMENT.md](DEVELOPMENT.md)

3. **Adding features?**
   → Check [ARCHITECTURE.md](ARCHITECTURE.md) for design patterns

4. **Understanding workflows?**
   → Read [FEATURES.md](FEATURES.md) for detailed user journeys

5. **Working with API?**
   → Reference [API.md](API.md) for Supabase operations

6. **Deploying?**
   → Check [README.md](README.md#deployment) deployment section

---

**Documentation Last Updated**: February 2026

**Project Status**: Active Development

For questions or updates, refer to the specific documentation file for that topic.
