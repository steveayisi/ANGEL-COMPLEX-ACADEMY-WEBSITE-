-- Fix RLS for jobs table to allow public reading of active jobs

-- Enable RLS on jobs table (if not already enabled)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active jobs (for public website)
CREATE POLICY "Allow public read access to active jobs"
ON jobs
FOR SELECT
USING (is_active = true);

-- Allow authenticated users (admins) to do everything
CREATE POLICY "Allow full access to authenticated users"
ON jobs
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
