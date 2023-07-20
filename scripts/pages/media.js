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
    const allMedia = data.media;
    let photographeName = photoData.name;
    let photographeFirstName;
    photographeName = photographeName.replace("-", " ");
    let nameArray;

    const photographeImage = data.media.filter(
      (image) => image.photographerId === photographerId
    );

    // eslint-disable-next-line no-inner-declarations
    function removeLastName(photoName) {
      nameArray = photoName.split(" ");
      nameArray.pop();
      photographeFirstName = nameArray.join(" ");
    }
    // let photographeid;
    removeLastName(photographeName);
    allMedia.forEach((media) => {
      const photographeid = media.photographerId;
    });
    const container = document.querySelector(".photographer_section_photo");
    photographeImage.forEach((image) => {
      if (image.image) {
        const article = document.createElement("article");
        const div = document.createElement("div");
        const photosImage = document.createElement("img");
        photosImage.src = `assets/photographers/${photographeFirstName}/${image.image}`;
        photosImage.alt = image.title; //  l'objet "image" contient également une propriété "alt" pour l'attribut "alt" de l'image.
        container.appendChild(article);
        article.appendChild(div);
        div.className = "photo_img";
        div.appendChild(photosImage);
      } else if (image.video) {
        const article = document.createElement("article");
        const div = document.createElement("div");
        const videoElement = document.createElement("video");
        videoElement.src = `assets/photographers/${photographeFirstName}/${image.video}`;
        videoElement.controls = true;
        videoElement.type = "video/mp4";
        container.appendChild(article);
        article.appendChild(div);
        div.className = "photo_img";
        div.appendChild(videoElement);
      }
    });
  } catch (error) {
    console.error("Erreur lors du chargement des médias:", error);
  }
}
// chargées Les données dans data);
async function init() {
  getMediaId();
  getMedia();
  // displayMediaData(media);
}
init();
