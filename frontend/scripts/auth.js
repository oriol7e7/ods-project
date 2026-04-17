let isLogin = true;
const form = document.getElementById("form");
const toggleButton = document.getElementById("toggleButton");
const errorMsg = document.getElementById("errorMsg");
const title = document.getElementById("title");

toggleButton.addEventListener("click", () => {
  if (isLogin) {
    isLogin = false;
    title.textContent = "Registrate";
  } else {
    isLogin = true;
    title.textContent = "Inicia Sesion";
  }
});

form.addEventListener("submit", () => {});
