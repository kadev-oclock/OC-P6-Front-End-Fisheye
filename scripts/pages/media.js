/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
function getMediaId() {
  // eslint-disable-next-line no-restricted-globals
  return new URL(location.href).searchParams.get("id");
}

/* fonction getMedia est une fonction asynchrone qui récupère les données d'un fichier JSON
(`photographes.json`). Il récupère ensuite les données multimédias d'un photographe  */
async function getMedia() {
  const reponse = await fetch(`./data/photographers.json`);
  try {
    if (!reponse.ok) {
      throw new Error("pas de données json");
    }
    const data = await reponse.json();
    const id = parseInt(getMediaId(), 10);
    const photoData = data.photographers.find((media) => media.id === id);
    const photographerId = photoData.id;
    const allMedia = data.media;
    let photographeName = photoData.name;
    photographeName = photographeName.replace("-", " ");
    let nameArray;
    let photographeFirstName;
    /**
     * La fonction supprime le nom de famille d'un nom de photo donné.
     * @param photoName - Une chaîne représentant le nom complet d'un photographe, y compris son prénom
     * et le nom de famille.
     */

    function removeLastName(photoName) {
      nameArray = photoName.split(" ");
      nameArray.pop();
      photographeFirstName = nameArray.join(" ");
    }
    const photographeImage = data.media.filter(
      (image) => image.photographerId === photographerId
    );
    // fonction calcul total like
    const containLike = document.querySelector(".contain-like");
    // Appel de la fonction pour créer le container
    const pLike = document.querySelectorAll(".p_like");
    const likesParPhotographe = calculLikeTotal();
    const pTotalLike = document.createElement("p");
    const pPrice = document.createElement("p");
    containLike.appendChild(pTotalLike);
    containLike.appendChild(pPrice);
    pTotalLike.className = "like-photo-total";
    pPrice.className = "price-photo";
    pTotalLike.textContent = `${likesParPhotographe}❤`;
    pPrice.textContent = `${photoData.price}€ /jours`;

    const updateTotalLikes = (newTotalLikes) => {
      pTotalLike.textContent = `${newTotalLikes}❤`;
    };

    /* Le code `removeLastName(photographeName);` appelle la fonction `removeLastName` et transmet le
    variable `photographeName` comme argument. Cette fonction supprime le nom de famille de la donnée
    nom du photographe. */
    removeLastName(photographeName);
    allMedia.forEach((media) => {
      // eslint-disable-next-line no-unused-vars
      const photographeid = media.photographerId;
    });

    const container = document.querySelector(".photographer_section_photo");
    photographeImage.forEach((image) => {
      const article = mediaFactory(image, photographeFirstName, pLike);
      container.appendChild(article);
    });
    updateTotalLikes(calculLikeTotal());
  } catch (error) {
    console.error("Erreur lors du chargement des médias", error);
  }
}

// chargées Les données dans data);
async function init() {
  getMediaId();
  getMedia();
}
init();
