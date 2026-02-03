# API & Integration Documentation

## Supabase Client Configuration

The Supabase client is initialized in [src/supabaseClient.js](src/supabaseClient.js) with your project credentials from the `.env` file.

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Authentication API

### Sign Up New User

**Function:** `signUpNewUser(name, email, password)`

```javascript
import { useAuth } from '../context/AuthContext'

const { signUpNewUser } = useAuth()

const result = await signUpNewUser('John Doe', 'john@example.com', 'password123')

if (result.success) {
  // User created successfully
  console.log('Signup successful')
} else {
  // Handle error
  console.error(result.error)
}
```

**Returns:**
- Success: `{ success: true }`
- Error: `{ success: false, error: {...} }`

**Supabase Operations:**
1. Creates auth user with `supabase.auth.signUp()`
2. Inserts profile record with user metadata
3. Returns success status

### Sign In User

**Function:** `signInUser(email, password)`

```javascript
const { signInUser } = useAuth()

const result = await signInUser('john@example.com', 'password123')

if (result.success) {
  // Login successful, user state is updated
  console.log('Welcome:', result.user)
} else {
  // Handle error
  console.error(result.error)
}
```

**Returns:**
- Success: `{ success: true, user: {...} }`
- Error: `{ success: false, error: 'error message' }`

**Sets Context State:**
- `session`: User's current session
- `user`: User object with metadata

### Get Current Session

**Function:** `fetchSession()`

```javascript
const { fetchSession } = useAuth()

await fetchSession()
// Updates session state in context
```

Retrieves the current user session from Supabase.

### Sign Out User

Sign out the current user:

```javascript
import { supabase } from '../supabaseClient'

await supabase.auth.signOut()
// Clear context state and redirect to login
```

## Database Operations

All database operations use the Supabase JavaScript client. Examples below show common patterns.

### Read Operations

#### Get All Reports

```javascript
const { data, error } = await supabase
  .from('reports')
  .select('*')

if (error) {
  console.error('Error fetching reports:', error)
} else {
  console.log('Reports:', data)
}
```

#### Get Reports with Relations

```javascript
const { data, error } = await supabase
  .from('reports')
  .select(`
    *,
    profiles(full_name, email),
    categories(name, color),
    tasks(status)
  `)
  .eq('reporter_id', reporterId)

if (!error) {
  console.log('Reports with related data:', data)
}
```

#### Filter Reports by Status

```javascript
const { data, error } = await supabase
  .from('reports')
  .select('*')
  .eq('status', 'pending')
  .order('created_at', { ascending: false })

// Returns recent pending reports first
```

#### Get User Notifications

```javascript
const { data, error } = await supabase
  .from('notifications')
  .select('*')
  .eq('user_id', userId)
  .eq('is_read', false)
  .order('created_at', { ascending: false })

// Returns unread notifications
```

### Create Operations

#### Submit New Report

```javascript
const { data, error } = await supabase
  .from('reports')
  .insert([
    {
      reporter_id: reporterId,
      title: 'Broken Light Fixture',
      description: 'Light in room 101 is flickering',
      category_id: categoryId,
      priority: 'high',
      status: 'pending',
      location: 'Room 101',
      image_url: imageUrl
    }
  ])
  .select()

if (!error) {
  console.log('Report created:', data[0])
  // Create notification for admins
  await createNotification('report_submitted', `New report: ${data[0].title}`)
}
```

#### Assign Task to Technician

```javascript
const { data, error } = await supabase
  .from('tasks')
  .insert([
    {
      report_id: reportId,
      technician_id: technicianId,
      status: 'assigned',
      notes: 'Please inspect and repair light fixture'
    }
  ])
  .select()

if (!error) {
  // Update report status
  await supabase
    .from('reports')
    .update({ status: 'assigned' })
    .eq('id', reportId)

  // Notify technician
  await createNotification('task_assigned', `New task assigned to you`, reportId)
}
```

#### Create Notification

```javascript
const { data, error } = await supabase
  .from('notifications')
  .insert([
    {
      user_id: userId,
      type: 'report_status',
      title: 'Report Status Updated',
      message: 'Your report has been assigned to a technician',
      related_id: reportId
    }
  ])
```

### Update Operations

#### Update Report Status

```javascript
const { data, error } = await supabase
  .from('reports')
  .update({
    status: 'in_progress',
    updated_at: new Date().toISOString()
  })
  .eq('id', reportId)
  .select()

if (!error) {
  console.log('Report updated:', data[0])
}
```

#### Update Task Status

```javascript
const { data, error } = await supabase
  .from('tasks')
  .update({
    status: 'completed',
    completed_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  })
  .eq('id', taskId)
  .select()

if (!error) {
  // Update related report
  await supabase
    .from('reports')
    .update({ status: 'completed' })
    .eq('id', data[0].report_id)

  // Notify reporter
  const task = data[0]
  const report = await getReport(task.report_id)
  await createNotification(
    'report_completed',
    `Your report has been completed`,
    report.reporter_id
  )
}
```

#### Mark Notification as Read

```javascript
const { error } = await supabase
  .from('notifications')
  .update({ is_read: true })
  .eq('id', notificationId)
```

### Delete Operations

#### Delete Report

```javascript
const { error } = await supabase
  .from('reports')
  .delete()
  .eq('id', reportId)

if (!error) {
  console.log('Report deleted')
}
```

**Note:** Deleting a report cascades to delete associated tasks due to the foreign key constraint.

## File Upload API

### Upload Report Image

Using React Dropzone with Supabase storage:

```javascript
import { supabase } from '../supabaseClient'

const uploadImage = async (file) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random()}.${fileExt}`
  const filePath = `report-images/${fileName}`

  const { error } = await supabase.storage
    .from('report-images')
    .upload(filePath, file)

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  // Get public URL
  const { data } = supabase.storage
    .from('report-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}
```

### Delete Image

```javascript
const deleteImage = async (imageUrl) => {
  // Extract file path from URL
  const filePath = imageUrl.split('/report-images/')[1]

  const { error } = await supabase.storage
    .from('report-images')
    .remove([`report-images/${filePath}`])

  if (error) {
    console.error('Delete error:', error)
  }
}
```

## Real-time Subscriptions

### Listen for New Reports (Admin)

```javascript
import { useEffect } from 'react'
import { supabase } from '../supabaseClient'

useEffect(() => {
  const subscription = supabase
    .from('reports')
    .on('*', (payload) => {
      console.log('Report event:', payload)
      // Handle new report, update, or delete
      if (payload.eventType === 'INSERT') {
        // Add new report to list
      }
    })
    .subscribe()

  return () => {
    subscription.unsubscribe()
  }
}, [])
```

### Listen for Task Updates (Technician)

```javascript
useEffect(() => {
  const subscription = supabase
    .from('tasks')
    .on('UPDATE', (payload) => {
      if (payload.new.technician_id === currentUserId) {
        // Task assigned to me
        setTasks([...tasks, payload.new])
      }
    })
    .subscribe()

  return () => subscription.unsubscribe()
}, [])
```

### Listen for Notifications

```javascript
useEffect(() => {
  const subscription = supabase
    .from('notifications')
    .on('INSERT', (payload) => {
      if (payload.new.user_id === currentUserId) {
        // New notification for me
        showNotification(payload.new)
      }
    })
    .subscribe()

  return () => subscription.unsubscribe()
}, [])
```

## Query Patterns

### Pagination

```javascript
const pageSize = 10
const page = 1

const { data, error } = await supabase
  .from('reports')
  .select('*', { count: 'exact' })
  .range((page - 1) * pageSize, page * pageSize - 1)
  .order('created_at', { ascending: false })

console.log('Total reports:', data?.length)
```

### Filtering

```javascript
const { data, error } = await supabase
  .from('reports')
  .select('*')
  .eq('status', 'pending')
  .gte('created_at', startDate)
  .lte('created_at', endDate)
```

### Aggregation

```javascript
// Count by status
const { data, error } = await supabase
  .from('reports')
  .select('status', { count: 'exact' })
  .group_by('status')
```

## Error Handling

All database operations return error objects:

```javascript
const { data, error } = await supabase
  .from('reports')
  .select('*')

if (error) {
  console.error('Error code:', error.code)
  console.error('Error message:', error.message)
  
  // Handle specific errors
  if (error.code === 'PGRST301') {
    // Not authenticated
  } else if (error.code === 'PGRST204') {
    // No data found
  } else if (error.code === 'PGRST100') {
    // Parse error
  }
}
```

## Best Practices

### 1. **Query Optimization**
- Only select needed columns
- Use filters to reduce data transfer
- Implement pagination for large datasets

### 2. **Error Handling**
- Always check for errors
- Provide user-friendly messages
- Log errors for debugging

### 3. **Data Validation**
- Validate data before insertion
- Use TypeScript for type safety
- Implement form validation

### 4. **Security**
- Use environment variables for secrets
- Implement RLS policies
- Validate user permissions before operations
- Never expose sensitive data in client

### 5. **Performance**
- Cache frequently accessed data
- Use real-time subscriptions for live updates
- Batch operations when possible
- Implement pagination

## Common API Workflows

### Complete Report Submission Flow

```javascript
async function submitReport(formData) {
  try {
    // 1. Upload image
    const imageUrl = await uploadImage(formData.image)
    
    // 2. Create report
    const { data: report } = await supabase
      .from('reports')
      .insert([{
        reporter_id: currentUserId,
        title: formData.title,
        description: formData.description,
        category_id: formData.categoryId,
        priority: formData.priority,
        status: 'pending',
        image_url: imageUrl
      }])
      .select()
    
    // 3. Notify admins
    const { data: admins } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
    
    for (const admin of admins) {
      await createNotification(
        admin.id,
        'New Report Submitted',
        `A new maintenance report has been submitted: ${formData.title}`
      )
    }
    
    return report[0]
  } catch (error) {
    console.error('Report submission failed:', error)
    throw error
  }
}
```

### Complete Task Assignment Flow

```javascript
async function assignTaskToTechnician(reportId, technicianId, notes) {
  try {
    // 1. Create task
    const { data: task } = await supabase
      .from('tasks')
      .insert([{
        report_id: reportId,
        technician_id: technicianId,
        status: 'assigned',
        notes: notes
      }])
      .select()
    
    // 2. Update report status
    await supabase
      .from('reports')
      .update({ status: 'assigned' })
      .eq('id', reportId)
    
    // 3. Notify technician
    await createNotification(
      technicianId,
      'New Task Assigned',
      `You have been assigned a new maintenance task`
    )
    
    return task[0]
  } catch (error) {
    console.error('Task assignment failed:', error)
    throw error
  }
}
```

---

**Last Updated**: February 2026
