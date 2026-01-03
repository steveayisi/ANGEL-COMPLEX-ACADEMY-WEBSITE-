-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'responded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert contact messages
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users (admins) can view contact messages
CREATE POLICY "Authenticated users can view all messages"
  ON contact_messages
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users (admins) can update message status
CREATE POLICY "Authenticated users can update message status"
  ON contact_messages
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created ON contact_messages(created_at DESC);
