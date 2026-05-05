const header = `
<a href="/frontend/pages/veure-productes.html" class="headerTitle">ProductCycle </a>
<nav class="headerNav">
<a class="headerLinks" href="/frontend/pages/veure-productes.html">Productes disponibles</a>
<a class="headerLinks" href="/frontend/pages/gestionar-productes.html">Gestionar productes</a>
<a class="headerLinks" href="/frontend/pages/sostenibilitat.html">Sostenibilitat</a>
</nav>
`;
document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header");
  headerContainer.innerHTML = header;
});

document.addEventListener("scroll", () => {
  const headerContainer = document.getElementById("header");
  if (window.scrollY > 1) {
    headerContainer.classList.add("scrolled");
  } else {
    headerContainer.classList.remove("scrolled");
  }
});
