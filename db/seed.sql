-- Seed users table with 4 campers (name, email, username, emoji)
INSERT INTO users (name, email, username, emoji) VALUES
  ('Maya Johnson', 'maya@dinocamp.example', 'VelociMaya', '🦕'),
  ('Liam Chen', 'liam@dinocamp.example', 'TriceraLiam', '🦖'),
  ('Sofia Ramirez', 'sofia@dinocamp.example', 'StegoSofia', '🦴'),
  ('Noah Williams', 'noah@dinocamp.example', 'RexNoah', '🌋')
ON CONFLICT (email) DO NOTHING;
