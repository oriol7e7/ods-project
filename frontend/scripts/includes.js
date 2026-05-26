import { userIsLogged } from "./api/api.js";
const isLoggedIn = false;
const logout = () => {
  document.cookie = "token=; max-age=0; path=/; sameSite=lax";
  window.location.reload();
};
let header = `
<a href="/frontend/pages/veure-productes.html" class="headerTitle">ProductCycle </a>
<nav class="headerNav">
<a class="headerLinks" href="/frontend/pages/veure-productes.html">Productes disponibles</a>
<a class="headerLinks" href="/frontend/pages/gestionar-productes.html">Gestionar productes</a>
<a class="headerLinks" href="/frontend/pages/crear-producte.html">Puja un producte</a>
<a class="headerLinks" href="/frontend/pages/sostenibilitat.html">Sostenibilitat</a>
</nav>
`;
document.addEventListener("DOMContentLoaded", async () => {
  const headerContainer = document.getElementById("header");
  try {
    const data = await userIsLogged();
    if (data.loggedIn === true) {
      headerContainer.innerHTML = `
        <a href="/frontend/pages/veure-productes.html" class="headerTitle">ProductCycle </a>
        <nav class="headerNav">
          <a class="headerLinks" href="/frontend/pages/veure-productes.html">Productes disponibles</a>
          <a class="headerLinks" href="/frontend/pages/gestionar-productes.html">Gestionar productes</a>
          <a class="headerLinks" href="/frontend/pages/crear-producte.html">Puja un producte</a>
          <a class="headerLinks" href="/frontend/pages/sostenibilitat.html">Sostenibilitat</a>
          <button class="logout" id="logout">Log Out</button>
        </nav>
      `;
      document.getElementById("logout").addEventListener("click", logout);
    } else {
      headerContainer.innerHTML = `
        <a href="/frontend/pages/veure-productes.html" class="headerTitle">ProductCycle </a>
        <nav class="headerNav">
          <a class="headerLinks" href="/frontend/pages/veure-productes.html">Productes disponibles</a>
          <a class="headerLinks" href="/frontend/pages/gestionar-productes.html">Gestionar productes</a>
          <a class="headerLinks" href="/frontend/pages/crear-producte.html">Puja un producte</a>
          <a class="headerLinks" href="/frontend/pages/sostenibilitat.html">Sostenibilitat</a>
          <button class="login" id="login">Log In</button> 
        </nav>
      `;
      document.getElementById("login").addEventListener("click", () => {
        window.location.href = "autenticacio.html";
      });
    }
  } catch (e) {
    headerContainer.innerHTML = `
      <a href="/frontend/pages/veure-productes.html" class="headerTitle">ProductCycle </a>
      <nav class="headerNav">
        <a class="headerLinks" href="/frontend/pages/veure-productes.html">Productes disponibles</a>
        <a class="headerLinks" href="/frontend/pages/gestionar-productes.html">Gestionar productes</a>
        <a class="headerLinks" href="/frontend/pages/crear-producte.html">Puja un producte</a>
        <a class="headerLinks" href="/frontend/pages/sostenibilitat.html">Sostenibilitat</a>
      </nav>
    `;
  }
});

document.addEventListener("scroll", () => {
  const headerContainer = document.getElementById("header");
  if (window.scrollY > 1) {
    headerContainer.classList.add("scrolled");
  } else {
    headerContainer.classList.remove("scrolled");
  }
});
