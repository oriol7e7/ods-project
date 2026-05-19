//import express i llibreries
import express from "express";
import cors from "cors";
import fs from "fs"; //treballar amb arxius - read-write
import bodyParser from "body-parser";
const PORT = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

/*FUNCIONS PER ESCRIURE I LLEGIR JSON */
const readData = () => {
  try {
    const data = fs.readFileSync("./db.json");
    //console.log(data);
    //console.log(JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};
//Funció per escriure informació
const writeData = (data) => {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const validateProduct = (product) => {
  if (
    product.user &&
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

//Posa server a escoltar
app.listen(PORT, () => {
  console.log("Server listening on " + PORT);
});

app.get("/users", (req, res) => {
  const data = readData();
  res.json(data.users);
});

app.get("/products", (req, res) => {
  const data = readData();
  res.json(data.products);
});

app.get("/products/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const product = data.products.filter((p) => p.id == id);
  res.json(product[0]);
});

app.post("/products", (req, res) => {
  try {
    const data = readData();
    const product = req.body;
    if (!validateProduct(product)) {
      throw new Error("Product sent not valid");
    }
    const lastId = data.products.length;
    const newProduct = {
      id: lastId + 1,
      ...product,
    };
    data.products.push(newProduct);
    writeData(data);
    res.json({ status: "success", message: "Product created successfully" });
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.delete("/products/:id", (req, res) => {
  try {
    const data = readData();
    const id = req.params.id;
    const idx = data.products.findIndex((p) => p.id == id);
    if (id < 0 || idx === -1) throw new Error("Id not valid");
    data.products.splice(idx, 1);
    writeData(data);
    res.json({ status: "success", message: "Product deleted successfully" });
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});

app.put("/products/:id", (req, res) => {
  try {
    const data = readData();
    const id = parseInt(req.params.id);
    const idx = data.products.findIndex((p) => p.id == id);
    if (id < 0 || idx === -1) throw new Error("Id not valid");
    const product = req.body;
    if (!validateProduct(product)) {
      throw new Error("Product sent not valid");
    }
    data.products[idx] = {
      id: id,
      ...product,
    };
    writeData(data);
    res.json({ status: "success", message: "Product modified successfully" });
  } catch (e) {
    res.json({ status: "error", message: e.message, error: true });
  }
});
