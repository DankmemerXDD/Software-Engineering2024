import db from '../db/db';
import { User } from '../models/User';

// Define the type of row expected from the database
interface UserRow {
  username: string;
  password: string;
  image?: string;
  membership?: string;
}

// Function to find a user by their username
export const findUserByUsername = (username: string): User | undefined => {
  const row = db.prepare('SELECT username, password, image, membership FROM users WHERE username = ?').get(username) as UserRow | undefined;

  if (row) {
    return {
      username: row.username,
      password: row.password,
      image: row.image || undefined,
      membership: row.membership || undefined,
    } as User;
  }

  return undefined;
};

// Function to create a new user
export const createUser = (user: User): void => {
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(
    user.username,
    user.password
  );
};
