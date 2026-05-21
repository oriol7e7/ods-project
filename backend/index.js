//import express i llibreries
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import {
  createProduct,
  getAllProducts,
  getProductsByName,
  getProductById,
  deleteProductById,
  updateProduct,
} from "./dao/productsDao.js";
import {
  createUser,
  getUserById,
  updateUser,
  getUserByEmail,
} from "./dao/usersDao.js";
const PORT = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

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

export const setUserToken = (res, user_id, mail, days = 7) => {
  const token = jwt.sign({ userId: user_id, mail: mail }, "1234MegaKey67@@", {
    expiresIn: `${days}d`,
  });
  const maxAgeInMs = days * 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    maxAge: maxAgeInMs,
    sameSite: "strict",
  });
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
      setUserToken(res, createdUser, email, 100);
      res.json({
        status: "success",
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
    setUserToken(res, user.user_id, user.email, 100);
    res.json({
      status: "success",
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
