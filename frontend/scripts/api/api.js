/**
 * Get all available products from the server
 * @returns {Promise<Array>} List of all products
 * @author Oriol Plazas
 * @throws {Error} If fetch fails
 */
export const getAllProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  return data;
};

/**
 * Get a product by its ID
 * @param {number} id - The product ID
 * @returns {Promise<Object>} The product object
 * @author Oriol Plazas
 * @throws {Error} If fetch fails
 */
export const getProductById = async (id) => {
  const response = await fetch("http://localhost:3000/products/" + id);
  const data = await response.json();
  return data;
};

/**
 * Create a new product on the server
 * @param {Object} product - The product data to send
 * @returns {Promise<Object>} Response from server
 * @author Oriol Plazas
 * @throws {Error} If request fails or server returns error
 */
export const postProduct = async (product) => {
  const response = await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Cannot post product");
  }
  const data = await response.json();
  return data;
};

/**
 * Delete a product by its ID
 * @param {number} id - The product ID to delete
 * @returns {Promise<Object>} Response from server
 * @author Oriol Plazas
 * @throws {Error} If request fails or server returns error
 */
export const deleteProduct = async (id) => {
  const response = await fetch("http://localhost:3000/products/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Cannot delete product");
  }
  const data = await response.json();
  return data;
};

/**
 * Update a product by its ID
 * @param {number} id - The product ID
 * @param {Object} product - The updated product data
 * @returns {Promise<Object>} Response from server
 * @author Oriol Plazas
 * @throws {Error} If request fails or server returns error
 */
export const putProduct = async (id, product) => {
  const response = await fetch("http://localhost:3000/products/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Cannot put product " + response.message);
  }
  const data = await response.json();
  return data;
};

/**
 * Register a new user account
 * @param {Object} user - The user credentials
 * @param {string} user.email - User email
 * @param {string} user.pwd - User password
 * @returns {Promise<Object>} Response with token if successful
 * @author Oriol Plazas
 * @throws {Error} If request fails or server returns error
 */
export const registerUser = async (user) => {
  //user.email, user.pwd
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Cannot register user");
  }
  const data = await response.json();
  if (data.token) {
    const maxAgeInSeconds = 100 * 24 * 60 * 60;
    document.cookie = `token=${data.token};max-age=${maxAgeInSeconds}; path=/; sameSite=lax`;
  }
  return data;
};

/**
 * Login an existing user
 * @param {Object} user - The user credentials
 * @param {string} user.email - User email
 * @param {string} user.pwd - User password
 * @returns {Promise<Object>} Response with token if successful
 * @author Oriol Plazas
 * @throws {Error} If request fails or server returns error
 */
export const loginUser = async (user) => {
  //user.email, user.pwd
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Cannot login user");
  }
  const data = await response.json();
  if (data.token) {
    const maxAgeInSeconds = 100 * 24 * 60 * 60;
    document.cookie = `token=${data.token};max-age=${maxAgeInSeconds}; path=/; sameSite=lax`;
  }
  return data;
};

/**
 * Check if a user is currently logged in
 * @returns {Promise<Object>} Object with loggedIn status and user info
 * @author Oriol Plazas
 * @throws {Error} If fetch fails
 */
export const userIsLogged = async () => {
  const response = await fetch("http://localhost:3000/auth/me", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

/**
 * Get all products created by the logged-in user
 * @returns {Promise<Array>} List of user's products
 * @author Oriol Plazas
 * @throws {Error} If fetch fails or user not logged in
 */
export const getProductsByLoggedUser = async () => {
  const response = await fetch("http://localhost:3000/products/me", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

/**
 * Search for products by name
 * @param {string} name - The product name to search for
 * @returns {Promise<Array>} List of products matching the search
 * @author Oriol Plazas
 * @throws {Error} If fetch fails
 */
export const getProductsByName = async (name) => {
  if (!name || name.trim() === "") return null;
  const response = await fetch("http://localhost:3000/products/name/" + name);
  const data = await response.json();
  return data;
};
