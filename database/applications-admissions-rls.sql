-- Create job_applications table if it doesn't exist
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  cover_letter TEXT NOT NULL,
  resume_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes on job_id for faster queries
CREATE INDEX IF NOT EXISTS job_applications_job_id_idx ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS job_applications_status_idx ON job_applications(status);

-- Enable RLS on job_applications
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow full access to authenticated users for job_applications" ON job_applications;
DROP POLICY IF EXISTS "Allow public to submit job applications" ON job_applications;

-- Create fresh policies
CREATE POLICY "Allow full access to authenticated users for job_applications"
ON job_applications
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public to submit job applications"
ON job_applications
FOR INSERT
WITH CHECK (true);

-- Update job_applications RLS for jobs table
DROP POLICY IF EXISTS "Allow public read access to active jobs" ON jobs;
DROP POLICY IF EXISTS "Allow full access to authenticated users for jobs" ON jobs;

CREATE POLICY "Allow public read access to active jobs"
ON jobs
FOR SELECT
USING (is_active = true);

CREATE POLICY "Allow full access to authenticated users for jobs"
ON jobs
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Update RLS for admissions table
DROP POLICY IF EXISTS "Allow public to submit admissions" ON admissions;
DROP POLICY IF EXISTS "Allow full access to authenticated users for admissions" ON admissions;

ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to submit admissions"
ON admissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow full access to authenticated users for admissions"
ON admissions
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
