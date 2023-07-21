/* eslint-disable no-undef */
// Récupération des photos depuis le fichier JSON
// eslint-disable-next-line no-unused-vars
function mediaFactory(image, photographeFirstName) {
  const article = document.createElement("article");
  if (image.image) {
    const div = document.createElement("div");
    const divP = document.createElement("div");
    const pTilte = document.createElement("p");
    const pLike = document.createElement("p");
    const photosImage = document.createElement("img");
    photosImage.src = `assets/photographers/${photographeFirstName}/${image.image}`;
    photosImage.alt = image.title; //  l'objet "image" contient également une propriété "alt" pour l'attribut "alt" de l'image.
    article.appendChild(div);
    div.className = "photo_img";
    div.appendChild(photosImage);
    article.appendChild(divP);
    divP.className = "photo_title";
    divP.appendChild(pTilte);
    divP.appendChild(pLike);
    pTilte.className = "p_title";
    pLike.className = "p_like";
    pTilte.textContent = image.title;
    pLike.textContent = `${image.likes}❤`;
  } else if (image.video) {
    const div = document.createElement("div");
    const divP = document.createElement("div");
    const pTilte = document.createElement("p");
    const pLike = document.createElement("p");
    const videoElement = document.createElement("video");
    videoElement.src = `assets/photographers/${photographeFirstName}/${image.video}`;
    videoElement.controls = true;
    videoElement.type = "video/mp4";
    article.appendChild(div);
    div.className = "photo_img";
    div.appendChild(videoElement);
    article.appendChild(divP);
    divP.className = "photo_title";
    divP.appendChild(pTilte);
    divP.appendChild(pLike);
    pTilte.className = "p_title";
    pLike.className = "p_like";
    pTilte.textContent = image.title;
    pLike.textContent = `${image.likes}❤`;
  }
  return article;
}
