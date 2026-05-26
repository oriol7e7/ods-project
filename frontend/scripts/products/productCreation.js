import { postProduct, userIsLogged } from "../api/api.js";
const form = document.getElementById("createProductForm");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById("price");
const inputDesc = document.getElementById("desc");
const inputState = document.getElementById("state");
const inputModality = document.getElementById("modality");
const inputLocation = document.getElementById("location");
const inputImg = document.getElementById("img");
const errorMsg = document.getElementById("errorMsg");
const submitBtn = document.getElementById("submitBtn");
let data = undefined;
document.addEventListener("DOMContentLoaded", async () => {
  data = await userIsLogged();
  if (data.loggedIn === false) {
    window.location.href = "autenticacio.html";
  }
});
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    if (!data || !data.user) {
      throw new Error(
        "S'estan validant les teves credencials. Espera un segon i torna a intentar-ho.",
      );
    }
    trimFormValues();
    setLoadingState();
    const productData = {
      user_id: data.user.user_id,
      name: inputName.value,
      price: parseFloat(inputPrice.value),
      desc: inputDesc.value,
      state: inputState.value,
      modality: inputModality.value,
      location: inputLocation.value,
      img: inputImg.value,
    };

    const response = await postProduct(productData);
    if (response.error) {
      throw new Error(response.message || "Error desconegut del servidor");
    } else {
      window.location.href = "veure-productes.html";
    }
  } catch (e) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = "";
    submitBtn.textContent = "Crear Producte";
    errorMsg.textContent = "Error al crear el producte: " + e.message;
  }
});

/**
 * Remove whitespace from form inputs and validate they're not empty
 * @author Oriol Plazas
 * @throws {Error} If any field is empty
 */
const trimFormValues = () => {
  const inputs = [
    inputName,
    inputDesc,
    inputPrice,
    inputState,
    inputModality,
    inputLocation,
    inputImg,
  ];
  inputs.forEach((i) => {
    i.value = i.value.trim();
    if (i.value == "" || i.value == null) {
      throw new Error("Has de escriure tots els camps");
    }
  });
};

/**
 * Display loading spinner on submit button
 * @author Oriol Plazas
 */
const setLoadingState = () => {
  errorMsg.textContent = "";
  submitBtn.disabled = true;
  submitBtn.textContent = "";
  submitBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>';
};
