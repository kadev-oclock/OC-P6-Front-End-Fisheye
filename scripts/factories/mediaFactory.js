/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * function mediaFactory structure la page des photographes
 * @param {*} image
 * @param {*} photographeFirstName
 * @param {*} photographeImage
 * @param {*} tabIndex
 * @returns  article
 */
function mediaFactory(image, photographeFirstName, photographeImage, tabIndex) {
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
    videoElement.controls = "";
    videoElement.type = "video/mp4";
    div.appendChild(videoElement);
  }
  // Ajoutez un attribut ARIA-label pour décrire le contenu de l'article
  // photosImage.setAttribute("aria-label", `image:${image.title}`);
  article.setAttribute("role", "img");
  article.setAttribute("tabIndex", tabIndex);
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
  pLike.setAttribute("tabIndex", tabIndex);
  pLike.setAttribute("role", "button");

  let n = 0;
  let countLike = parseInt(image.likes, 10);

  const updateTotalLikes = (newTotalLikes) => {
    const pTotalLike = document.querySelector("h2.like-photo-total");
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
    // Mise à jour du contenu de l'élément p_like avec le nouveau nombre de likes
    this.textContent = `${countLike}❤`;
    // mise à jour de l'affichage avec ce nombre calculé
    updateTotalLikes(calculLikeTotal());
  });

  /**
   *  Ajout un gestionnaire d'événements pour la touche "Espace"
   * @date 12/09/2023 - 17:43:40
   *
   * @param {*} e
   */

  // Ajoute un gestionnaire d'événements pour la touche "Espace" et "Entrée"
  pLike.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      n += 1;
      if (n % 2 === 1) {
        // Si le compteur est impair (premier clic), incrémentez les likes
        countLike += 1;
      } else {
        // Si le compteur est pair (deuxième clic), décrémentez les likes
        countLike -= 1;
      }
      // Mise à jour du contenu de l'élément p_like avec le nouveau nombre de likes
      this.textContent = `${countLike}❤`;
      // mise à jour de l'affichage avec ce nombre calculé
      updateTotalLikes(calculLikeTotal());
      event.preventDefault();
    }
  });

  // Fonction pour gérer les événements clavier
  const handleKeyboardNavigation = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      // Si la touche est "Enter" ou "Espace", ouvrez la lightbox
      // eslint-disable-next-line no-use-before-define
      mediaLightbox(image, photographeFirstName, photographeImage);
      document.querySelector("#lightbox").style.display = "block";
      const prevButton = document.querySelector(".lightbox__prev");
      const prevButtonFocusTimeout = setTimeout(() => {
        prevButton.focus();
        clearTimeout(prevButtonFocusTimeout);
      }, 100);
    }
    if (e.key === "escape") {
      document.querySelector("#lightbox").style.display = "none";
    }
  };
  // Ajouter un gestionnaire d'événements pour les touches du clavier sur l'article
  article.addEventListener("keydown", handleKeyboardNavigation);

  // Gérez le focus pour l'article
  article.addEventListener("focus", function () {
    // Ajoutez une classe CSS pour mettre en évidence le focus visuel
    this.classList.add("focus-highlight");
  });

  article.addEventListener("blur", function () {
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
/**
 *  function mediaLightbox strucure le html  la ligthbox
 * @param {*} image
 * @param {*} photographeFirstName
 * @param {*} photographeImage
 * @returns ligthboxElement
 */
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
  const pTitle = document.createElement("p");
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

  /**
   * ajout des datas pour la lightbox
   * @date 17/09/2023 - 18:50:52
   *
   * @param {*} media
   */
  const buildMedia = (media) => {
    if (media.image != null) {
      const photosLightbox = document.createElement("img");
      photosLightbox.id = "image";
      photosLightbox.alt = image.title;
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
  prevButton.setAttribute("type", "button");
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
  nextButton.setAttribute("type", "button");
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

  // Fonction pour gérer les événements clavier
  const handleKeyboardNavigation = (e) => {
    if (e.key === "ArrowLeft") {
      prevButton.click();
    } else if (e.key === "ArrowRight") {
      nextButton.click();
    } else if (e.key === "Escape") {
      // Si la touche est "Escape", fermez la lightbox
      ligthboxElement.style.display = "none";
    }
    // Annuler l'action par défaut pour éviter qu'elle ne soit traitée deux fois.
    e.preventDefault();
  };

  // Ajouter un gestionnaire d'événements pour les touches du clavier sur la lightbox
  document.addEventListener("keydown", (e) => {
    if (ligthboxElement.style.display === "block") {
      handleKeyboardNavigation(e);
    }
  });

  buildMedia(displayImage);

  return ligthboxElement;
}
