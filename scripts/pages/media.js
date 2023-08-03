/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
function getMediaId() {
  // eslint-disable-next-line no-restricted-globals
  return new URL(location.href).searchParams.get("id"); // Retourne l'id
}

/* The `async function getMedia()` is an asynchronous function that fetches data from a JSON file
(`photographers.json`). It then retrieves the media data for a specific photographer based on the
`id` parameter obtained from the URL. */
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
     * The function removes the last name from a given photo name.
     * @param photoName - A string representing the full name of a photographer, including their first name
     * and last name.
     */
    // eslint-disable-next-line no-inner-declarations
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
    function calculLike(photographeImage) {
      const likesParPhotographe = {};
      photographeImage.forEach(item => {
        const photographeId = item.photographerId;
        const likes = item.likes;
        if (likesParPhotographe[photographeId]) {
          likesParPhotographe[photographeId] += likes;
        } else {
          likesParPhotographe[photographeId] = likes;
        }
      });
      return likesParPhotographe;
    }

    // Appel de la fonction pour créer le container 
    const likesParPhotographe = calculLike(photographeImage);
    const pTotalLike = document.createElement("p");
    const pPrice = document.createElement("p");
    containLike.appendChild(pTotalLike);
    containLike.appendChild(pPrice);
    pTotalLike.className = "like-photo-total";
    pPrice.className = "price-photo";

    pTotalLike.textContent = `${Object.values(likesParPhotographe)[0]}❤`;
    pPrice.textContent = `${photoData.price}€ /jours`;





    /* The code `removeLastName(photographeName);` is calling the `removeLastName` function and passing the
    `photographeName` variable as an argument. This function removes the last name from the given
    photographer's name. */
    removeLastName(photographeName);
    allMedia.forEach((media) => {
      // eslint-disable-next-line no-unused-vars
      const photographeid = media.photographerId;
    });

    const container = document.querySelector(".photographer_section_photo");
    photographeImage.forEach((image) => {
      const article = mediaFactory(image, photographeFirstName);
      container.appendChild(article);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des médias", error);
  }
}



// chargées Les données dans data);
async function init() {
  getPhotographer();
  getMediaId();
  getMedia();
  mediaFactory();
  // displayMediaData(media);
}
init();

