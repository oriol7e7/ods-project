import db from "../db/db.js";
import { getErrorFeedback, getAllUsers, userIdExists } from "./helpers.js";

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

export const getUserById = (id) => {
  const stmt = db.prepare("SELECT id, email, role FROM users WHERE id = ?");
  return stmt.get(id) ? stmt.get(id) : null;
};

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

export const getUserByEmail = (mail) => {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  return stmt.get(mail) ? stmt.get(mail) : null;
};
