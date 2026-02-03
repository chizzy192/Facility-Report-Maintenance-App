# Setup & Database Documentation

## Initial Setup Guide

### Prerequisites

Before you start, ensure you have:
- Node.js 16+ and npm installed
- A GitHub account (optional, for version control)
- A Supabase account (create free at [supabase.com](https://supabase.com))
- A code editor (VS Code recommended)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Facility-Report-Maintenance-App
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages defined in `package.json`.

### Step 3: Set Up Supabase Project

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Choose your organization and enter project details
4. Select a region close to your users
5. Set a strong database password
6. Wait for the project to be created (5-10 minutes)

#### Get Your Credentials

1. In Supabase dashboard, go to "Settings" → "API"
2. Copy your:
   - **Project URL** (starts with https://...supabase.co)
   - **Anon Key** (public key for client-side)

### Step 4: Configure Environment Variables

Create a `.env` file in the project root:

```bash
touch .env
```

Add the following content:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**⚠️ Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.

### Step 5: Create Database Tables

In the Supabase dashboard, go to the SQL Editor and run the following SQL scripts:

#### Create `profiles` Table

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'reporter',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX profiles_user_id_idx ON profiles(user_id);
CREATE INDEX profiles_role_idx ON profiles(role);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);
```

#### Create `categories` Table

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index
CREATE INDEX categories_name_idx ON categories(name);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read categories
CREATE POLICY "Everyone can read categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- Only admins can create/update/delete categories
CREATE POLICY "Only admins can modify categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.user_id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

#### Create `reports` Table

```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'pending',
  location TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX reports_reporter_id_idx ON reports(reporter_id);
CREATE INDEX reports_status_idx ON reports(status);
CREATE INDEX reports_category_id_idx ON reports(category_id);
CREATE INDEX reports_created_at_idx ON reports(created_at DESC);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Reporters can read their own reports
CREATE POLICY "Reporters can read own reports"
  ON reports FOR SELECT
  USING (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = reporter_id)
    OR EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Reporters can create reports
CREATE POLICY "Reporters can create reports"
  ON reports FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = reporter_id)
    AND EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'reporter')
  );

-- Reporters can update their own reports
CREATE POLICY "Reporters can update own reports"
  ON reports FOR UPDATE
  USING (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = reporter_id)
  );

-- Admins can read all reports
CREATE POLICY "Admins can read all reports"
  ON reports FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin'));

-- Admins can update reports
CREATE POLICY "Admins can update reports"
  ON reports FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin'));
```

#### Create `tasks` Table

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  technician_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'assigned',
  notes TEXT,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX tasks_technician_id_idx ON tasks(technician_id);
CREATE INDEX tasks_report_id_idx ON tasks(report_id);
CREATE INDEX tasks_status_idx ON tasks(status);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Technicians can read their assigned tasks
CREATE POLICY "Technicians can read assigned tasks"
  ON tasks FOR SELECT
  USING (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = technician_id)
    OR EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Technicians can update their tasks
CREATE POLICY "Technicians can update assigned tasks"
  ON tasks FOR UPDATE
  USING (
    auth.uid() = (SELECT user_id FROM profiles WHERE id = technician_id)
  );

-- Only admins can create/delete tasks
CREATE POLICY "Only admins can manage tasks"
  ON tasks FOR INSERT, DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin'));
```

#### Create `notifications` Table

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX notifications_user_id_idx ON notifications(user_id);
CREATE INDEX notifications_created_at_idx ON notifications(created_at DESC);
CREATE INDEX notifications_is_read_idx ON notifications(is_read);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own notifications
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = user_id));

-- Users can update their own notifications
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = (SELECT user_id FROM profiles WHERE id = user_id));
```

### Step 6: Set Up Storage Bucket

In Supabase dashboard:

1. Go to "Storage" → "Buckets"
2. Click "New Bucket"
3. Name it: `report-images`
4. Make it **Public** (so images can be viewed)
5. Click "Create Bucket"

#### Set Up Storage Policies

```sql
-- Allow authenticated users to upload
CREATE POLICY "Users can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'report-images'
    AND auth.role() = 'authenticated'
  );

-- Allow anyone to read/view images
CREATE POLICY "Anyone can read images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'report-images');

-- Users can delete their own images
CREATE POLICY "Users can delete own images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'report-images'
    AND auth.uid()::text = owner
  );
```

### Step 7: Verify Setup

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. You should see the landing page.

## Database Schema Details

### Column Constraints & Validation

#### Priority Levels
- `low` - Non-urgent maintenance
- `medium` - Standard maintenance (default)
- `high` - Urgent maintenance

#### Report Status Values
- `pending` - Awaiting admin review
- `assigned` - Task created for technician
- `in_progress` - Technician working on it
- `completed` - Task finished
- `on_hold` - Suspended

#### Task Status Values
- `assigned` - Just assigned, not started
- `in_progress` - Technician is working
- `completed` - Task finished

#### User Roles
- `reporter` - Facility users submitting reports
- `technician` - Maintenance workers
- `admin` - System administrators

### Indexes for Performance

Indexes are created on frequently queried columns:
- `profiles.user_id` - Fast authentication lookups
- `reports.reporter_id` - Quick report filtering
- `reports.status` - Status-based filtering
- `tasks.technician_id` - Task assignments
- `notifications.user_id` - Notification retrieval

## Sample Data (Optional)

To test the application with sample data, run this SQL:

```sql
-- Insert test users (requires manual creation in Auth)
-- After creating users in Auth, insert profiles:

INSERT INTO profiles (user_id, full_name, email, role) VALUES
  ('uuid-of-reporter', 'John Reporter', 'reporter@example.com', 'reporter'),
  ('uuid-of-technician', 'Jane Technician', 'technician@example.com', 'technician'),
  ('uuid-of-admin', 'Admin User', 'admin@example.com', 'admin');

-- Insert sample categories
INSERT INTO categories (name, description, color) VALUES
  ('Plumbing', 'Water and drainage issues', '#3B82F6'),
  ('Electrical', 'Power and lighting issues', '#F59E0B'),
  ('HVAC', 'Heating and cooling issues', '#10B981'),
  ('Carpentry', 'Structural and door issues', '#8B5CF6');

-- Insert sample report (adjust profile IDs as needed)
INSERT INTO reports (reporter_id, title, description, category_id, priority, status) VALUES
  (
    'profile-id-of-reporter',
    'Broken Classroom Light',
    'Fluorescent light in Room 101 is flickering and needs replacement',
    'category-id-of-electrical',
    'high',
    'pending'
  );
```

## Authentication Triggers

### Create User Profile on Signup

In Supabase, set up a trigger to automatically create a profile when a user signs up:

1. Go to SQL Editor
2. Create a new query with this function:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email, role)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email,
    'reporter'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

This automatically creates a profile entry when users sign up.

## Troubleshooting Setup

### Database Connection Errors
- **Check**: Verify `.env` file has correct Supabase URL and key
- **Check**: Ensure Supabase project is running
- **Check**: Verify network connectivity

### Authentication Errors
- **Check**: User exists in Supabase Auth
- **Check**: User has profile entry in `profiles` table
- **Check**: Role is correctly set ('reporter', 'technician', or 'admin')

### RLS (Row Level Security) Errors
- **Solution**: Verify policies are correctly created
- **Solution**: Ensure authenticated users are testing (not anonymous)
- **Solution**: Check user role in profiles table

### File Upload Errors
- **Check**: Storage bucket is created and public
- **Check**: User has INSERT permissions on storage
- **Check**: File size is within limits

---

**Last Updated**: February 2026
