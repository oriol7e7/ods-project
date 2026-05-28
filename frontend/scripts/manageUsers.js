import { getAllUsers, userIsLogged } from "./api/api.js";

const section = document.getElementById("manageUsers");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const user = await userIsLogged();
    if (user.error || !user.loggedIn) {
      //si l'usuari no esta loguejar o la api dona error
      window.location.href = "autenticacio.html";
      return;
    } else if (user.user?.role != "admin") {
      //si l'usuari esta loguejar pero no es admin, es bloqueja l'access
      window.location.href = "veure-productes.html";
      return;
    } else {
      const users = await getAllUsers();
      users.forEach((u) => renderUser(u));
    }
  } catch (e) {
    section.innerHTML = `
        <p>Error recopilant usuaris</p>
        `;
  }
});

const renderUser = (u) => {
  const article = document.createElement("article");
  const cardHtml = `
        <h6>${u.email}</h6>
        <p>${u.role}</p>
    `;
  article.classList.add("userCard");
  article.innerHTML = cardHtml;
  section.appendChild(article);
};
