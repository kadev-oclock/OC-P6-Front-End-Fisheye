// 3. Add a click event to each image thumbnail in the lightbox gallery

function closeLightboxOnClick() {
  const closeLightbox = document.querySelector(".lightbox__close");
  closeLightbox.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#lightbox").style.display = "none";
  });
}

// Appeler la fonction pour activer le gestionnaire d'événements
closeLightboxOnClick();

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightboxOnClick();
  }
});

/**
 * Gestionnaire d'événement pour la navigation au clavier à l'intérieur
 * @date 14/09/2023 - 16:39:45
 *
 * @param {*} modal
 */

function focusLightbox() {
  const lightboxFocus = document.querySelector("#lightbox");

  lightboxFocus.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      const focusableElements = lightboxFocus.querySelectorAll("button");
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    }
  });

  // Mettre en surbrillance le premier élément focusable lorsque la lightbox s'ouvre
  const focusableElements = lightboxFocus.querySelectorAll("button");
  const firstElement = focusableElements[0];
  if (firstElement) {
    firstElement.focus();
  }
}

focusLightbox();
