import db from "../db/db.js";

/**
 * Format error messages from the database
 * @param {string|Error} msg - The error message
 * @returns {Object} Formatted error object with status and message
 * @author Oriol Plazas
 */
export const getErrorFeedback = (msg) => {
  const error = {
    status: "error",
    error: true,
    msg: "SQL ERROR: " + msg,
  };
  return error;
};
/**
 * Check if a user ID exists in the database
 * @param {number} id - The user ID to check
 * @returns {boolean} True if user exists, false if not
 * @author Oriol Plazas
 */
export const userIdExists = (id) => {
  const users = getAllUsers();
  return users.some((u) => u.id == id);
};

/**
 * Get all users from the database
 * @returns {Array} Array of users with id, email and role
 * @author Oriol Plazas
 */
export const getAllUsers = () => {
  const stmt = db.prepare("SELECT id, email, role FROM users");
  return stmt.all();
};
