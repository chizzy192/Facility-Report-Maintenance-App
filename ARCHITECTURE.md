# Architecture Documentation

## Overview

The Facility Report Maintenance App follows a modern React architecture with separation of concerns, using Supabase for backend services and Vite as the build tool.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Router (react-router)               │   │
│  │  ├─ Landing Page                                │   │
│  │  ├─ Login / SignUp                              │   │
│  │  └─ Protected Routes                            │   │
│  └──────────────────────────────────────────────────┘   │
│                          │                               │
│  ┌──────────────────────────────────────────────────┐   │
│  │    Context API (AuthContext)                     │   │
│  │    ├─ Session Management                        │   │
│  │    ├─ User State                                │   │
│  │    └─ Authentication Logic                      │   │
│  └──────────────────────────────────────────────────┘   │
│                          │                               │
│  ┌──────────────────────────────────────────────────┐   │
│  │    Component Hierarchy                           │   │
│  │    ├─ Page Components (Dashboard Views)         │   │
│  │    ├─ Section Components                        │   │
│  │    └─ Reusable UI Components                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                 Supabase Backend                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Authentication (auth.signUp, etc.)       │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │         PostgreSQL Database Tables               │   │
│  │    ├─ profiles                                  │   │
│  │    ├─ reports                                   │   │
│  │    ├─ tasks                                     │   │
│  │    ├─ categories                                │   │
│  │    └─ notifications                             │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Storage (File Uploads)                   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Layered Architecture

### 1. **Presentation Layer**
The UI layer handles all user interactions and displays data.

**Components:**
- **Pages**: Full-page components (Landing, Login, Dashboard views)
- **Sections**: Sub-views within dashboards
- **UI Components**: Reusable components (Buttons, FormInput, Badges)
- **Layout Components**: Header, Footer, Sidebar, MenuBar

**Styling:**
- Tailwind CSS for utility-first styling
- Responsive design with mobile-first approach
- Theme support through Theme.jsx component

### 2. **State Management Layer**
Manages application state and side effects.

**AuthContext:**
- Handles user authentication state
- Manages session information
- Provides login, signup, and logout functions
- Stores user metadata and roles

**Local Component State:**
- Form states
- UI states (modals, dropdowns, loading states)
- Temporary data during workflows

### 3. **Routing Layer**
Manages navigation and page flow.

**Router Configuration:**
- Public routes: Landing, Login, SignUp
- Protected routes: Dashboard areas with role-based access
- Route guards: ProtectedRoute component validates user roles

**Route Structure:**
```
/ (Landing)
├── /signup
├── /login
├── /reporterdashboard (role: reporter)
│   ├── / (Home)
│   ├── /myreports
│   ├── /submitreport
│   └── /notifications
├── /admindashboard (role: admin)
│   ├── / (Reports)
│   ├── /users
│   ├── /categories
│   ├── /notifications
│   └── /settings
└── /techniciandashboard (role: technician)
    ├── / (Assigned Tasks)
    ├── /inprogress
    ├── /completed
    └── /notifications
```

### 4. **Backend Layer**
Supabase handles data persistence and authentication.

**Services:**
- **Authentication**: Email/password authentication
- **Database**: PostgreSQL with real-time capabilities
- **Storage**: File uploads for report images
- **Real-time**: Live updates for notifications and task changes

## Data Flow

### Authentication Flow
```
User Input (Login/SignUp)
          │
          ▼
    AuthContext.jsx
          │
          ├─► supabase.auth.signUp/signInWithPassword
          │
          ├─► Create/Update profiles table
          │
          ▼
    Store in Context State
          │
          ▼
    ProtectedRoute validates role
          │
          ▼
    Redirect to appropriate dashboard
```

### Report Submission Flow
```
Reporter fills form (SubmitReport.jsx)
          │
          ├─► Upload image via React Dropzone
          │
          ├─► Save to Supabase Storage
          │
          ▼
    Insert report record in database
          │
          ▼
    Admin notification created
          │
          ▼
    Confirmation to reporter
```

### Task Assignment Flow
```
Admin selects report (AdminDashboard)
          │
          ▼
    Review in AdminReviewTasks
          │
          ├─► Select technician
          │
          ├─► Create task record
          │
          ▼
    Create notification for technician
          │
          ▼
    Task appears in TechnicianDashboard
```

## Component Hierarchy

### Page Components
- **LandingPage**: Public landing page with navigation
- **Login**: User authentication
- **SignUp**: User registration
- **ReporterDashboard**: Reporter's main interface
- **AdminDashboard**: Admin's main interface
- **TechnicianDashboard**: Technician's main interface

### Section Components
Located within dashboard pages, handle specific features:
- Reporter: Home, MyReports, SubmitReport, Notifications
- Admin: Reports, Users, Categories, AdminReviewTasks, Settings
- Technician: AssignedTasks, InProgress, Completed, TechnicianNotification

### Reusable UI Components
- **Buttons**: Action buttons with consistent styling
- **FormInput**: Form input fields with validation
- **DropDown/CategoryDropDown/TechnicianDropDown**: Selection dropdowns
- **Badge Components**: StatusBadge, PriorityBadge for visual indicators
- **ImageFile**: Image upload and preview
- **MenuBar/SideBar**: Navigation components

### Utility Components
- **ProtectedRoute**: Role-based access control wrapper
- **Theme**: Theme switching and styling
- **Header/Footer**: Layout wrappers

## State Management Strategy

### Global State (AuthContext)
- User authentication status
- Current user information
- Session data
- User role

### Local State
- Form inputs and validation
- UI toggle states (modals, dropdowns)
- Loading and error states
- Temporary working data

### Database State (Supabase)
- User profiles
- Maintenance reports
- Maintenance tasks
- Categories
- Notifications

## Authentication & Authorization

### Role-Based Access Control (RBAC)
Three roles with different permissions:

**Reporter:**
- Create reports
- View own reports
- Receive status updates

**Technician:**
- View assigned tasks
- Update task status
- Access completed tasks history

**Admin:**
- Full access to all data
- Manage users
- Manage categories
- Assign tasks
- Review pending reports

### Implementation
- User role stored in `profiles` table
- ProtectedRoute component checks user role before rendering
- Context provides role information to components
- Supabase RLS policies enforce database-level security

## Database Schema

### Core Tables

**profiles**
```sql
- user_id (UUID) - FK to auth.users
- full_name (TEXT)
- email (TEXT)
- role (TEXT) - 'reporter', 'technician', 'admin'
- created_at (TIMESTAMP)
```

**reports**
```sql
- id (UUID)
- reporter_id (UUID) - FK to profiles
- title (TEXT)
- description (TEXT)
- category_id (UUID) - FK to categories
- priority (TEXT) - 'low', 'medium', 'high'
- status (TEXT) - 'pending', 'in_progress', 'completed'
- image_url (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**tasks**
```sql
- id (UUID)
- report_id (UUID) - FK to reports
- technician_id (UUID) - FK to profiles
- status (TEXT) - 'assigned', 'in_progress', 'completed'
- assigned_at (TIMESTAMP)
- completed_at (TIMESTAMP)
```

**categories**
```sql
- id (UUID)
- name (TEXT)
- description (TEXT)
- created_at (TIMESTAMP)
```

**notifications**
```sql
- id (UUID)
- user_id (UUID) - FK to profiles
- type (TEXT) - 'report_status', 'task_assigned'
- message (TEXT)
- related_id (UUID)
- read (BOOLEAN)
- created_at (TIMESTAMP)
```

## Error Handling

### Frontend Error Handling
- Try-catch blocks in async operations
- User-friendly error messages
- Console logging for debugging
- Loading states to prevent duplicate submissions

### Backend Error Handling
- Supabase error objects contain meaningful messages
- Field validation on form submission
- Database constraints prevent invalid states

## Performance Considerations

### Code Splitting
- Lazy loading of page components via React Router
- Dynamic imports for large components

### Caching
- Browser caching for static assets
- Session storage for authentication tokens

### Optimization
- Masonry layout for efficient grid display
- Image optimization for file uploads
- Debouncing for search and filter operations

## Security Measures

### Authentication
- Email/password authentication via Supabase
- Secure session management
- Token-based authorization

### Authorization
- Role-based access control
- ProtectedRoute component validates permissions
- Row-level security (RLS) in database

### Data Protection
- HTTPS-only in production
- Supabase's built-in security features
- Secure file upload handling

## Deployment Architecture

### Development
- Local Vite dev server with HMR
- ESLint for code quality

### Production
- Vite build creates optimized bundle
- Deployment to Vercel (recommended)
- Environment variables for secrets
- Database in Supabase cloud

---

**Last Updated**: February 2026
