import Database from 'better-sqlite3';

// Opprettelse av databasen med de nye kolonnene
const db = new Database('dev.db', { verbose: console.log });

db.exec(`
   CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    membership TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS devices (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    user_id TEXT NOT NULL,
    purchased_at TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(username)
  );
`);

console.log('Tabeller opprettet eller oppdatert med suksess');

export default db;
export type DB = typeof db;
