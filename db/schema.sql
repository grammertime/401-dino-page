-- Create users table for dinocamp database (campers roster)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL DEFAULT '',
  emoji VARCHAR(16) NOT NULL DEFAULT '🦕',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
