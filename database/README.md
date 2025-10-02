# Database Setup Guide for Angels Complex Academy Website

## Prerequisites
- A Supabase account (free tier available)
- Basic understanding of SQL

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `angels-complex-academy`
   - Database Password: (create a strong password)
   - Region: Choose closest to Ghana (e.g., Europe West)
5. Click "Create new project" and wait for setup to complete

## Step 2: Set up Database Schema

1. In your Supabase dashboard, go to the "SQL Editor"
2. Create a "New query"
3. Copy and paste all the SQL from `database/schema.sql`
4. Click "Run" to execute the schema

This will create:
- `admissions` table with all necessary fields
- Proper indexes for performance
- Row Level Security (RLS) policies
- Triggers for automatic timestamps

## Step 3: Configure Environment Variables

1. In your Supabase dashboard, go to "Settings" → "API"
2. Copy your project URL and anon key
3. Update your `.env` file:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace the placeholder values with your actual Supabase credentials.

## Step 4: Test the Connection

1. Start your development server: `npm run dev`
2. Navigate to the Admissions page
3. Try submitting a test application
4. Check your Supabase dashboard → "Table Editor" → "admissions" to see the data

## Database Features

### Automatic Features
- **Timestamps**: `created_at` and `updated_at` are automatically managed
- **UUIDs**: Each admission gets a unique identifier
- **Validation**: Database enforces data types and constraints

### Security Features
- **Row Level Security**: Prevents unauthorized access
- **Input Validation**: Protects against malicious data
- **Structured Data**: Prevents SQL injection attacks

### Admin Features (Future Development)
- View all applications
- Update application status
- Search and filter applications
- Generate statistics and reports

## Monitoring and Maintenance

### View Applications
```sql
SELECT * FROM admissions ORDER BY created_at DESC;
```

### Count Applications by Status
```sql
SELECT application_status, COUNT(*) 
FROM admissions 
GROUP BY application_status;
```

### Recent Applications (Last 7 days)
```sql
SELECT * FROM admissions 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Restart your dev server after updating `.env`
   - Ensure `.env` is in the project root
   - Check for typos in variable names

2. **Database Connection Errors**
   - Verify your Supabase URL and key
   - Check if your Supabase project is active
   - Ensure RLS policies allow your operations

3. **Permission Errors**
   - Check Row Level Security policies
   - Verify the SQL schema was executed correctly
   - Ensure the `admissions` table exists

### Getting Help
- Check Supabase documentation: [docs.supabase.com](https://docs.supabase.com)
- Review the browser console for detailed error messages
- Check the Network tab in DevTools for API responses

## Security Best Practices

1. **Never commit `.env` files** - they're already in `.gitignore`
2. **Use Row Level Security** - already configured in schema
3. **Validate input** - both client-side and database level
4. **Monitor usage** - check Supabase dashboard regularly
5. **Backup data** - export important data regularly

## Future Enhancements

1. **Admin Dashboard** - Manage applications
2. **Email Notifications** - Alert on new applications
3. **File Uploads** - Support document attachments
4. **Payment Integration** - Handle application fees
5. **SMS Notifications** - Send status updates
6. **Reporting** - Generate admission reports