/* eslint-disable no-unused-vars */

/**
 * Fonction pour ouvrir la modale
 * @date 14/09/2023 - 16:23:58
 */
const displayModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Empêcher le défilement de la page sous la modale
  const focusableElements = modal.querySelectorAll("input, textarea, button");
  const firstElement = focusableElements[0];
  firstElement.focus();
};

/**
 * Fonction pour fermer la modale
 * @date 14/09/2023 - 16:23:58
 */
const closeModal = () => {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Réactiver le défilement de la page
};

/**
 * Gestionnaire d'événement pour la navigation au clavier à l'intérieur de la modale
 *
 * @param {*} event
 */

document.getElementById("contact").addEventListener("keydown", (event) => {
  const modal = document.getElementById("#contact_modal");
  if (modal.style.display === "block") {
    const focusableElements = modal.querySelectorAll("input, textarea, button");
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!event.shiftKey && document.activeElement === lastElement) {
      // Si la touche Tab est pressée sans la touche Shift, passer au premier élément
      firstElement.focus();
      event.preventDefault();
    } else if (event.shiftKey && document.activeElement === firstElement) {
      // Si la touche Tab est pressée avec la touche Shift, passer au dernier élément
      lastElement.focus();
      event.preventDefault();
    } else if (event.key === "echap") {
      closeModal();
    }
  }
});

/** ************************** Formulaire Contacte ************************************ */

/**
 * gestion des erreurs du formaulaire
 * @date 17/09/2023 - 18:51:54
 *
 * @type {boolean}
 */
let erreur = false;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const form = document
  .getElementById("contact")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstname");
    const lastName = document.getElementById("lastname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // Afficher chaque élément dans la console
    console.log("Prénom:", firstName.value);
    console.log("Nom:", lastName.value);
    console.log("Email:", email.value);
    console.log("Message:", message.value);

    if (firstName.value.length < 3) {
      erreur = "Le prénom doit comporter au moins trois caractères";
    }
    if (lastName.value.length < 3) {
      erreur = "Le nom doit comporter au moins trois caractères";
    }
    if (!emailRegex.test(email.value)) {
      erreur = "L'adresse email n'est pas valide";
    }

    const elementsErreur = document.getElementsByClassName("erreur");
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < elementsErreur.length; ++i) {
      elementsErreur[i].textContent = ""; // Efface les messages d'erreur précédents
      elementsErreur[i].style.color = "red";
    }

    if (erreur) {
      e.preventDefault();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < elementsErreur.length; ++i) {
        elementsErreur[i].textContent = erreur;
        elementsErreur[i].removeAttribute("textContent");
      }
    } else {
      // eslint-disable-next-line no-alert
      alert("Formulaire envoyé");
      // Réinitialisez les champs après avoir traité le formulaire
      firstName.value = "";
      lastName.value = "";
      email.value = "";
      message.value = "";
    }
  });
