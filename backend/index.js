//import express i llibreries
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import {
  createProduct,
  getAllProducts,
  getProductsByName,
  getProductById,
  deleteProductById,
  updateProduct,
  getProductsByUserId,
} from "./dao/productsDao.js";
import {
  createUser,
  getUserById,
  updateUser,
  getUserByEmail,
} from "./dao/usersDao.js";
const PORT = 3000;
const app = express();

const origenesPermitidos = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: origenesPermitidos,
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
const validateProduct = (product) => {
  if (
    product.user_id &&
    product.name &&
    product.price !== undefined &&
    product.price !== null &&
    product.desc &&
    product.state &&
    product.modality &&
    product.location &&
    product.img
  ) {
    return true;
  } else {
    return false;
  }
};

export const setUserToken = (user_id, mail, days = 7) => {
  const token = jwt.sign({ user_id: user_id, mail: mail }, "1234MegaKey67@@", {
    expiresIn: `${days}d`,
  });
  return token;
};

//Posa server a escoltar
app.listen(PORT, () => {
  console.log("Server listening on " + PORT);
});

app.post("/register", async (req, res) => {
  try {
    const { email, pwd } = req.body;
    if (!email || !pwd) {
      throw new Error("ERROR: falten dades o son incorrectes");
    }
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const createdUser = createUser(email, hashedPwd);
    if (!createdUser.error) {
      const token = setUserToken(createdUser, email, 100);
      res.json({
        status: "success",
        token: token,
        message: "User created successfully successfully",
      });
    } else {
      throw new Error(createdUser?.message || "Cannot create user");
    }
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, pwd } = req.body;
    if (!email || !pwd) {
      throw new Error("ERROR: falten dades o son incorrectes");
    }
    const user = getUserByEmail(email);
    if (!user || user == null) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(pwd, user.password);
    if (!isPasswordValid) {
      throw new Error("Credencials incorrectes");
    }
    const token = setUserToken(user.user_id, user.email, 100);
    res.json({
      status: "success",
      token: token,
      message: "User logged successfully successfully",
    });
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.get("/products", (req, res) => {
  const data = getAllProducts();
  res.json(data);
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = getProductById(id);
  if (Array.isArray(data)) {
    res.json(data[0]);
  } else {
    res.json(data);
  }
});

app.post("/products", (req, res) => {
  try {
    const product = req.body;
    if (!validateProduct(product)) {
      throw new Error("Product sent not valid");
    }
    if (createProduct(product)) {
      res.json({ status: "success", message: "Product created successfully" });
    } else {
      res.json({
        status: "error",
        message: "Cannot post product",
        error: true,
      });
    }
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.delete("/products/:id", (req, res) => {
  try {
    const id = req.params.id;
    if (deleteProductById(id)) {
      res.json({ status: "success", message: "Product deleted successfully" });
    } else {
      res.json({
        status: "error",
        message: "Cannot delete product",
        error: true,
      });
    }
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.put("/products/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = req.body;
    if (!validateProduct(product)) {
      throw new Error("Product sent not valid");
    }
    if (updateProduct(id, product)) {
      res.json({ status: "success", message: "Product modified successfully" });
    } else {
      res.json({ status: "error", message: "Cannot put product", error: true });
    }
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.get("/auth/me", (req, res) => {
  try {
    //Llegeixo la possible cookie de l'usuari
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ loggedIn: false, message: "No authorized" });
    } else {
      const decoded = jwt.verify(token, "1234MegaKey67@@");
      const { user_id, mail } = decoded;
      res.json({
        loggedIn: true,
        message: "User logged in",
        user: { user_id: user_id, mail: mail },
      });
    }
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.get("/products/me", (req, res) => {
  try {
    //Llegeixo la possible cookie de l'usuari
    const token = req.cookies.token;
    if (!token) {
      throw new Error("No user logged");
    } else {
      const decoded = jwt.verify(token, "1234MegaKey67@@");
      const { user_id } = decoded;
      const data = getProductsByUserId(user_id);
      res.json(data);
    }
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});
