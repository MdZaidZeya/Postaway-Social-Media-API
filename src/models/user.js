import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage
let users = [];

/**
 * Get all users
 */
export const getAllUsers = () => {
  return users;
};

/**
 * Add a new user
 */
export const addUser = async (name, email, password) => {
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword
  };

  users.push(newUser);
  return { id: newUser.id, name: newUser.name, email: newUser.email };
};

/**
 * Confirm user login
 */
export const confirmLogin = async (email, password) => {
  const user = users.find(user => user.email === email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return { id: user.id, name: user.name, email: user.email };
};
