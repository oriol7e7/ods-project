import db from "../db/db.js";

export const getErrorFeedback = (msg) => {
  const error = {
    status: "error",
    error: true,
    msg: "SQL ERROR: " + msg,
  };
  return error;
};
export const userIdExists = (id) => {
  const users = getAllUsers();
  return users.some((u) => u.id == id);
};

export const getAllUsers = () => {
  const stmt = db.prepare("SELECT id, email, role FROM users");
  return stmt.all();
};
