import db from "../db/db.js";
import { getErrorFeedback, getAllUsers, userIdExists } from "./helpers.js";

/**
 * Create a new user account in the database
 * @param {string} user - The user email
 * @param {string} pwd - The hashed password
 * @param {string} [role='normal'] - The user role (admin or normal)
 * @returns {number|Object} The new user ID if successful, error object if failed
 * @author Oriol Plazas
 * @throws {Error} If database error occurs
 */
export const createUser = (user, pwd, role = "normal") => {
  try {
    const stmt = db.prepare(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
    );
    const result = stmt.run(user, pwd, role);

    return result.lastInsertRowid;
  } catch (e) {
    return getErrorFeedback(e);
  }
};

/**
 * Get user information by ID
 * @param {number} id - The user ID
 * @returns {Object|null} User object with id, email and role, or null if not found
 * @author Oriol Plazas
 */
export const getUserById = (id) => {
  const stmt = db.prepare("SELECT id, email, role FROM users WHERE id = ?");
  return stmt.get(id) ? stmt.get(id) : null;
};

/**
 * Update user email and password
 * @param {number} id - The user ID
 * @param {string} email - The new email
 * @param {string} pwd - The new hashed password
 * @returns {boolean|null|Object} True if updated, null if not found, error object if failed
 * @author Oriol Plazas
 * @throws {Error} If database error occurs
 */
export const updateUser = (id, email, pwd) => {
  try {
    const stmt = db.prepare(
      "UPDATE users SET email = ?, password = ? WHERE id = ?",
    );
    const result = stmt.run(email, pwd, id);
    return result.changes > 0 ? true : null;
  } catch (e) {
    return getErrorFeedback(e);
  }
};

/**
 * Get user by email address
 * @param {string} mail - The user email
 * @returns {Object|null} User object with all data, or null if not found
 * @author Oriol Plazas
 */
export const getUserByEmail = (mail) => {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(mail) ? stmt.get(mail) : null;
};
