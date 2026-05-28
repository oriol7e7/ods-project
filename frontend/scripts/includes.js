import { userIsLogged } from "./api/api.js";
const isLoggedIn = false;
let darkModeVar = localStorage.getItem("darkmode") === "true";
/**
 * Clear user session and reload the page
 * @author Oriol Plazas
 */
const logout = () => {
  document.cookie = "token=; max-age=0; path=/; sameSite=lax";
  window.location.reload();
};

//Default header
let header = `
<a href="/frontend/pages/veure-productes.html" class="headerTitle">ProductCycle </a>
<nav class="headerNav">
<a class="headerLinks" href="/frontend/pages/veure-productes.html">Productes disponibles</a>
<a class="headerLinks" href="/frontend/pages/gestionar-productes.html">Gestionar productes</a>
<a class="headerLinks" href="/frontend/pages/crear-producte.html">Puja un producte</a>
<a class="headerLinks" href="/frontend/pages/sostenibilitat.html">Sostenibilitat</a>
<svg id="darkmode" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75"/>
</svg>
</nav>
`;
document.addEventListener("DOMContentLoaded", async () => {
  const headerContainer = document.getElementById("header");
  try {
    if (darkModeVar === true) {
      document.documentElement.classList.toggle("dark");
    }
    const data = await userIsLogged();
    if (data.loggedIn === true) {
      //si esta loguejat surt boto de logout
      //si es admin, pot gestionar el usuaris
      if (data.user.role == "admin") {
        //si esta loguejat surt boto de logout
        headerContainer.innerHTML = `
        <a href="/frontend/pages/veure-productes.html" class="headerTitle">ProductCycle </a>
        <nav class="headerNav">
          <a class="headerLinks" href="/frontend/pages/veure-productes.html">Productes disponibles</a>
          <a class="headerLinks" href="/frontend/pages/gestionar-productes.html">Gestionar productes</a>
          <a class="headerLinks" href="/frontend/pages/gestionar-usuaris.html">Gestionar usuaris</a>
          <a class="headerLinks" href="/frontend/pages/crear-producte.html">Puja un producte</a>
          <a class="headerLinks" href="/frontend/pages/sostenibilitat.html">Sostenibilitat</a>
          <button class="logout" id="logout">Log Out</button>
         <svg id="darkmode" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75"/>
</svg>
        </nav>
      `;
      } else {
        headerContainer.innerHTML = `
        <a href="/frontend/pages/veure-productes.html" class="headerTitle">ProductCycle </a>
        <nav class="headerNav">
          <a class="headerLinks" href="/frontend/pages/veure-productes.html">Productes disponibles</a>
          <a class="headerLinks" href="/frontend/pages/gestionar-productes.html">Gestionar productes</a>
          <a class="headerLinks" href="/frontend/pages/crear-producte.html">Puja un producte</a>
          <a class="headerLinks" href="/frontend/pages/sostenibilitat.html">Sostenibilitat</a>
          <button class="logout" id="logout">Log Out</button>
         <svg id="darkmode" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75"/>
</svg>
        </nav>
      `;
      }

      //listener per si fa logout
      document.getElementById("logout").addEventListener("click", logout);
    } else {
      //si no esta loguejat, surt log in
      headerContainer.innerHTML = `
        <a href="/frontend/pages/veure-productes.html" class="headerTitle">ProductCycle </a>
        <nav class="headerNav">
          <a class="headerLinks" href="/frontend/pages/veure-productes.html">Productes disponibles</a>
          <a class="headerLinks" href="/frontend/pages/gestionar-productes.html">Gestionar productes</a>
          <a class="headerLinks" href="/frontend/pages/crear-producte.html">Puja un producte</a>
          <a class="headerLinks" href="/frontend/pages/sostenibilitat.html">Sostenibilitat</a>
          <button class="login" id="login">Log In</button>
          <svg id="darkmode" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75"/>
</svg>
        </nav>
      `;
      //listener per si fa login
      document.getElementById("login").addEventListener("click", () => {
        window.location.href = "autenticacio.html";
      });
    }
  } catch (e) {
    //si hi ha algun error, no mostra cap boto
    headerContainer.innerHTML = `
      <a href="/frontend/pages/veure-productes.html" class="headerTitle">ProductCycle </a>
      <nav class="headerNav">
        <a class="headerLinks" href="/frontend/pages/veure-productes.html">Productes disponibles</a>
        <a class="headerLinks" href="/frontend/pages/gestionar-productes.html">Gestionar productes</a>
        <a class="headerLinks" href="/frontend/pages/crear-producte.html">Puja un producte</a>
        <a class="headerLinks" href="/frontend/pages/sostenibilitat.html">Sostenibilitat</a>
        <svg id="darkmode" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
  <path fill="currentColor" d="M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75"/>
</svg>
        </nav>
    `;
  } finally {
    const toggleDarkMode = document.getElementById("darkmode");
    handleDarkMode(toggleDarkMode);
    //Inyecta el footer si existe el elemento
    const footerContainer = document.getElementById("footer");
    if (footerContainer) {
      createFooter(footerContainer);
    }
  }
});

//Event d'scroll per afegir marge sota al header
document.addEventListener("scroll", () => {
  const headerContainer = document.getElementById("header");
  if (window.scrollY > 1) {
    headerContainer.classList.add("scrolled");
  } else {
    headerContainer.classList.remove("scrolled");
  }
});

//Crea un listener pel boto de dark mode que guarda a localstorage l'estat i afegeix o treu la classe dark
const handleDarkMode = (btn) => {
  btn.addEventListener("click", () => {
    darkModeVar = !darkModeVar;
    localStorage.setItem("darkmode", darkModeVar);
    document.documentElement.classList.toggle("dark");
  });
};

/**
 * Get page name from document title
 * @returns {string} Page name
 * @author Oriol Plazas
 */
const getPageName = () => {
  return document.title || "ProductCycle";
};

/**
 * Inject footer dynamically
 * @param  footerContainer - Footer element
 * @author Oriol Plazas
 */
const createFooter = (footerContainer) => {
  const pageName = getPageName();
  footerContainer.innerHTML = `
    <div class="footerContent">
      <span class="footerTitle">${pageName}</span>
      <p class="footerTagline">Els productes que no utilitzes mereixen una segona vida</p>
    </div>
  `;
};
