# Staff Management System Setup

## Overview
This system allows the admin to manage staff members dynamically through a web interface instead of hardcoding them in the source code.

## What Was Done

### 1. Database Schema (`database/staff.sql`)
Created a complete database table with the following fields:
- Basic Info: `name`, `title`, `education`, `experience`, `specialization`
- Additional Info: `bio`, `achievements[]` (array), `email`, `phone`
- Image: `image_url`
- Flags: `is_key_staff`, `is_proprietress`, `is_active`
- Ordering: `display_order`
- Timestamps: `created_at`, `updated_at`

Includes:
- Row Level Security (RLS) policies
- Public can read active staff
- Authenticated users have full access
- Indexes for performance
- Automatic `updated_at` trigger

### 2. Database Service Functions (`src/lib/database.ts`)
Added Staff interface and 8 new methods:
- `createStaff()` - Add new staff member
- `getAllStaff()` - Get all staff (admin view)
- `getActiveStaff()` - Get active staff only
- `getProprietress()` - Get the proprietress
- `getKeyStaff()` - Get key staff members
- `updateStaff()` - Update staff details
- `deleteStaff()` - Remove staff member
- `toggleStaffStatus()` - Activate/deactivate staff

### 3. Admin Interface (`src/pages/AdminStaff.tsx`)
Complete admin dashboard with:
- **List View**: Table showing all staff with images, roles, status
- **Add/Edit Form**: Full form with all fields including:
  - Image upload with preview
  - Multiple text fields
  - Achievements (one per line)
  - Checkboxes for roles (Key Staff, Proprietress, Active)
  - Display order control
- **Actions**:
  - Edit staff member
  - Delete staff member
  - Toggle active/inactive status
  - Reorder staff (move up/down)
- **Responsive Design**: Works on mobile and desktop

### 4. Public Display (`src/pages/Staff.tsx`)
Updated to fetch from database instead of hardcoded data:
- Shows loading state while fetching
- Displays proprietress separately
- Shows key staff in grid
- Displays images if available
- Shows all achievements and bio dynamically

### 5. Navigation
Added "Staff Management" tab to all admin pages:
- AdminJobs
- AdminApplications
- AdminAdmissions
- AdminUpdates
- AdminAnnouncements
- AdminContactMessages

### 6. Routing (`src/App.tsx`)
Added route: `/admin/staff` → AdminStaff component

## Deployment Steps

### Step 1: Run Database Migration
1. Log in to your Supabase dashboard: https://supabase.com/dashboard
2. Go to your project: Angels Academy
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy the entire contents of `database/staff.sql`
6. Paste into the SQL editor
7. Click "Run" or press Ctrl+Enter

Expected result: "Success. No rows returned"

### Step 2: Deploy Code Changes
Run these commands in your terminal:

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "Add dynamic staff management system with admin interface"

# Push to GitHub
git push origin main
```

### Step 3: Verify Deployment
1. Wait for Netlify to rebuild (1-2 minutes)
2. Visit: https://angelscomplexacademy.org/admin/login
3. Log in with admin credentials
4. Click "Staff Management" tab

### Step 4: Add Your First Staff Member
1. Click "Add New Staff Member"
2. Fill in the form:
   - **Full Name**: Mrs. Regina Opoku Ansah
   - **Job Title**: Proprietress
   - **Education**: M.Ed. Educational Leadership, University of Ghana
   - **Experience**: 20 years in education
   - **Specialization**: Educational Leadership & Curriculum Development
   - **Display Order**: 0 (shows first)
   - **Bio**: (Optional) Add detailed biography
   - **Achievements**: (One per line)
     ```
     Outstanding Educator Award 2020
     Best School Administrator 2019
     Educational Innovation Recognition 2018
     ```
   - **Email**: (Optional)
   - **Phone**: (Optional)
   - **Upload Image**: Select profile photo
   - **Checkboxes**: 
     - ✅ Key Staff Member
     - ✅ Proprietress
     - ✅ Active
3. Click "Add Staff Member"

### Step 5: Add More Staff
Repeat for other staff members (e.g., Head Teacher, Bursar)
- Set Display Order to 1, 2, 3, etc. for proper ordering
- Mark as "Key Staff Member" if they should appear prominently
- Only one person should be marked as "Proprietress"

## Features

### Admin Features
- ✅ Add new staff with complete information
- ✅ Upload profile images
- ✅ Edit existing staff details
- ✅ Delete staff members
- ✅ Reorder staff display
- ✅ Activate/deactivate staff
- ✅ Mark key staff and proprietress
- ✅ Add multiple achievements
- ✅ Full mobile responsive design

### Public Features
- ✅ Automatic display of active staff
- ✅ Proprietress shown in featured section
- ✅ Key staff shown in grid layout
- ✅ Profile images displayed
- ✅ All details visible (education, experience, bio, achievements)
- ✅ Loading states for better UX

## Database Table Structure

```sql
staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  education TEXT NOT NULL,
  experience TEXT NOT NULL,
  specialization TEXT NOT NULL,
  bio TEXT,
  achievements TEXT[],  -- Array of achievement strings
  email TEXT,
  phone TEXT,
  image_url TEXT,
  is_key_staff BOOLEAN NOT NULL DEFAULT false,
  is_proprietress BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
)
```

## Security (RLS Policies)

1. **Public Read**: Anonymous users can view active staff
   - Only `is_active = true` records visible
   
2. **Admin Full Access**: Authenticated users can:
   - Create new staff
   - Read all staff (including inactive)
   - Update staff details
   - Delete staff

## Notes

- **Image Storage**: Staff images are stored in Supabase Storage bucket `images/staff/`
- **Display Order**: Lower numbers appear first (0, 1, 2, ...)
- **Proprietress**: Only one person should have `is_proprietress = true`
- **Key Staff**: Multiple people can be marked as key staff
- **Achievements**: Entered as one per line in the form, stored as TEXT[] array
- **Active Status**: Inactive staff don't show on public pages but remain in admin view

## Troubleshooting

### SQL Error When Running Migration
- Make sure you're connected to the correct database
- Check if the `staff` table already exists (drop it first if needed)
- Ensure UUID extension is enabled: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

### Images Not Uploading
- Check Supabase Storage bucket exists: `images`
- Verify bucket is public
- Check file size limits

### Staff Not Showing on Public Page
- Ensure `is_active = true` in the database
- Check browser console for errors
- Verify RLS policies are enabled

### Navigation Not Showing Staff Management
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check if code was deployed successfully

## Future Enhancements (Optional)

- Bulk import staff from CSV
- Staff performance tracking
- Staff schedules/timetables
- Staff attendance tracking
- Department/role filtering
- Advanced search and filters
