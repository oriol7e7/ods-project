import db from "../db/db.js";
import { getErrorFeedback, getAllUsers, userIdExists } from "./helpers.js";

/**
 * Create a new product in the database
 * @param {Object} product - The product data
 * @param {number} product.user_id - ID of the user creating the product
 * @param {string} product.name - Product name
 * @param {number} product.price - Product price
 * @param {string} product.desc - Product description
 * @param {string} product.state - Product state (Nou, Com nou, Usat)
 * @param {string} product.modality - Product modality (Lloguer, Venda)
 * @param {string} product.location - Product location
 * @param {string} product.img - Product image URL
 * @returns {boolean|Object} True if created successfully, error object if failed
 * @author Oriol Plazas
 * @throws {Error} If user ID doesn't exist or database error
 */
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

/**
 * Get all products from the database
 * @returns {Array} Array of all products
 * @author Oriol Plazas
 */
export const getAllProducts = () => {
  const stmt = db.prepare("SELECT * FROM products");
  return stmt.all();
};

/**
 * Search products by name using wildcard
 * @param {string} name - The product name to search for
 * @returns {Array} Array of products matching the name
 * @author Oriol Plazas
 */
export const getProductsByName = (name) => {
  const stmt = db.prepare("SELECT * FROM products WHERE name LIKE ?");
  return stmt.all(`%${name}%`);
};

/**
 * Get a product by its ID with user email information
 * @param {number} id - The product ID
 * @returns {Array} Array containing the product and user email
 * @author Oriol Plazas
 */
export const getProductById = (id) => {
  const stmt = db.prepare(
    "SELECT p.*, u.email  FROM products p LEFT JOIN users u ON u.id = p.user_id WHERE p.id = ?",
  );
  return stmt.all(id);
};

/**
 * Delete a product by its ID
 * @param {number} id - The product ID to delete
 * @returns {boolean|null|Object} True if deleted, null if not found, error object if failed
 * @author Oriol Plazas
 * @throws {Error} If database error occurs
 */
export const deleteProductById = (id) => {
  try {
    const stmt = db.prepare("DELETE FROM products WHERE id = ?");
    const result = stmt.run(id);
    return result.changes > 0 ? true : null;
  } catch (e) {
    return getErrorFeedback(e);
  }
};

/**
 * Update a product by its ID
 * @param {number} id - The product ID to update
 * @param {Object} product - The updated product data
 * @param {number} product.user_id - User ID
 * @param {string} product.name - Product name
 * @param {number} product.price - Product price
 * @param {string} product.desc - Product description
 * @param {string} product.state - Product state
 * @param {string} product.modality - Product modality
 * @param {string} product.location - Product location
 * @param {string} product.img - Product image URL
 * @returns {boolean|null|Object} True if updated, null if not found, error object if failed
 * @author Oriol Plazas
 * @throws {Error} If database error occurs
 */
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

/**
 * Get all products created by a specific user
 * @param {number} user_id - The user ID
 * @returns {Array} Array of products created by the user with their email
 * @author Oriol Plazas
 */
export const getProductsByUserId = (user_id) => {
  const stmt = db.prepare(
    "SELECT p.*, u.email  FROM products p LEFT JOIN users u ON u.id = p.user_id WHERE user_id = ?",
  );
  return stmt.all(user_id);
};
