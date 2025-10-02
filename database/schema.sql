-- Angels Complex Academy Database Schema
-- Run this in your Supabase SQL Editor

-- Create the admissions table
CREATE TABLE IF NOT EXISTS admissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Parent/Guardian Information
    parent_name TEXT NOT NULL,
    parent_occupation TEXT,
    parent_phone TEXT NOT NULL,
    parent_email TEXT NOT NULL,
    
    -- Child Information
    child_name TEXT NOT NULL,
    child_gender TEXT NOT NULL CHECK (child_gender IN ('male', 'female')),
    child_age INTEGER NOT NULL CHECK (child_age >= 0 AND child_age <= 18),
    desired_level TEXT NOT NULL,
    previous_school TEXT,
    
    -- Emergency Contact
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    
    -- Additional Information
    additional_message TEXT,
    
    -- Application Status
    application_status TEXT DEFAULT 'pending' CHECK (application_status IN ('pending', 'under_review', 'accepted', 'rejected')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_admissions_email ON admissions(parent_email);

-- Create an index on application status
CREATE INDEX IF NOT EXISTS idx_admissions_status ON admissions(application_status);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_admissions_created_at ON admissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert admissions" ON admissions;
DROP POLICY IF EXISTS "Admins can view all admissions" ON admissions;
DROP POLICY IF EXISTS "Public can insert admissions" ON admissions;
DROP POLICY IF EXISTS "Public can view admissions" ON admissions;

-- Create a policy to allow public inserts (for application form)
CREATE POLICY "Public can insert admissions" ON admissions
    FOR INSERT 
    TO public
    WITH CHECK (true);

-- Create a policy to allow public viewing (for now - can be restricted later)
CREATE POLICY "Public can view admissions" ON admissions
    FOR SELECT
    TO public
    USING (true);

-- For production, you might want to restrict SELECT to authenticated users only:
-- CREATE POLICY "Authenticated can view admissions" ON admissions
--     FOR SELECT
--     TO authenticated
--     USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_admissions_updated_at 
    BEFORE UPDATE ON admissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
-- INSERT INTO admissions (
--     parent_name, parent_occupation, parent_phone, parent_email,
--     child_name, child_gender, child_age, desired_level,
--     emergency_contact_name, emergency_contact_phone,
--     additional_message
-- ) VALUES (
--     'Mr. John Mensah', 'Engineer', '+233241234567', 'john.mensah@email.com',
--     'Mary Mensah', 'female', 5, 'kg1',
--     'Grandmother Akosua', '+233247654321',
--     'Mary is very active and loves drawing.'
-- );