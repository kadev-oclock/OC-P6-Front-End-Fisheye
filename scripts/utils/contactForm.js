/* eslint-disable no-unused-vars */
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Fonction contact
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
