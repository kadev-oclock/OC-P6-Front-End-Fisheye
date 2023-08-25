/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/* template des photos */
function mediaFactory(image, photographeFirstName, photographeImage) {
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
    photosImage.className = "media";
    div.appendChild(photosImage);
  } else if (image.video) {
    videoElement.src = `assets/photographers/${photographeFirstName}/${image.video}`;
    videoElement.className = "media";
    videoElement.controls = true;
    videoElement.type = "video/mp4";
    div.appendChild(videoElement);
  }
  // Ajoutez un attribut ARIA-label pour décrire le contenu de l'article
  photosImage.setAttribute("aria-label", image.title);
  article.setAttribute("role", "img");
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
  // Ajoutez un attribut tabindex pour rendre l'article focusable
  photosImage.tabIndex = 0;

  // Gérez le focus pour l'article
  photosImage.addEventListener("focus", function () {
    // Ajoutez une classe CSS pour mettre en évidence le focus visuel
    this.classList.add("focus-highlight");
  });

  photosImage.addEventListener("blur", function () {
    // Supprimez la classe CSS lorsque le focus est perdu
    this.classList.remove("focus-highlight");
  });
  const displayMedia = (element) => {
    element.addEventListener("click", () => {
      // eslint-disable-next-line no-use-before-define
      mediaLightbox(image, photographeFirstName, photographeImage);
      document.querySelector("#lightbox").style.display = "block";
    });
  };
  displayMedia(photosImage);
  displayMedia(videoElement);

  return article;
}

function mediaLightbox(image, photographeFirstName, photographeImage) {
  const ligthboxElement = document.querySelector(".lightbox__container");
  const removeChild = () => {
    let first = ligthboxElement.firstElementChild;
    while (first) {
      first.remove();
      first = ligthboxElement.firstElementChild;
    }
  };
  removeChild();
  let pTitle = document.createElement("p");
  let indexImage = 0;
  let displayImage = image;
  pTitle.className = "p_title";
  pTitle.textContent = image.title;
  photographeImage.forEach((element, index) => {
    if (element.id === image.id) {
      indexImage = index;
      displayImage = element;
    }
  });
  // Ajout des gestionnaires d'événements pour les boutons de navigation

  const buildMedia = (media) => {
    if (media.image != null) {
      const photosLightbox = document.createElement("img");
      photosLightbox.id = "image";
      photosLightbox.src = `assets/photographers/${photographeFirstName}/${photographeImage[indexImage].image}`;
      ligthboxElement.appendChild(photosLightbox);
    } else if (media.video != null) {
      const videoElement = document.createElement("video");
      videoElement.id = "video";
      videoElement.src = `assets/photographers/${photographeFirstName}/${photographeImage[indexImage].video}`;
      videoElement.controls = true;
      videoElement.type = "video/mp4";
      ligthboxElement.appendChild(videoElement);
    }
    pTitle.textContent = media.title;
    ligthboxElement.appendChild(pTitle);
  };

  const prevButton = document.querySelector(".lightbox__prev");
  prevButton.setAttribute("aria-label", "précédent");
  prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (indexImage > 0) {
      removeChild();
      indexImage -= 1;
    } else if (indexImage === 0) {
      removeChild();
      indexImage = photographeImage.length - 1;
    }
    displayImage = photographeImage[indexImage];
    buildMedia(displayImage);
  });

  // Ajout des gestionnaires d'événements pour les boutons de navigation
  const nextButton = document.querySelector(".lightbox__next");
  nextButton.setAttribute("aria-label", "suivant");
  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (indexImage < photographeImage.length - 1) {
      removeChild();
      indexImage += 1;
    } else if (indexImage === photographeImage.length - 1) {
      removeChild();
      indexImage = 0;
    }
    displayImage = photographeImage[indexImage];
    buildMedia(displayImage);
  });
  buildMedia(displayImage);
  return ligthboxElement;
}
