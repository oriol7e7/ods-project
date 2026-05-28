import {
  getProductById,
  deleteProduct,
  userIsLogged,
  putProduct,
  getProductsByLoggedUser,
  getAllProducts,
} from "../api/api.js";
const mainTitle = document.getElementById("productName");
let data = undefined;
document.addEventListener("DOMContentLoaded", async () => {
  data = await userIsLogged();
  if (data.loggedIn === false) {
    window.location.href = "autenticacio.html";
  } else {
    renderProductPage(data);
  }
});

/**
 * Remove whitespace from form inputs and validate they're not empty
 * @param {Array<HTMLElement>} inputs - Array of input elements to validate
 * @author Oriol Plazas
 * @throws {Error} If any field is empty
 */
const trimFormValues = (inputs) => {
  inputs.forEach((i) => {
    i.value = i.value.trim();
    if (i.value == "" || i.value == null) {
      throw new Error("Has de escriure tots els camps");
    }
  });
};

/**
 * Display loading spinner on submit button
 * @param {HTMLElement} errorElement - Error message element
 * @param {HTMLElement} buttonElement - Submit button element
 * @author Oriol Plazas
 */
const setLoadingState = (errorElement, buttonElement) => {
  errorElement.textContent = "";
  buttonElement.disabled = true;
  buttonElement.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>';
};
/**
 * Load product and display edit form
 * @author Oriol Plazas
 * @throws {Error} If product not found or fetch fails
 */
const renderProductPage = async (data) => {
  try {
    const id = getUrlId();
    if (!id) {
      throw new Error("Cannot get id from url");
    }
    let products;
    if (data.user.role == "admin") {
      products = await getAllProducts();
    } else {
      products = await getProductsByLoggedUser();
    }
    //si l'id del producte de la url no esta a la llista de productes creats per l'usuari, llença excepcio
    const foundProduct = products.find((p) => p.id == id);
    if (!foundProduct) {
      throw new Error("Product not found");
    }
    const product = await getProductById(id);
    renderProduct(product, id);
  } catch (e) {
    if (
      e.message ==
      "S'estan validant les teves credencials. Espera un segon i torna a intentar-ho."
    ) {
      mainTitle.textContent = "Error al validar les dades";
    } else {
      mainTitle.textContent = "Producte no trobat";
    }
  }
};

/**
 * Extract product ID from URL query parameters
 * @returns {string|null} The product ID from URL or null if not found
 * @author Oriol Plazas
 */
const getUrlId = () => {
  const urlQueryString = window.location.search;
  const urlParams = new URLSearchParams(urlQueryString);
  const id = urlParams.get("id");
  return id ? id : null;
};

/**
 * Display product details with edit and delete options
 * @param {Object} product - The product data to display
 * @param {number} id - The product ID
 * @author Oriol Plazas
 */
const renderProduct = (product, id) => {
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
    <div class="modifyBtns">
        <button id="modifyBtn" class="modifyProduct">Modificar</button>
        <button id="deleteBtn" class="deleteProduct">Eliminar</button>
    </div>
    <span id="errorMsg" class="errorMsg"></span>
  </article>
  `;
  document.getElementById("deleteBtn").addEventListener("click", async () => {
    try {
      const success = await deleteProduct(id);
      if (success.error) {
        throw new Error("Cannot delete product");
      } else {
        window.location.href = "gestionar-productes.html";
      }
    } catch (e) {
      document.getElementById("errorMsg").textContent =
        "No s'ha pogut eliminar el producte";
    }
  });
  document.getElementById("modifyBtn").addEventListener("click", async () => {
    try {
      document.getElementById("product").innerHTML = `
  <form id="createProductForm" class="formCard"> 
    <div class="formSect">
      <label for="name">Nom del producte:</label>
      <input class="loginInput" type="text" id="name" name="name" value="${product.name}" required>
    </div>

    <div class="formSect">
      <label for="price">Preu (€):</label>
      <input class="loginInput" type="number" step="0.01" id="price" name="price" value="${product.price}" required>
    </div>

    <div class="formSect">
      <label for="desc">Descripció:</label>
      <textarea class="loginInput formTextarea" id="desc" name="desc" rows="4" required>${product.desc}</textarea>
    </div>

    <div class="formSect">
      <label for="state">Estat:</label>
      <select class="loginInput" id="state" name="state" required>
        <option value="" disabled>Selecciona l'estat...</option>
        <option value="Nou" ${product.state === "Nou" ? "selected" : ""}>Nou</option>
        <option value="Com nou" ${product.state === "Com nou" ? "selected" : ""}>Com nou</option>
        <option value="Usat" ${product.state === "Usat" ? "selected" : ""}>Usat</option>
      </select>
    </div>

    <div class="formSect">
      <label for="modality">Modalitat:</label>
      <select class="loginInput" id="modality" name="modality" required>
        <option value="" disabled>Selecciona la modalitat...</option>
        <option value="Venda" ${product.modality === "Venda" ? "selected" : ""}>Venda</option>
        <option value="Intercanvi" ${product.modality === "Intercanvi" ? "selected" : ""}>Intercanvi</option>
        <option value="Donació" ${product.modality === "Donació" ? "selected" : ""}>Donació</option>
      </select>
    </div>

    <div class="formSect">
      <label for="location">Localització (Ciutat o barri):</label>
      <input class="loginInput" type="text" id="location" name="location" value="${product.location}" required>
    </div>

    <div class="formSect">
      <label for="img">URL de la imatge:</label>
      <input class="loginInput" type="url" id="img" name="img" placeholder="https://..." value="${product.img}" required>
    </div>

    <p id="errorMsg" class="errorMsg"></p>
    <button type="submit" class="submitAuth formSubmitBtn" id="submitBtn">Modificar Producte</button>
  </form>
`;
      document
        .getElementById("createProductForm")
        .addEventListener("submit", async (e) => {
          e.preventDefault();
          const formError = document.getElementById("errorMsg");
          const submitBtn = document.getElementById("submitBtn");
          try {
            const valuesArray = [
              document.getElementById("name"),
              document.getElementById("price"),
              document.getElementById("desc"),
              document.getElementById("state"),
              document.getElementById("modality"),
              document.getElementById("location"),
              document.getElementById("img"),
            ];
            setLoadingState(formError, submitBtn);
            trimFormValues(valuesArray);
            const modifiedProducts = {
              user_id: data.user.user_id,
              name: document.getElementById("name").value,
              price: parseFloat(document.getElementById("price").value),
              desc: document.getElementById("desc").value,
              state: document.getElementById("state").value,
              modality: document.getElementById("modality").value,
              location: document.getElementById("location").value,
              img: document.getElementById("img").value,
            };
            const success = await putProduct(id, modifiedProducts);
            if (success.error) {
              throw new Error(
                "Cannot modify product + API FETCHING ERROR: " +
                  success.message,
              );
            } else {
              window.location.href = "gestionar-productes.html";
            }
          } catch (e) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "";
            submitBtn.textContent = "Modificar Producte";
            formError.textContent =
              "No es pot modificar el producte, verifica els camps" + e.message;
          }
        });
    } catch (e) {
      document.getElementById("errorMsg").textContent =
        "No s'ha pogut modificar el producte";
    }
  });
};
