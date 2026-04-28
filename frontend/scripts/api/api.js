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
