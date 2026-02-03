# Development Guide

## Getting Started with Development

### Prerequisites

- Node.js 16 or higher
- npm 8 or higher
- Supabase project with database set up (see [SETUP.md](SETUP.md))
- `.env` file with Supabase credentials

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

The development server supports:
- **Hot Module Replacement (HMR)**: Changes are reflected instantly
- **Fast Refresh**: React component changes without losing state
- **Error Overlay**: Displays errors directly in the browser

## Project Structure Overview

### Key Directories

```
src/
├── components/      # Reusable UI components
├── context/         # React Context (authentication, state)
├── pages/          # Page components organized by role
├── assets/         # Images and icons
├── App.jsx         # Root component
├── main.jsx        # Entry point
├── router.jsx      # Route definitions
├── index.css       # Global styles
└── supabaseClient.js # Supabase initialization
```

### Component Naming Convention

- Page components: `PascalCase` (e.g., `ReporterDashboard.jsx`)
- UI components: `PascalCase` (e.g., `FormInput.jsx`)
- Utility files: `camelCase` (e.g., `supabaseClient.js`)
- Context files: `PascalCase` (e.g., `AuthContext.jsx`)

## Working with Components

### Creating a New Component

```jsx
// src/components/MyComponent.jsx
import React from 'react'

export default function MyComponent({ title, children }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </div>
  )
}
```

### Using Existing Components

**FormInput** - Text inputs with validation:
```jsx
import FormInput from '../components/FormInput'

<FormInput
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
```

**Buttons** - Action buttons:
```jsx
import Buttons from '../components/Buttons'

<button className="bg-primary text-white px-4 py-2 rounded">
  <Buttons text="Submit" />
</button>
```

**StatusBadge** - Status indicators:
```jsx
import StatusBadge from '../components/StatusBadge'

<StatusBadge status="pending" />  {/* pending, assigned, in_progress, completed */}
```

**PriorityBadge** - Priority indicators:
```jsx
import PriorityBadge from '../components/PriorityBadge'

<PriorityBadge priority="high" />  {/* low, medium, high */}
```

**CategoryDropDown** - Category selection:
```jsx
import CategoryDropDown from '../components/CategoryDropDown'

<CategoryDropDown
  value={selectedCategory}
  onChange={setSelectedCategory}
/>
```

**TechnicianDropDown** - Technician selection:
```jsx
import TechnicianDropDown from '../components/TechnicianDropDown'

<TechnicianDropDown
  value={selectedTechnician}
  onChange={setSelectedTechnician}
/>
```

## Working with State & Context

### Using Authentication Context

```jsx
import { useAuth } from '../context/AuthContext'

function MyComponent() {
  const { user, session, signInUser, signUpNewUser } = useAuth()

  return (
    <div>
      {user ? <p>Welcome, {user.email}</p> : <p>Not logged in</p>}
    </div>
  )
}
```

### Setting Up New Context

```jsx
// src/context/MyContext.jsx
import { createContext, useContext, useState } from 'react'

const MyContext = createContext()

export function MyContextProvider({ children }) {
  const [state, setState] = useState(null)

  const value = { state, setState }

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  )
}

export function useMyContext() {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContext must be used within MyContextProvider')
  }
  return context
}
```

## Database Operations

### Fetch Data

```jsx
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function MyComponent() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('status', 'pending')
          .order('created_at', { ascending: false })

        if (error) throw error
        setReports(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      {reports.map(report => (
        <div key={report.id}>{report.title}</div>
      ))}
    </div>
  )
}
```

### Insert Data

```jsx
import { supabase } from '../supabaseClient'

async function createReport(reportData) {
  const { data, error } = await supabase
    .from('reports')
    .insert([reportData])
    .select()

  if (error) {
    console.error('Insert failed:', error)
    return null
  }

  return data[0]
}
```

### Update Data

```jsx
async function updateReport(reportId, updates) {
  const { data, error } = await supabase
    .from('reports')
    .update(updates)
    .eq('id', reportId)
    .select()

  if (error) {
    console.error('Update failed:', error)
    return null
  }

  return data[0]
}
```

### Delete Data

```jsx
async function deleteReport(reportId) {
  const { error } = await supabase
    .from('reports')
    .delete()
    .eq('id', reportId)

  if (error) {
    console.error('Delete failed:', error)
    return false
  }

  return true
}
```

## Styling with Tailwind CSS

### Using Tailwind Classes

```jsx
<div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg">
  <h2 className="text-xl font-bold text-gray-900 mb-2">Title</h2>
  <p className="text-gray-600">Description</p>
</div>
```

### Responsive Design

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Custom Colors

Check [tailwind.config.js](tailwind.config.js) for custom color definitions:

```jsx
// Common custom colors
className="bg-primary"      // Brand color
className="text-primary-dark"
className="border-secondary"
className="bg-text-muted"
```

## Routing

### Route Configuration

All routes are defined in [src/router.jsx](src/router.jsx). The router uses React Router v7.

### Creating New Routes

1. Create your page component in `src/pages/`
2. Import it in `router.jsx`
3. Add the route definition:

```jsx
{
  path: '/new-page',
  element: <NewPage />
}
```

### Protected Routes

Wrap routes that need authentication:

```jsx
import ProtectedRoute from '../components/ProtectedRoute'

{
  path: '/admin',
  element: (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  )
}
```

### Navigation

```jsx
import { useNavigate } from 'react-router'

function MyComponent() {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate('/dashboard')}>
      Go to Dashboard
    </button>
  )
}
```

## Form Handling

### Simple Form with State

```jsx
import { useState } from 'react'
import FormInput from '../components/FormInput'

function MyForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validate and submit
    console.log('Submitting:', formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <FormInput
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## File Uploads

### Upload Images with Dropzone

```jsx
import { useDropzone } from 'react-dropzone'
import { supabase } from '../supabaseClient'

function ImageUploader() {
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `report-images/${fileName}`

      const { error } = await supabase.storage
        .from('report-images')
        .upload(filePath, file)

      if (error) throw error

      const { data } = supabase.storage
        .from('report-images')
        .getPublicUrl(filePath)

      console.log('Upload successful:', data.publicUrl)
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-4">
      <input {...getInputProps()} />
      <p>Drop image here or click to select</p>
    </div>
  )
}
```

## Debugging

### Browser DevTools

1. **React DevTools**: Install the React DevTools extension
2. **Network Tab**: Monitor API requests and responses
3. **Console**: Check for errors and logs

### Console Logging

```jsx
// Log state changes
useEffect(() => {
  console.log('User changed:', user)
}, [user])

// Log database responses
const { data, error } = await supabase.from('reports').select()
console.log('Database response:', { data, error })
```

### Common Issues

**Issue**: "Cannot read property 'X' of undefined"
- **Solution**: Use optional chaining: `obj?.property?.nestedProperty`

**Issue**: Component not re-rendering
- **Solution**: Ensure state is updated with a new object/array, not mutated

**Issue**: Infinite API calls
- **Solution**: Add dependencies to useEffect correctly

**Issue**: Authentication not working
- **Solution**: Check .env file has correct Supabase credentials

## Code Quality

### Running Linter

```bash
npm run lint
```

This checks code for:
- React best practices
- React Hooks rules
- Unused variables
- Improper imports

### Fixing Linter Errors

```bash
npm run lint -- --fix
```

### ESLint Configuration

View [eslint.config.js](eslint.config.js) to see or modify linting rules.

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized bundle in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally at `http://localhost:5173`

## Performance Optimization

### Code Splitting

React Router automatically code-splits pages. Lazy load components:

```jsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

<Suspense fallback={<p>Loading...</p>}>
  <HeavyComponent />
</Suspense>
```

### Memoization

```jsx
import { memo, useCallback } from 'react'

const MyComponent = memo(({ data }) => {
  const handleClick = useCallback(() => {
    // Do something
  }, [])

  return <button onClick={handleClick}>{data}</button>
})
```

### Image Optimization

- Keep images small
- Use appropriate formats (webp, jpg, png)
- Optimize before uploading

## Testing (Future Enhancement)

When adding tests, follow this structure:

```
src/
├── components/
│   ├── MyComponent.jsx
│   └── MyComponent.test.jsx
├── pages/
│   ├── MyPage.jsx
│   └── MyPage.test.jsx
```

Example test:
```jsx
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

test('renders component', () => {
  render(<MyComponent />)
  expect(screen.getByText(/content/i)).toBeInTheDocument()
})
```

## Git Workflow

### Creating a Feature Branch

```bash
git checkout -b feature/new-feature-name
```

### Making Commits

```bash
git add .
git commit -m "descriptive commit message"
```

### Pushing to Remote

```bash
git push origin feature/new-feature-name
```

### Creating Pull Request

Push your branch and create a PR on GitHub for code review.

## Deployment Preparation

Before deploying to production:

1. ✅ Run linter: `npm run lint`
2. ✅ Build successfully: `npm run build`
3. ✅ Test all user flows
4. ✅ Verify environment variables are set
5. ✅ Check database is properly migrated
6. ✅ Review all recent changes

---

**Last Updated**: February 2026
