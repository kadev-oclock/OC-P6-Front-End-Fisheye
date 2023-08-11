/* eslint-disable no-undef */
// Récupération des photos depuis le fichier JSON
// eslint-disable-next-line no-unused-vars
// mediaFactory.js
 function handleClick(pLike, image, updateTotalLikes) {
  let n = 0;
  let countLike = parseInt(image.likes, 10);

  return function () {
    n += 1;

    if (n % 2 === 1) {
      // Si le compteur est impair (premier clic), incrémentez les likes
      countLike += 1;
    } else {
      // Si le compteur est pair (deuxième clic), décrémentez les likes
      countLike -= 1;
    }

    // Mettez à jour le contenu de l'élément p_like avec le nouveau nombre de likes
    pLike.textContent = `${countLike}❤`;
    updateTotalLikes(countLike); // Mettre à jour le total de likes
  };
}




function mediaFactory(image, photographeFirstName) {
  const article = document.createElement("article");
  const div = document.createElement("div");
  const divP = document.createElement("div");
  const pTilte = document.createElement("p");
  const pLike = document.createElement("p");
  const photosImage = document.createElement("img");
  const videoElement = document.createElement("video");

  if (image.image) {
    photosImage.src = `assets/photographers/${photographeFirstName}/${image.image}`;
    photosImage.alt = image.title; //  l'objet "image" contient également une propriété "alt" pour l'attribut "alt" de l'image.
    div.appendChild(photosImage);
  } else if (image.video) {
    videoElement.src = `assets/photographers/${photographeFirstName}/${image.video}`;
    videoElement.controls = true;
    videoElement.type = "video/mp4";
    div.appendChild(videoElement);
  }
  article.appendChild(div);
  article.appendChild(divP);
  divP.appendChild(pTilte);
  divP.appendChild(pLike);
  div.className = "photo_img";
  divP.className = "photo_title";
  pTilte.className = "p_title";
  pLike.className = "p_like";
  pTilte.textContent = image.title;
  pLike.textContent = `${image.likes}❤`;

  /**
   * This JavaScript function handles the click event on an element and updates the number of likes
   * displayed based on the number of clicks.
   */
  //pLike.addEventListener("click", handleClick(pLike, image, updateTotalLikes));
  pLike.addEventListener("click", function() {
    let n = 0;
    let countLike = parseInt(image.likes, 10);
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
    //updateTotalLikes(countLike); // Mettre à jour le total de likes
    console.log('countLike = ' + countLike);
    // Ajouter ici le recalcul du nombre total de likes sur la page
    // Puis la mise à jour de l'affichage avec ce nombre calculé
    calculLike();
  });
  
  return article;
}

const updateTotalLikes = (newTotalLikes) => {
  pTotalLike.textContent = `${newTotalLikes}❤`;
};