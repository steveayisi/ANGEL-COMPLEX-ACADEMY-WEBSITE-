-- Create news_updates table
CREATE TABLE IF NOT EXISTS news_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  author TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Achievement', 'Facilities', 'Academic', 'Sports', 'Events', 'Resources')),
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE news_updates ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to read published updates
CREATE POLICY "Public can view published updates"
  ON news_updates
  FOR SELECT
  USING (is_published = true);

-- Policy: Allow authenticated users (admins) to do everything
CREATE POLICY "Authenticated users can manage all updates"
  ON news_updates
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX idx_news_updates_date ON news_updates(date DESC);
CREATE INDEX idx_news_updates_published ON news_updates(is_published);
CREATE INDEX idx_news_updates_featured ON news_updates(is_featured);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_news_updates_updated_at
  BEFORE UPDATE ON news_updates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
