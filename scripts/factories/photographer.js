/* eslint-disable func-names */
/**
 * La fonction `photographerTemplate` crée un élément DOM représentant le profil d'un photographe
 * carte, en utilisant les données fournies.
 */

// eslint-disable-next-line no-unused-vars
function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;
  const link = `./photographer.html?id=${id}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const divImg = document.createElement("div");
    const a = document.createElement("a");
    // creation image et lien url
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name, "aria-label", name);
    a.setAttribute("href", link, img);
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    p.className = "country";
    const priceP = document.createElement("p");
    const taglineP = document.createElement("p");
    h2.textContent = name;
    p.textContent = `${city}, ${country}`;
    taglineP.textContent = tagline;
    priceP.innerText = `${price}€/jours`;
    divImg.appendChild(a);
    a.appendChild(img);
    article.appendChild(divImg);
    article.appendChild(h2);
    article.appendChild(p);
    article.appendChild(taglineP);
    article.appendChild(priceP);
    // Ajoutez un attribut ARIA-label pour décrire le contenu de l'article
    img.setAttribute("aria-label", `Photographe ${name}`);
    // Ajoutez un attribut tabindex pour rendre l'article focusable
    img.tabIndex = 0;

    // Gérez le focus pour l'article
    // eslint-disable-next-line func-names
    img.addEventListener("focus", function () {
      // Ajoutez une classe CSS pour mettre en évidence le focus visuel
      this.classList.add("focus-highlight");
    });

    img.addEventListener("blur", function () {
      // Supprimez la classe CSS lorsque le focus est perdu
      this.classList.remove("focus-highlight");
    });

    return article;
  }
  return { name, picture, getUserCardDOM };
}
