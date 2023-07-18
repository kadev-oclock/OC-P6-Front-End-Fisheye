function getMediaId() {
  // eslint-disable-next-line no-restricted-globals
  return new URL(location.href).searchParams.get("id"); // Retourne l'id
}

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
    console.log(photographerId);
    const imageTitle = media.title;
    // pour chaque photo si photographeid = photographerid , alors tu les mets dans une liste
    photographerId.forEach((media) => {
      const photoImage = document.createElement("img");
      photoImage.src = `assets/photographers/${photographer.name}/${imageTitle}`;
    });
    return data;
  } catch (error) {
    return [];
  }
}

// chargées Les données dans data);
async function displayData(media) {
  const mediaSection = document.querySelector("#photographer-media");
  media.forEach((medias) => {
    // eslint-disable-next-line no-undef
    const mediaGrapherModel = mediaTemplate(medias);
    const mediaCardDOM = mediaGrapherModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
}

async function init() {
  const { media } = await getMedia();
  displayData(media);
}
init();
