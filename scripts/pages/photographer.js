/**
 * Description placeholder
 * @date 01/09/2023 - 15:57:30
 *
 * @returns {*}
 */

function getPhotographerId() {
  // eslint-disable-next-line no-restricted-globals
  return new URL(location.href).searchParams.get("id"); // Retourne l'id
}

/**
 * La  function getPhotographer récupère les données d'un photographe depuis
un fichier JSON.
 * @date 01/09/2023 - 15:55:08
 * @async
 * @returns {getPhotographer}
 */
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

/**
 * Description :responsable de l'affichage des données d'un photographe sur la page Web.
 * @date 01/09/2023 - 15:56:12
 * @async
 * @param {*} templatephoto
 * @returns {*} displayData
 */
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
  const h2 = document.createElement("h2");
  h2.textContent = `${templatephoto.city}, ${templatephoto.country}`;
  const taglineP = document.createElement("p");
  taglineP.textContent = templatephoto.tagline;
  photographerHeader.insertBefore(divheaderTitle, buttonDiv);
  divImg.className = "profile_img ";
  divheaderTitle.appendChild(h1);
  divheaderTitle.appendChild(h2);
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
