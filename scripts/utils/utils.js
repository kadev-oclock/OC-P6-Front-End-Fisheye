/**
 * function pour calculer au click le nombre de like
 * @returns calculLikeTotal
 */

function calculLikeTotal() {
  let total = 0;
  const likeTotal = document.querySelectorAll(".p_like");
  likeTotal.forEach((item) => {
    total += parseInt(item.textContent, 10);
  });
  return total;
}
calculLikeTotal();

/**
 * La fonction redirectToHomePage retourne au click à la page d'accueil
 * @date 01/09/2023 - 15:54:31
 */
function redirectToHomePage() {
  window.location.href = "index.html";
}

const homeButton = document.querySelector(".logo");

if (homeButton) {
  homeButton.addEventListener("click", redirectToHomePage);
}
/**
 * Menu select du filtre controle ouverture et fermeture
 * @date 01/09/2023 - 15:53:25
 */
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("all-item-btn");
  // eslint-disable-next-line no-use-before-define
  toggleButton.addEventListener("click", toggleDropdown);
});

function toggleDropdown() {
  const selectMenu = document.querySelector(".select-menu");
  selectMenu.classList.toggle("active");

  // Stockez l'état du dropdown dans sessionStorage
  if (selectMenu.classList.contains("active")) {
    sessionStorage.setItem("dropdownState", "open");
  } else {
    sessionStorage.removeItem("dropdownState");
  }
}
// Vérifie l'état du dropdown lors du chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const dropdownState = sessionStorage.getItem("dropdownState");
  if (dropdownState === "open") {
    toggleDropdown();
  }
});

toggleDropdown();

const focusSelect = document.querySelector(".select-menu");

focusSelect.addEventListener("focus", () => {
  // Ajoutez une classe CSS pour mettre en évidence le focus visuel
  focusSelect.classList.add("focus-highlight");
});
focusSelect.addEventListener("focusout", () => {
  // Ajoutez une classe CSS pour mettre en évidence le focus visuel
  focusSelect.classList.remove("focus-highlight");
});
/** ********************** fonction gestion du clavier filter ********************************** */

/**
 * focus sur le filtre de selection
 * @date 17/09/2023 - 18:54:46
 */
function filterFocus() {
  const filter = document.querySelector(".select-menu");

  filter.addEventListener("keydown", (event) => {
    if (filter.classList.contains("focus-highlight")) {
      if ((event.key === "Tab", event.shiftKey, event.keyCode === 27)) {
        const selectOption = filter.querySelector(".select-options");
        const focusableElements = selectOption.querySelectorAll(".option");
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        // echap
        if (event.keyCode === 27) {
          toggleDropdown();
          filter.focus();
        } else if (event.shiftKey && document.activeElement === firstElement) {
          // Si la touche Tab est pressée avec la touche Shift, passer au dernier élément
          lastElement.focus();
          event.preventDefault();
        } else if (document.activeElement === lastElement) {
          // Si la touche Tab est pressée sans la touche Shift, passer au premier élément
          firstElement.focus();
          event.preventDefault();
        }
      } else if (event.key === "Enter" || event.key === " ") {
        toggleDropdown();
      }
    }
  });
}

filterFocus();
