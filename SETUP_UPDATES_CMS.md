# News & Updates CMS - Setup Instructions

## 1. Create Database Table in Supabase

1. Log in to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the SQL from `database/news_updates.sql`
4. Click "Run" to execute the SQL

The SQL will:
- Create the `news_updates` table
- Set up Row Level Security policies
- Create indexes for better performance
- Add an auto-updating timestamp trigger

## 2. Test the Admin Panel

1. Log in to your admin portal at: `https://your-website.com/admin/login`
2. Navigate to "News & Updates" tab
3. Click "Add New Update" button
4. Fill in the form:
   - Title (required)
   - Date (required)
   - Author (required)
   - Category (dropdown: Achievement, Facilities, Academic, Sports, Events, Resources)
   - Excerpt (required - brief summary)
   - Content (required - full article)
   - Image (optional - upload from computer)
   - Featured Update (checkbox - mark as featured news)
   - Publish Now (checkbox - make visible on website)

5. Click "Create" to save

## 3. Managing Updates

### Creating Updates:
- Click "Add New Update"
- Fill in all required fields
- Upload an image (optional but recommended)
- Check "Featured Update" if you want it to appear as the main featured news
- Check "Publish Now" to make it visible immediately, or leave unchecked to save as draft

### Editing Updates:
- Click the edit icon (pencil) next to any update
- Modify the fields as needed
- Click "Update" to save changes

### Deleting Updates:
- Click the delete icon (trash) next to any update
- Confirm the deletion

### Status Indicators:
- **Star icon**: Indicates a featured update
- **Green badge with eye**: Published (visible on website)
- **Gray badge with eye-off**: Draft (not visible on website)

## 4. How it Works on the Website

### Featured News Section:
- Displays the most recent update marked as "Featured" and "Published"
- Shows the full excerpt and image
- Prominently displayed at the top of the Updates page

### Recent News Grid:
- Shows all published updates (not just featured)
- Sorted by date (newest first)
- Displays in a 3-column grid layout
- Each card shows: image, category badge, date, title, excerpt, and author

### Public Visibility Rules:
- Only updates marked as "Published" (is_published = true) appear on the website
- Drafts remain hidden until you publish them
- Featured updates must also be published to appear

## 5. Image Management

### Uploading Images:
1. Click "Choose File" in the image section
2. Select an image from your computer
3. Wait for upload to complete (you'll see "Uploading image...")
4. A preview will appear once uploaded
5. Image is automatically stored in Supabase Storage

### Image Requirements:
- Supported formats: JPG, PNG, GIF, WebP
- Recommended size: 1200x800 pixels
- File size: Keep under 2MB for best performance

## 6. Best Practices

### Content Guidelines:
- **Title**: Clear and concise (max 80 characters)
- **Excerpt**: 1-2 sentences summarizing the update (max 200 characters)
- **Content**: Full details of the update
- **Author**: School department or staff name
- **Category**: Choose the most relevant category
- **Date**: Use actual event/announcement date

### Publishing Workflow:
1. Create update as draft (Publish unchecked)
2. Review content and preview
3. Add/update image if needed
4. When ready, edit and check "Publish Now"

### Featured Updates:
- Only mark 1 update as featured at a time
- Choose the most important/recent news
- Update featured status regularly

## 7. Troubleshooting

### "Failed to create update" error:
- Check that all required fields are filled
- Ensure you're logged in to the admin panel
- Try refreshing the page and logging in again

### Images not uploading:
- Check internet connection
- Ensure file size is under 2MB
- Try a different image format

### Updates not showing on website:
- Verify "Publish Now" checkbox is checked
- Check that the update has is_published = true
- Clear browser cache and refresh the page

## 8. Database Structure

The `news_updates` table includes:
- `id`: Unique identifier (UUID)
- `title`: Update title
- `date`: Date of the update
- `author`: Author/department name
- `category`: Category classification
- `excerpt`: Brief summary
- `content`: Full article content
- `image_url`: URL to uploaded image
- `is_featured`: Featured status (true/false)
- `is_published`: Published status (true/false)
- `created_at`: Timestamp of creation
- `updated_at`: Timestamp of last update

## 9. Next Steps

After Updates page CMS is working, you can request to make other pages editable:
- Staff page (teacher profiles)
- Clubs page (club information)
- About page (school information)
- Contact page (contact details)
- Home page (hero content, features)

Each will follow a similar pattern with database tables and admin interfaces.
