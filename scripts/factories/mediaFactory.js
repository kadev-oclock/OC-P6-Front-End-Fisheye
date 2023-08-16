/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/* template des photos */
function mediaFactory(image, photographeFirstName) {
  const article = document.createElement("article");
  const div = document.createElement("div");
  const divP = document.createElement("div");
  const pTitle = document.createElement("p");
  const pLike = document.createElement("p");
  const photosImage = document.createElement("img");
  const videoElement = document.createElement("video");

  if (image.image) {
    photosImage.src = `assets/photographers/${photographeFirstName}/${image.image}`;
    photosImage.alt = image.title;
    div.appendChild(photosImage);
  } else if (image.video) {
    videoElement.src = `assets/photographers/${photographeFirstName}/${image.video}`;
    videoElement.controls = true;
    videoElement.type = "video/mp4";
    div.appendChild(videoElement);
  }
  article.appendChild(div);
  article.appendChild(divP);
  divP.appendChild(pTitle);
  divP.appendChild(pLike);
  div.className = "photo_img";
  divP.className = "photo_title";
  pTitle.className = "p_title";
  pLike.className = "p_like";
  pTitle.textContent = image.title;
  pLike.textContent = `${image.likes}❤`;

  /**
   * function handles click mise à jours des likes
   * sur le nombres de  clicks.
   */
  let n = 0;
  let countLike = parseInt(image.likes, 10);

  const updateTotalLikes = (newTotalLikes) => {
    const pTotalLike = document.querySelector("p.like-photo-total");
    pTotalLike.textContent = `${newTotalLikes}❤`;
  };

  pLike.addEventListener("click", function () {
    n += 1;
    if (n % 2 === 1) {
      // Si le compteur est impair (premier clic), incrémentez les likes
      countLike += 1;
    } else {
      // Si le compteur est pair (deuxième clic), décrémentez les likes
      countLike -= 1;
    }
    // Mettez à jour le contenu de l'élément p_like avec le nouveau nombre de likes
    this.textContent = `${countLike}❤`;
    // mise à jour de l'affichage avec ce nombre calculé
    updateTotalLikes(calculLikeTotal());
  });
  return article;
}
