function startLightbox() {
  let lightbox = document.querySelector(".lightbox");
  let lightboxClose = document.querySelector(".lightbox-close");
  let lightboxNext = document.querySelector(".lightbox-next");
  let lightboxPrev = document.querySelector(".lightbox-prev");
  let lightboxMedia = document.querySelector(".lightbox-media-container");

  const figures = document.querySelectorAll(".media-container");
  const tabindexs = document.querySelectorAll(".tabindex-0");

  let index = 0;

  figures.forEach((figure) => {
    figure.addEventListener("click", (e) => {
      // On met un tabindex à 1 pour priorisé la lightbox
      figure.setAttribute("tabindex", "1");
      // retourne l'index du media cliqué
      // retourne la variable figures sous forme de tableau
      index = [...figures].indexOf(e.target.parentNode);
      // On test le type de l'élément ciblé
      if (
        e.target.parentNode.parentNode.getAttribute("data-type") === "image"
      ) {
        lightbox.style.display = "block";
        lightbox.classList.add("open");
        // e.target.outerHTML retourne l'HTML de l'élément ciblé
        lightboxMedia.innerHTML = e.target.outerHTML;
        lightboxClose.focus();
      } else {
        lightbox.style.display = "block";
        lightbox.classList.add("open");
        lightboxMedia.innerHTML = e.target.outerHTML;
        // Permet d'ajouter le contrôle de la vidéo
        lightboxMedia.childNodes[0].setAttribute("controls", true);
        lightboxClose.focus();
      }
    });
  });

  // Navigation dans la lightbox
  lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightboxNext.addEventListener("click", () => {
    index++;
    if (index === figures.length) {
      index = 0;
    }
    if ([...figures][index].getAttribute("ata-type") === "video") {
      [...figures][index].childNodes[1].setAttribute("controls", true);
    }
    lightboxMedia.innerHTML = [...figures][index].childNodes[1].outerHTML;
  });

  lightboxPrev.addEventListener("click", () => {
    index--;
    if (index < 0) {
      index = figures.length - 1;
    }
    if ([...figures][index].getAttribute("ata-type") === "video") {
      [...figures][index].childNodes[1].setAttribute("controls", true);
    }
    lightboxMedia.innerHTML = [...figures][index].childNodes[1].outerHTML;
  });

  // Navigation clavier
  document.querySelector("body").addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      //e.keyCode === 13 (entrer)
      case 13:
        if (
          e.target.parentNode.parentNode.getAttribute("data-type") === "image"
        ) {
          lightbox.style.display = "block";
          // e.target.outerHTML retourne l'HTML de l'élément ciblé
          lightboxMedia.innerHTML = e.target.childNodes[1].outerHTML;
          lightboxClose.focus();
          lightbox.classList.add("open");
        } else {
          lightbox.style.display = "block";
          lightboxMedia.innerHTML = e.target.childNodes[1].outerHTML;
          // Permet d'ajouter le contrôle de la vidéo
          lightboxMedia.childNodes[0].setAttribute("controls", true);
          lightboxClose.focus();
          lightbox.classList.add("open");
        }
        break;
      //e.keyCode === 37 (arrowLeft)
      case 37:
        index--;
        if (index < 0) {
          index = figures.length - 1;
        }
        if (
          [...figures][index].parentNode.getAttribute("data-type") === "video"
        ) {
          [...figures][index].childNodes[1].setAttribute("controls", true);
        }
        lightboxMedia.innerHTML = [...figures][index].childNodes[1].outerHTML;
        break;
      //e.keyCode === 39 (arrowRight)
      case 39:
        index++;
        if (index === figures.length) {
          index = 0;
        }
        if (
          [...figures][index].parentNode.getAttribute("data-type") === "video"
        ) {
          [...figures][index].childNodes[1].setAttribute("controls", true);
        }
        lightboxMedia.innerHTML = [...figures][index].childNodes[1].outerHTML;
        break;
    }
  });
}
