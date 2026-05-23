export const getAllUsers = async () => {
  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();
  return data;
};

export const getAllProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();
  return data;
};

export const getProductById = async (id) => {
  const response = await fetch("http://localhost:3000/products/" + id);
  const data = await response.json();
  return data;
};

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

export const putProduct = async (id, product) => {
  const response = await fetch("http://localhost:3000/products/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Cannot put product");
  }
  const data = await response.json();
  return data;
};

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

export const userIsLogged = async () => {
  const response = await fetch("http://localhost:3000/auth/me", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const getProductsByLoggedUser = async () => {
  const response = await fetch("http://localhost:3000/products/me", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};
