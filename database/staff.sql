-- Create staff table
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  education TEXT NOT NULL,
  experience TEXT NOT NULL,
  specialization TEXT NOT NULL,
  bio TEXT,
  achievements TEXT[], -- Array of achievements
  email TEXT,
  phone TEXT,
  image_url TEXT,
  is_key_staff BOOLEAN DEFAULT false,
  is_proprietress BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to read active staff
CREATE POLICY "Public can view active staff"
  ON staff
  FOR SELECT
  USING (is_active = true);

-- Policy: Allow authenticated users (admins) to do everything
CREATE POLICY "Authenticated users can manage all staff"
  ON staff
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create indexes for faster queries
CREATE INDEX idx_staff_active ON staff(is_active);
CREATE INDEX idx_staff_key_staff ON staff(is_key_staff);
CREATE INDEX idx_staff_proprietress ON staff(is_proprietress);
CREATE INDEX idx_staff_display_order ON staff(display_order);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_staff_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_staff_updated_at
  BEFORE UPDATE ON staff
  FOR EACH ROW
  EXECUTE FUNCTION update_staff_updated_at();
