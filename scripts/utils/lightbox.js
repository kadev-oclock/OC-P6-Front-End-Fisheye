/**
 * fonction qui ferme la lightbox
 * @date 17/09/2023 - 18:53:03
 */
function closeLightboxOnClick() {
  const closeLightbox = document.querySelector(".lightbox__close");
  closeLightbox.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#lightbox").style.display = "none";
  });
}
closeLightboxOnClick();

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    closeLightboxOnClick();
  }
});

/**
 * Gestionnaire d'événement pour la navigation au clavier à l'intérieur
 * @date 14/09/2023 - 16:39:45
 *
 * @param {*} modal
 */

// Fonction pour gérer la navigation au clavier dans la lightbox
function focusLightbox() {
  const lightboxFocus = document.querySelector("#lightbox");
  const closeButton = document.querySelector(".lightbox__close");
  const nextButton = document.querySelector(".lightbox__next");
  const prevButton = document.querySelector(".lightbox__prev");

  // Gestionnaire d'événement pour la touche Tab
  lightboxFocus.addEventListener("keydown", (event) => {
    const tab = event.key === "Tab";
    const shift = event.shiftKey;

    if (!tab) {
      return;
    }

    const focusableElements = [closeButton, nextButton, prevButton];
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (shift && event.target === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!shift && event.target === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });

  // Mettre en surbrillance le bouton de fermeture lorsque la lightbox s'ouvre
  closeButton.focus();
}

// Appeler cette fonction pour activer la gestion du clavier dans la lightbox
focusLightbox();
