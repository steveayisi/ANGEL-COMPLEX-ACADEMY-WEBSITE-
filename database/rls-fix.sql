-- Quick Fix for RLS Policy Issue
-- Run this in your Supabase SQL Editor to fix the submission error

-- Drop any existing policies that might be causing conflicts
DROP POLICY IF EXISTS "Anyone can insert admissions" ON admissions;
DROP POLICY IF EXISTS "Admins can view all admissions" ON admissions;
DROP POLICY IF EXISTS "Public can insert admissions" ON admissions;
DROP POLICY IF EXISTS "Public can view admissions" ON admissions;

-- Create new policies that allow public access
CREATE POLICY "Public can insert admissions" ON admissions
    FOR INSERT 
    TO public
    WITH CHECK (true);

CREATE POLICY "Public can view admissions" ON admissions
    FOR SELECT
    TO public
    USING (true);

-- Test the fix by inserting a sample record
INSERT INTO admissions (
    parent_name, 
    parent_phone, 
    parent_email,
    child_name, 
    child_gender, 
    child_age, 
    desired_level
) VALUES (
    'Test Parent Fix', 
    '+233241234567', 
    'testfix@example.com',
    'Test Child Fix', 
    'male', 
    5, 
    'kg1'
);

-- If the above INSERT works, the fix is successful
-- You can delete the test record with:
-- DELETE FROM admissions WHERE parent_name = 'Test Parent Fix';