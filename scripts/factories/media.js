// Récupération des photos depuis le fichier JSON
function mediaTemplate(data) {
  const { id, photographerId, title, image, like, price } = data;

  const pictureMedia = `assets/photographers/${name}/${photographerId}`;

  function getMediaCardDOM() {
    const article = document.createElement("article");

    return {
      name,
      id,
      photographerId,
      title,
      image,
      like,
      price,
      getMediaCardDOM,
    };
  }
}

mediaTemplate();
