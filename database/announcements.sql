-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('info', 'warning', 'success', 'event')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to read active announcements
CREATE POLICY "Public can view active announcements"
  ON announcements
  FOR SELECT
  USING (is_active = true);

-- Policy: Allow authenticated users (admins) to do everything
CREATE POLICY "Authenticated users can manage announcements"
  ON announcements
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX idx_announcements_active ON announcements(is_active);
CREATE INDEX idx_announcements_created_at ON announcements(created_at DESC);

-- Create updated_at trigger
CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON announcements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
