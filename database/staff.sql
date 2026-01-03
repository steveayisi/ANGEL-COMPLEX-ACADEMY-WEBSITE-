-- Staff table schema
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  education TEXT,
  experience TEXT,
  specialization TEXT,
  bio TEXT,
  achievements TEXT[] DEFAULT '{}',
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

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_staff_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS staff_updated_at ON staff;
CREATE TRIGGER staff_updated_at
BEFORE UPDATE ON staff
FOR EACH ROW
EXECUTE FUNCTION update_staff_updated_at();

-- Enable Row Level Security
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

-- Public read of active staff
CREATE POLICY "Public can read active staff" ON staff
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Authenticated admins full access
CREATE POLICY "Admins manage staff" ON staff
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_staff_display_order ON staff(display_order);
CREATE INDEX IF NOT EXISTS idx_staff_key ON staff(is_key_staff);
CREATE INDEX IF NOT EXISTS idx_staff_proprietress ON staff(is_proprietress);
