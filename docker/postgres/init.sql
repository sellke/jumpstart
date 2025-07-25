-- Create database if it doesn't exist
SELECT 'CREATE DATABASE nextapp'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nextapp');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 