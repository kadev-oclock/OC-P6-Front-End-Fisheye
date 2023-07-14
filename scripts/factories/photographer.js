/**
 * The `photographerTemplate` function creates a DOM element representing a photographer's profile
 * card, using the provided data.
 * @param data - The `data` parameter is an object that contains the following properties:
 * @returns The function `photographerTemplate` is returning an object with three properties: `name`,
 * `picture`, and `getUserCardDOM`.
 */

// eslint-disable-next-line no-unused-vars
function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;
  const link = `./photographer.html?id=${id}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const a = document.createElement("a");
    const img = document.createElement("img");
    img.setAttribute("src", picture, "alt", name);
    a.setAttribute("href", link, img);
    const h2 = document.createElement("h2");
    h2.setAttribute("aria-label", name);
    const p = document.createElement("p");
    p.className = "country";
    const priceP = document.createElement("p");
    const taglineP = document.createElement("p");
    h2.textContent = name;
    p.textContent = `${city}, ${country}`;
    taglineP.textContent = tagline;
    priceP.innerText = `${price}€/jours`;
    article.appendChild(a);
    a.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p);
    article.appendChild(taglineP);
    article.appendChild(priceP);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
