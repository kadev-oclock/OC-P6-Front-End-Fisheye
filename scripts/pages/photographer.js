//  Mettre le code JavaScript lié à la page photographer.html

function getPhotographerId() {
  // eslint-disable-next-line no-restricted-globals
  return new URL(location.href).searchParams.get("id"); // Retourne l'id
}

/* La `async function getPhotographer()` est une fonction qui récupère les données d'un photographe depuis
un fichier JSON. Il utilise la fonction `fetch` pour faire une requête GET au data */
async function getPhotographer() {
  const reponse = await fetch(`./data/photographers.json`);
  try {
    if (!reponse.ok) {
      throw new Error("pas de données json");
    }
    const data = await reponse.json();
    const id = parseInt(getPhotographerId(), 10);
    const photoData = data.photographers.find((photo) => photo.id === id);
    return photoData;
  } catch (error) {
    return [];
  }
}

/* La `fonction asynchrone displayData(templatephoto)` est une fonction qui prend un `templatephoto`
paramètre. Il est responsable de l'affichage des données d'un photographe sur la page Web. */
async function displayData(templatephoto) {
  const photographerHeader = document.querySelector(".photograph-header ");
  const divheaderTitle = document.createElement("div");
  const divImg = document.createElement("div");
  const img = document.createElement("img");
  const picture = `assets/photographers/${templatephoto.portrait}`;
  img.setAttribute("src", picture);
  img.setAttribute("alt", templatephoto.name);
  const h1 = document.createElement("h1");
  h1.textContent = templatephoto.name;
  const buttonDiv = photographerHeader.querySelector("div");
  const p = document.createElement("p");
  p.textContent = `${templatephoto.city}, ${templatephoto.country}`;
  const taglineP = document.createElement("p");
  taglineP.textContent = templatephoto.tagline;
  photographerHeader.insertBefore(divheaderTitle, buttonDiv);
  divImg.className = "profile_img ";
  divheaderTitle.appendChild(h1);
  divheaderTitle.appendChild(p);
  divheaderTitle.appendChild(taglineP);
  photographerHeader.appendChild(divImg);
  divImg.appendChild(img);
}

async function init() {
  // Récupère les datas des photographes
  const templatephoto = await getPhotographer();
  displayData(templatephoto);
}

init();
