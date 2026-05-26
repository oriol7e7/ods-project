import { getProductById } from "./api/api.js";

const mainTitle = document.getElementById("productName");
const renderProductPage = async () => {
  try {
    const id = getUrlId();
    if (!id) {
      throw new Error("Cannot get id from url");
    }
    const product = await getProductById(id);
    renderProduct(product);
  } catch (e) {
    console.log(e);
    mainTitle.textContent = "Producte no trobat";
  }
};

const getUrlId = () => {
  const urlQueryString = window.location.search;
  const urlParams = new URLSearchParams(urlQueryString);
  const id = urlParams.get("id");
  return id ? id : null;
};

const renderProduct = (product) => {
  mainTitle.textContent = product.name;
  document.getElementById("product").innerHTML = `
  <img src="${product.img}" alt="Imatge de ${product.name}">
  <article class="productArticle">
    <h2>${product.name}</h2>
    <p>${product.desc}</p>
    <h5><strong>${product.price}€</strong></h5>
    <div class="productTags">
        <p class="productState">${product.state}</p>
        <p class="modalityTag">${product.modality}</p>
        <p><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#00a896" class="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6" /></svg>${product.location}</p>
    </div>
    <button class="contactBtn" id="${product.id}">Contacta!</button>
  <article>
  `;
  document.getElementById(product.id).addEventListener("click", () => {
    window.open(
      `mailto:${product.email}?subject=M'interessa el teu producte: ${product.name}`,
    );
  });
};

renderProductPage();
