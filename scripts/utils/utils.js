/**
 * La fonction "calculLikeTotal" calcule le nombre total de likes en additionnant les valeurs de tous
 * éléments avec la classe "p_like" et renvoie le total.
 * @returns the total number of likes.
 */

// eslint-disable-next-line no-unused-vars
function calculLikeTotal() {
  let total = 0;
  const likeTotal = document.querySelectorAll(".p_like");
  likeTotal.forEach((item) => {
    total += parseInt(item.textContent, 10);
  });
  return total;
}
