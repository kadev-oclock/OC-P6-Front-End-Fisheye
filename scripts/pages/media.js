/* eslint-disable prettier/prettier */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
function getMediaId() {
  // eslint-disable-next-line no-restricted-globals
  return new URL(location.href).searchParams.get("id");
}


/**
 * fonction getMedia est une fonction asynchrone qui récupère les données d'un fichier JSON
 * @async
 * @returns {*}
 */
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
     * @date 01/09/2023 - 15:51:19
     *
     * @param {*} photoName
     */
    function removeLastName(photoName) {
      nameArray = photoName.split(" ");
      nameArray.pop();
      photographeFirstName = nameArray.join(" ");
    }
    const photographeImage = data.media.filter(
      (image) => image.photographerId === photographerId
    );
    
    /**
     * function filtre photographe 
     * @date 02/09/2023 - 21:43:13
     *
     * @type {*}
     */
    const select = document.querySelector(".select-options");
    const allItemButton = document.getElementById("all-item-btn");
    // eslint-disable-next-line no-unused-vars
    let currentFilter = "all-item"; // Initial state
  
    /**
     * function click sur le chevron "select"
     * @date 02/09/2023 - 21:
    */

    /**
   * Inverse la direction du chevron
   */
    function toggleChevronDirection() {
      const chevron = allItemButton.querySelector("i");
      chevron.classList.toggle("fa-chevron-up");
      chevron.classList.toggle("fa-chevron-down");
    }

    allItemButton.addEventListener("click", () => {
      // Reset the filter to "all-item"
      currentFilter = "all-item";
      toggleChevronDirection();

    });
    
    /**
     * Fonction pour mettre à jour le texte du bouton déroulant avec l'option sélectionnée
     * @date 08/09/2023 - 16:51:18
     *
     * @param {*} selectedOption
     */
    function updateButtonText(selectedOption) {
      const btnText = document.querySelector('#all-item-btn .btn-text');
      btnText.textContent = selectedOption;
    }

    select.addEventListener("click", (e) => {
      const selectedOption = e.target.textContent.trim();
      if(selectedOption !== currentFilter) {
        switch (selectedOption) {
        case "Popularité":
          photographeImage.sort((a, b) => b.likes - a.likes);
          break;
        case "Date":
          photographeImage.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "Titre":
          photographeImage.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
        }
        // Update  filter
        currentFilter = selectedOption;
        // Toggle the chevron direction
        toggleChevronDirection()
            
        // Mettre à jour le texte du bouton déroulant avec l'option sélectionnée
        updateButtonText(selectedOption);
      }
  

      const tab = 0
      const listeArticle = document.querySelectorAll("article")
      let itemsFilter = 0;
      const container = document.querySelector(".photographer_section_photo");
      // vide le container
      container.innerHTML = "";
      listeArticle.forEach((item) => {
        const article = mediaFactory(
          photographeImage[itemsFilter],
          photographeFirstName,
          photographeImage,
          tab 
        );
        item.parentNode.replaceChild(article, item);
        itemsFilter +=1; 
      });
      
    });

    // fonction calcul total like
    const containLike = document.querySelector(".contain-like");
    // Appel de la fonction pour créer le container;
    const likesParPhotographe = calculLikeTotal();
    const pTotalLike = document.createElement("h2");
    const pPrice = document.createElement("h2");
    containLike.appendChild(pTotalLike);
    containLike.appendChild(pPrice);
    pTotalLike.className = "like-photo-total";
    pPrice.className = "price-photo";
    pTotalLike.textContent = `${likesParPhotographe}❤`;
    pPrice.textContent = `${photoData.price}€ /jour`;
    const updateTotalLikes = (newTotalLikes) => {
      pTotalLike.textContent = `${newTotalLikes}❤`;
    };

    /**
     * fonction supprime le nom de famille de la donnée nom du photographe.
     * @param {string}
     */
    
    removeLastName(photographeName);
    allMedia.forEach((media) => {
      // eslint-disable-next-line no-unused-vars
      const photographeid = media.photographerId;
    });

    /**
     * fonction template des données mediaFactory
     * @date 05/09/2023 - 21:26:22
     * 
     * @type {*}
     */
    const container = document.querySelector(".photographer_section_photo");
    let tab = 0;
    
    photographeImage.forEach((image) => {
      const article = mediaFactory(
        image,
        photographeFirstName,
        photographeImage,
        tab
      );
      container.appendChild(article);
      tab = 0;
    });
    select.addEventListener("click", () => {
      photographeImage.forEach((image) => {
        const article = mediaFactory(
          image,
          photographeFirstName,
          photographeImage,
          tab
        );
        container.appendChild(article);
        tab = 0;
      });
    });
    updateTotalLikes(calculLikeTotal());
  } catch (error) {
    console.error("Erreur lors du chargement des médias", error);
  }
}

// 

/**
 * chargées Les données dans data
 * @async
 * @returns {*}
 */
async function init() {
  getMediaId();
  getMedia();
}
init();
