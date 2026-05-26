import { getProductsByName, getAllProducts } from "../api/api.js";
const searcher = document.getElementById("searcher");
const grid = document.getElementById("productesGrid");
searcher.addEventListener("input", async () => {
  const searched = searcher.value;
  if (searched == "") {
    renderAllProducts();
  }
  try {
    grid.innerHTML = "";
    const data = await getProductsByName(searched);
    if (data.error) {
      throw new Error("api returned error");
    }
    if (data.length === 0) {
      grid.innerHTML = `
        <p>No s'han trobat productes</p>
        `;
    } else {
      data.forEach((p) => {
        renderProductCard(p, grid);
      });
    }
  } catch (e) {}
});

/**
 * Create and display a search result product card in the grid
 * @param {Object} product - The product data
 * @param {HTMLElement} container - The container element to append the card
 * @author Oriol Plazas
 */
const renderProductCard = async (product, container) => {
  const article = document.createElement("article");
  const productHTML = `
        <img src="${product.img}" alt="Imatge de ${product.name}">
        <div class="productCardText">
            <div class="productDesc">
                <p><strong>${product.name}</strong></p>
                <p>${product.price}€</p>
            </div>
            <div class="productInfo">
                <small class="modality">${product.modality}</small>
                <small class="location"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#00a896" class="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6" /></svg>${product.location}</small>
            </div>
        </div>
    `;
  article.classList.add("productGridCard");
  article.innerHTML = productHTML;
  article.addEventListener("click", () => {
    window.location.href = "producte.html?id=" + product.id;
  });

  container.appendChild(article);
};

/**
 * Load and display all available products for search
 * @author Oriol Plazas
 * @throws {Error} If fetch fails or grid element not found
 */
const renderAllProducts = async () => {
  if (grid) {
    try {
      const products = await getAllProducts();
      products.forEach((p) => {
        renderProductCard(p, grid);
      });
    } catch (e) {
      console.log(e);
      grid.innerHTML = "<h4>Error en obtenir els products</h4>";
    }
  }
};
