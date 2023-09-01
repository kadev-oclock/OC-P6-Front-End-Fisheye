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

// Vérifiez l'état du dropdown lors du chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  const dropdownState = sessionStorage.getItem("dropdownState");
  if (dropdownState === "open") {
    // Le dropdown était ouvert, alors réouvrez-le
    toggleDropdown();
  }
});

toggleDropdown();
