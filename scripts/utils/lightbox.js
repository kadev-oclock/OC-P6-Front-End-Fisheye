// 3. Add a click event to each image thumbnail in the lightbox gallery

const closeLightbox = document.querySelector(".lightbox__close");
closeLightbox.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#lightbox").style.display = "none";
});
