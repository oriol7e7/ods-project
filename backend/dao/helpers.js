import db from "../db.js";

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
  users.forEach((u) => {
    if (u.id == id) {
      return true;
    }
  });
  return false;
};

export const getAllUsers = () => {
  const stmt = db.prepare("SELECT id, email, role FROM users");
  return stmt.all();
};
