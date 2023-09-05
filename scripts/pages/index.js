// step one fetch data et faire  un console.log

async function getPhotographers() {
  const reponse = await fetch("./data/photographers.json");
  try {
    if (!reponse.ok) {
      throw new Error("pas de données json");
    }
    const data = await reponse.json();
    return data;
  } catch (error) {
    return [];
  }
}

const tab = 0;
// console.log("Les données ont été chargées : ", data);
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM(tab);
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
