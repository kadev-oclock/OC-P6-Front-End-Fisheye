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
