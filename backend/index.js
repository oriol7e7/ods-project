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

app.get("/product/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const product = data.products.filter((p) => p.id == id);
  res.json(product[0]);
});
