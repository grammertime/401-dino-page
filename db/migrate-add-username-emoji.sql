-- Run this if you already created the users table before username/emoji were added
ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS emoji VARCHAR(16) NOT NULL DEFAULT '🦕';
