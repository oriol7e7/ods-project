import { loginUser, registerUser } from "./api/api.js";
let isLogin = true;
const form = document.getElementById("form");
const toggleButton = document.getElementById("toggleButton");
const errorMsg = document.getElementById("errorMsg");
const title = document.getElementById("title");
const submitBtn = document.getElementById("submitBtn");

/**
 * Show login error message to user
 * @author Oriol Plazas
 */
const setLoginError = () => {
  submitBtn.disabled = false;
  submitBtn.innerHTML = "";
  submitBtn.textContent = "Inicia Sessió";
  errorMsg.textContent = "No s'ha pogut iniciar sessio";
};

/**
 * Show incorrect login credentials message
 * @author Oriol Plazas
 */
const setIncorrectLogin = () => {
  submitBtn.disabled = false;
  submitBtn.innerHTML = "";
  submitBtn.textContent = "Inicia Sessió";
  errorMsg.textContent = "Usuari o contrassenya incorrecte";
  setTimeout(() => {
    errorMsg.textContent = "";
  }, 2000);
};

/**
 * Show incorrect register data message
 * @author Oriol Plazas
 */
const setIncorrectRegister = () => {
  submitBtn.disabled = false;
  submitBtn.innerHTML = "";
  submitBtn.textContent = "Registrat";
  errorMsg.textContent = "Usuari o contrassenya incorrecte";
  setTimeout(() => {
    errorMsg.textContent = "";
  }, 2000);
};

/**
 * Display loading spinner on submit button
 * @author Oriol Plazas
 */
const setLoadingState = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = "";
  submitBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>';
};

/**
 * Update form to show register mode
 * @author Oriol Plazas
 */
const renderRegisterMode = () => {
  title.textContent = "Registrat";
  submitBtn.textContent = "Registrat";
  toggleButton.textContent = "Tens un compte? Inicia Sessió";
};

/**
 * Update form to show login mode
 * @author Oriol Plazas
 */
const renderLoginMode = () => {
  title.textContent = "Inicia Sessió";
  submitBtn.textContent = "Inicia Sessió";
  toggleButton.textContent = "No tens compte? Registrat";
};

toggleButton.addEventListener("click", () => {
  if (isLogin) {
    isLogin = false;
    renderRegisterMode();
  } else {
    renderLoginMode();
    isLogin = true;
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = document.getElementById("user").value;
  const pwd = document.getElementById("password").value;
  if (isLogin) {
    try {
      setLoadingState();
      const canLogIn = await loginUser({ email: user, pwd: pwd });
      if (canLogIn.error) {
        setIncorrectLogin();
      } else {
        window.location.href = "veure-productes.html";
      }
    } catch (e) {
      setLoginError();
    }
  } else {
    try {
      setLoadingState();
      const canRegister = await registerUser({ email: user, pwd: pwd });
      if (canRegister.error) {
        setIncorrectRegister();
      } else {
        window.location.href = "veure-productes.html";
      }
    } catch (e) {
      setLoginError();
    }
  }
});
