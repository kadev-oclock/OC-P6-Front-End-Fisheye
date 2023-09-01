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
  // Remplacez "index.html" par le chemin relatif vers votre page d'accueil
  window.location.href = "index.html";
}

const homeButton = document.getElementsByClassName("logo");
homeButton.addEventListener("click", redirectToHomePage);

/**
 * Menu select du filtre controle ouverture et fermeture
 * @date 01/09/2023 - 15:53:25
 */
function toggleDropdown() {
  const selectMenu = document.querySelector(".select-menu");
  selectMenu.classList.toggle("active");
}
toggleDropdown();
