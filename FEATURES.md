# Features & User Flows Documentation

## Feature Overview

### Reporter Features

#### 1. Submit Maintenance Report
**Purpose**: Allow facility users to report maintenance issues

**User Flow**:
1. Reporter logs in
2. Navigates to "Submit Report" section
3. Fills out report form:
   - Title: Issue description
   - Description: Detailed explanation
   - Category: Type of maintenance needed
   - Priority: Issue severity (low, medium, high)
   - Location: Where the issue is located
   - Image: Photo of the issue (optional)
4. Submits report
5. Receives confirmation notification
6. Report appears in "My Reports"

**Page**: [ReporterDashboard](src/pages/Reporter/ReporterDashboard.jsx) → [SubmitReport](src/pages/Reporter/Sections/SubmitReport.jsx)

**Database Tables Used**:
- `reports` (insert new report)
- `categories` (display available categories)
- `storage` (upload image if provided)

**Notifications Created**:
- Admin receives notification of new report
- Reporter receives confirmation

---

#### 2. View My Reports
**Purpose**: Track submitted reports and their status

**User Flow**:
1. Reporter navigates to "My Reports"
2. Sees list of all submitted reports
3. Each report shows:
   - Title and priority
   - Current status (pending, assigned, in_progress, completed)
   - Submission date
   - Category

**Page**: [MyReports](src/pages/Reporter/Sections/MyReports.jsx)

**Database Tables Used**:
- `reports` (select all reports by reporter_id)
- `categories` (get category name and color)
- `tasks` (check if task is assigned)

**Features**:
- Filter by status
- Sort by date or priority
- Click report for details
- View assigned technician (if applicable)

---

#### 3. Real-time Tracking
**Purpose**: Monitor report progress in real-time

**Status Progression**:
```
pending → assigned → in_progress → completed
```

**Status Details**:
- **Pending**: Awaiting admin review
- **Assigned**: Admin assigned technician
- **In Progress**: Technician is working
- **Completed**: Task finished

**Page**: [MyReports](src/pages/Reporter/Sections/MyReports.jsx) - Detail view

**Live Updates**:
- Supabase real-time subscriptions
- Automatic status updates without page refresh

---

#### 4. Notifications
**Purpose**: Keep reporters informed of status changes

**Notification Types**:
- Report status updated
- Technician assigned
- Task completed
- Administrator messages

**Page**: [Notifications](src/pages/Reporter/Sections/Notifications.jsx)

**Features**:
- List of all notifications
- Mark as read/unread
- Delete notifications
- Filter by type (optional)

**Database Tables Used**:
- `notifications` (select notifications for user_id)

---

### Technician Features

#### 1. View Assigned Tasks
**Purpose**: See maintenance tasks assigned by admin

**User Flow**:
1. Technician logs in
2. Dashboard shows all assigned tasks
3. Each task displays:
   - Report title and description
   - Location of issue
   - Priority level
   - Assigned date
   - Reporter contact (if available)

**Page**: [TechnicianDashboard](src/pages/Technician/TechnicianDashboard.jsx) → [AssignedTasks](src/pages/Technician/Sections/AssignedTasks.jsx)

**Database Tables Used**:
- `tasks` (select where technician_id = current user)
- `reports` (get report details)
- `profiles` (get reporter info)

---

#### 2. Update Task Progress
**Purpose**: Change task status as work progresses

**Status Progression**:
```
assigned → in_progress → completed
```

**User Flow**:
1. Technician opens a task
2. Clicks "Start Work" or "Mark In Progress"
3. Task status updates to `in_progress`
4. Technician adds notes/updates as needed
5. When complete, clicks "Mark Completed"
6. Task status updates to `completed`
7. Report status updates to `completed`
8. Reporter receives notification

**Page**: [AssignedTasks](src/pages/Technician/Sections/AssignedTasks.jsx) - Task detail view

**Database Updates**:
- Update `tasks` table status
- Update `reports` table status
- Create notification for reporter

---

#### 3. Track Task Organization
**Purpose**: Organize tasks by status

**Sections**:
- **Assigned Tasks**: New tasks just assigned
- **In Progress**: Tasks being worked on
- **Completed**: Finished tasks

**Pages**:
- [AssignedTasks](src/pages/Technician/Sections/AssignedTasks.jsx)
- [InProgress](src/pages/Technician/Sections/InProgress.jsx)
- [Completed](src/pages/Technician/Sections/Completed.jsx)

**Database Queries**:
- Assigned: `WHERE technician_id = X AND status = 'assigned'`
- In Progress: `WHERE technician_id = X AND status = 'in_progress'`
- Completed: `WHERE technician_id = X AND status = 'completed'`

---

#### 4. Notifications
**Purpose**: Alert technicians of new task assignments

**Notification Types**:
- Task assigned to you
- Task status updated
- Admin messages

**Page**: [TechnicianNotification](src/pages/Technician/Sections/TechnicianNotification.jsx)

---

### Admin Features

#### 1. View All Reports
**Purpose**: Monitor all facility maintenance requests

**User Flow**:
1. Admin logs in (default dashboard view)
2. Sees dashboard with all reports
3. Reports displayed with:
   - Status (visual badge)
   - Priority (visual badge)
   - Reporter name
   - Category
   - Submission date
   - Assigned technician (if applicable)

**Page**: [AdminDashboard](src/pages/Admin/AdminDashboard.jsx) → [Reports](src/pages/Admin/Sections/Reports.jsx)

**Database Tables Used**:
- `reports` (select all)
- `profiles` (reporter and technician info)
- `categories` (category details)
- `tasks` (task status)

**Features**:
- Filter by status
- Filter by priority
- Filter by category
- Search by title or description
- Sort by date
- Pagination for large datasets

---

#### 2. Review & Assign Tasks
**Purpose**: Create tasks and assign to technicians

**User Flow**:
1. Admin views pending reports
2. Clicks on a report
3. Reviews details and attached images
4. Decides if action is needed
5. Selects a technician from dropdown
6. Adds notes/instructions
7. Clicks "Assign Task"
8. Task created with status `assigned`
9. Technician receives notification
10. Report status changes to `assigned`

**Page**: [AdminReviewTasks](src/pages/Admin/Sections/AdminReviewTasks.jsx)

**Database Operations**:
- Create task in `tasks` table
- Update report status in `reports` table
- Create notification in `notifications` table

**Task Assignment Logic**:
- View available technicians (role = 'technician')
- Check technician's current workload (optional enhancement)
- Assign with optional notes

---

#### 3. Manage Users
**Purpose**: Create and manage reporter and technician accounts

**User Flow**:
1. Admin navigates to "Users"
2. Sees list of all users with:
   - Name
   - Email
   - Role (reporter/technician/admin)
   - Status (active/inactive)
   - Join date

3. Can perform actions:
   - Edit user details
   - Change user role
   - Deactivate user
   - Delete user
   - Create new user account

**Page**: [Users](src/pages/Admin/Sections/Users.jsx)

**Database Tables Used**:
- `profiles` (user list and details)
- `auth.users` (authentication info)

**Features**:
- Search users by name or email
- Filter by role
- Bulk actions (future enhancement)

---

#### 4. Manage Categories
**Purpose**: Create and organize maintenance categories

**User Flow**:
1. Admin navigates to "Categories"
2. Sees list of all categories:
   - Name
   - Description
   - Color (for visual coding)

3. Can perform actions:
   - Create new category
   - Edit category details
   - Delete category (if no reports use it)
   - Assign color for visual identification

**Page**: [Categories](src/pages/Admin/Sections/Categories.jsx)

**Database Tables Used**:
- `categories` (CRUD operations)

**Category Examples**:
- Plumbing (blue)
- Electrical (yellow)
- HVAC (green)
- Carpentry (purple)
- Painting (red)

---

#### 5. System Settings
**Purpose**: Configure application-wide settings

**Available Settings**:
- Facility name and location
- Contact information
- Priority level definitions
- Notification preferences
- System notifications on/off

**Page**: [Settings](src/pages/Admin/Sections/Settings.jsx)

**Potential Database**:
- `settings` table (future enhancement)

---

#### 6. Dashboard Analytics (Future Enhancement)

**Potential Metrics**:
- Total reports submitted
- Reports by status (pie chart)
- Reports by category
- Average completion time
- Technician workload distribution
- Reports by priority level

**Components to Add**:
- Chart libraries (Chart.js, Recharts)
- Summary statistics cards
- Trend analysis

---

## Complete User Workflows

### Workflow 1: Reporter Submits & Tracks Report

```
1. Reporter logs in
   └─ System loads ReporterDashboard
   
2. Reporter clicks "Submit Report"
   └─ Navigates to SubmitReport page
   
3. Reporter fills form:
   ├─ Selects category (e.g., "Plumbing")
   ├─ Sets priority (e.g., "High")
   ├─ Enters title and description
   ├─ Uploads photo (optional)
   └─ Clicks Submit
   
4. System processes:
   ├─ Uploads image to Supabase Storage
   ├─ Creates report in database (status: pending)
   ├─ Creates notification for all admins
   └─ Shows success message
   
5. Reporter checks "My Reports"
   └─ New report appears with "Pending" status
   
6. Admin reviews and assigns:
   ├─ Opens report
   ├─ Selects technician
   └─ Creates task
   
7. Report status changes to "Assigned"
   └─ Reporter receives notification
   
8. Technician starts work:
   ├─ Status changes to "In Progress"
   └─ Reporter notified
   
9. Technician completes:
   ├─ Status changes to "Completed"
   ├─ Reporter receives notification
   └─ Report moves to archive/completed section
```

---

### Workflow 2: Admin Assigns Task to Technician

```
1. Admin logs in
   └─ AdminDashboard shows all reports
   
2. Admin filters for "Pending" reports
   └─ Sees unassigned maintenance requests
   
3. Admin clicks on a report
   └─ Views full details and photo
   
4. Admin navigates to "Review Tasks"
   └─ Report appears in review queue
   
5. Admin selects technician:
   ├─ Clicks technician dropdown
   ├─ Sees available technicians
   └─ Selects appropriate person for task type
   
6. Admin adds notes:
   ├─ "Check plumbing under sink"
   ├─ "Replace if necessary"
   └─ "Contact reporter for access"
   
7. Admin clicks "Assign"
   └─ System creates task record
   
8. System updates:
   ├─ Report status → "Assigned"
   ├─ Task status → "Assigned"
   ├─ Notification sent to technician
   └─ Notification sent to reporter
   
9. Technician sees notification:
   └─ "New task assigned: Broken Classroom Light"
   
10. Technician opens task:
    ├─ Views report details
    ├─ Reads admin notes
    └─ Sees reporter contact info
    
11. Technician updates status:
    ├─ Clicks "Start Work" → status: "In Progress"
    ├─ Performs maintenance
    ├─ Clicks "Mark Complete" → status: "Completed"
    └─ System updates report status too
    
12. Reporter is notified:
    └─ "Your maintenance request has been completed"
```

---

### Workflow 3: Technician Completes Multiple Tasks

```
1. Technician logs in
   └─ Sees "Assigned Tasks" count
   
2. Technician views dashboard:
   ├─ Assigned: 5 tasks (red badge)
   ├─ In Progress: 2 tasks (yellow badge)
   └─ Completed: 12 tasks (green badge)
   
3. Technician clicks "Assigned Tasks"
   └─ Sees 5 newly assigned tasks
   
4. For each task:
   a) Clicks task to open details
   b) Reviews report description and photo
   c) Reads admin notes
   d) Checks location/room number
   e) Clicks "Start Work"
      └─ Task moves to "In Progress"
   
5. Throughout the day:
   ├─ Technician works on tasks
   ├─ Can switch between tasks
   └─ Each task shows progress in sidebar
   
6. When task is complete:
   a) Technician clicks "Mark Complete"
   b) System asks for completion notes (optional)
   c) Task status → "Completed"
   d) Report status → "Completed"
   e) System notifies reporter
   f) Task moves to "Completed" section
   
7. At end of day:
   └─ Technician views "Completed" section
       ├─ Shows 15 tasks completed today
       ├─ Can view completion notes
       └─ Can print/export report (future)
```

---

## Status Transitions

### Report Status Flow

```
┌──────────┐
│ Pending  │  ← New report submitted, awaiting admin review
└────┬─────┘
     │ (Admin assigns task)
     ▼
┌──────────┐
│Assigned  │  ← Technician selected, task created
└────┬─────┘
     │ (Technician starts work)
     ▼
┌─────────────┐
│In Progress  │  ← Technician is actively working
└────┬────────┘
     │ (Technician completes)
     ▼
┌──────────────┐
│ Completed    │  ← Task finished, reporter notified
└──────────────┘
```

### Task Status Flow

```
┌──────────┐
│Assigned  │  ← Just created by admin
└────┬─────┘
     │ (Technician clicks start)
     ▼
┌─────────────┐
│In Progress  │  ← Being worked on
└────┬────────┘
     │ (Work complete)
     ▼
┌──────────────┐
│ Completed    │  ← Finished
└──────────────┘
```

---

## Notification Rules

### When Notifications Are Created

**Reporter Notifications**:
- Report submitted → Confirmation
- Task assigned → "Technician X assigned"
- Task started → "Work has begun"
- Task completed → "Maintenance complete"

**Technician Notifications**:
- Task assigned → "New task assigned"
- Admin message → "Administrator note"

**Admin Notifications**:
- New report → "New report submitted: [Title]"
- High priority report → "Urgent report: [Title]"
- Task overdue → "Task [ID] overdue" (future)

---

## Role-Based Permissions Matrix

| Feature | Reporter | Technician | Admin |
|---------|----------|-----------|-------|
| Submit Report | ✅ | ❌ | ❌ |
| View Own Reports | ✅ | ❌ | ❌ |
| View All Reports | ❌ | ❌ | ✅ |
| View Own Tasks | ❌ | ✅ | ❌ |
| View All Tasks | ❌ | ❌ | ✅ |
| Update Task Status | ❌ | ✅* | ✅ |
| Assign Tasks | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |
| Manage Categories | ❌ | ❌ | ✅ |
| System Settings | ❌ | ❌ | ✅ |
| View Analytics | ❌ | ❌ | ✅ |

*Only own tasks

---

**Last Updated**: February 2026
