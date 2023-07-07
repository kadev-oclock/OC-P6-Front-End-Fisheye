function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const div = document.createElement("div");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    const cityP = document.createElement("p");
    const countryP = document.createElement("p");
    const priceP = document.createElement("p");
    const taglineP = document.createElement("p");
    h2.textContent = name;
    cityP.textContent = city;
    countryP.textContent = country;
    taglineP.textContent = tagline;
    priceP.innerText = `${price}€/jours`;
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(cityP);
    article.appendChild(countryP);
    article.appendChild(taglineP);
    article.appendChild(priceP);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
