import db from "../db/db.js";
import { getErrorFeedback, getAllUsers, userIdExists } from "./helpers.js";

export const createProduct = (product) => {
  try {
    if (!userIdExists(product.user_id)) return false;
    const stmt = db.prepare(
      "INSERT INTO products (user_id, name, price, desc, state, modality, location, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    );
    const result = stmt.run(
      product.user_id,
      product.name,
      product.price,
      product.desc,
      product.state,
      product.modality,
      product.location,
      product.img,
    );
    return true;
  } catch (e) {
    return getErrorFeedback(e);
  }
};

export const getAllProducts = () => {
  const stmt = db.prepare("SELECT * FROM products");
  return stmt.all();
};

export const getProductsByName = (name) => {
  const stmt = db.prepare("SELECT * FROM products WHERE name LIKE ?");
  return stmt.all(`%${name}%`);
};

export const getProductById = (id) => {
  const stmt = db.prepare("SELECT * FROM products WHERE id = ?");
  return stmt.all(id);
};

export const deleteProductById = (id) => {
  try {
    const stmt = db.prepare("DELETE FROM products WHERE id = ?");
    const result = stmt.run(id);
    return result.changes > 0 ? true : null;
  } catch (e) {
    return getErrorFeedback(e);
  }
};

export const updateProduct = (id, product) => {
  try {
    const stmt = db.prepare(
      "UPDATE products SET user_id = ?, name = ?, price = ?, desc = ?, state = ?, modality = ?, location = ?, img = ? WHERE id = ?",
    );
    const result = stmt.run(
      product.user_id,
      product.name,
      product.price,
      product.desc,
      product.state,
      product.modality,
      product.location,
      product.img,
      id,
    );
    return result.changes > 0 ? true : null;
  } catch (e) {
    return getErrorFeedback(e);
  }
};

export const getProductsByUserId = async (user_id) => {
  const stmt = db.prepare("SELECT * FROM products WHERE user_id = ?");
  return stmt.all(user_id);
};
