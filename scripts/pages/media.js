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
    let photographeFirstName;
    photographeName = photographeName.replace("-", " ");
    let nameArray;

    const photographeImage = data.media.filter(
      (image) => image.photographerId === photographerId
    );

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

    /* The code `removeLastName(photographeName);` is calling the `removeLastName` function and passing the
`photographeName` variable as an argument. This function removes the last name from the given
photographer's name. */
    removeLastName(photographeName);
    allMedia.forEach((media) => {
      const photographeid = media.photographerId;
    });

    const container = document.querySelector(".photographer_section_photo");
    photographeImage.forEach((image) => {
      if (image.image) {
        const article = document.createElement("article");
        const div = document.createElement("div");
        const divP = document.createElement("div");
        const pTilte = document.createElement("p");
        const pLike = document.createElement("p");
        const photosImage = document.createElement("img");
        photosImage.src = `assets/photographers/${photographeFirstName}/${image.image}`;
        photosImage.alt = image.title; //  l'objet "image" contient également une propriété "alt" pour l'attribut "alt" de l'image.
        container.appendChild(article);
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
        const article = document.createElement("article");
        const div = document.createElement("div");
        const divP = document.createElement("div");
        const pTilte = document.createElement("p");
        const pLike = document.createElement("p");
        const videoElement = document.createElement("video");
        videoElement.src = `assets/photographers/${photographeFirstName}/${image.video}`;
        videoElement.controls = true;
        videoElement.type = "video/mp4";
        container.appendChild(article);
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
    });
  } catch (error) {
    console.error("Erreur lors du chargement des médias", error);
  }
}
// chargées Les données dans data);
async function init() {
  getMediaId();
  getMedia();
  // displayMediaData(media);
}
init();
