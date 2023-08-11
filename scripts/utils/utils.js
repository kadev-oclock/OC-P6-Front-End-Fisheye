function calculLike() {
    /*
    1. Récupérer tous les p_like.
    2. Parcourir la liste des p_like et additionner les valeurs pour obtenir le total de likes.
    3. Mettre à jour l'élément HTML qui contient le total des likes en bas de page.
    */
    let total = 0;
    const likeTotal = document.querySelectorAll(".p_like");
    console.log(likeTotal);
    likeTotal.forEach(item => {
      total = total + parseInt(item.textContent);
    });
    console.log('total='+total);
    return total;
  }
  