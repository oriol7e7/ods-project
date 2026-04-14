let isLogin = true;
const form = document.getElementById("form");
const toggleButton = document.getElementById("toggleButton");
const registerHtml = `
<h1>Registro</h1>
`;
const loginHtml = `
<h1>Inicia Sesion</h1>
`;

toggleButton.addEventListener("click", () => {
  if (isLogin) {
    isLogin = false;
    toggleButton.textContent = "Registrate";
    form.innerHTML = registerHtml;
  } else {
    isLogin = true;
    toggleButton.textContent = "Inicia Sesion";
    form.innerHTML = loginHtml;
  }
});

form.addEventListener("submit", () => {});
