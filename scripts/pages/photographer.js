import Api from "../api/api.js";
import PhotographerCard from "../templates/photographerCard.js";
import MediaFactory from "../factories/mediaFactory.js";
import MediaCard from "../templates/mediaCard.js";

class Photographer {
  constructor() {
    this.$photographersSection = document.querySelector(".photograph-header");
    this.$mediasSection = document.querySelector(".media_article");

    this.photographerApi = new Api("../../data/photographers.json");
  }

  async main() {
    // On récupere l'id du photographe dans l'URL
    let params = new URLSearchParams(document.location.search);
    let id = parseInt(params.get("id"));

    // On récupere les infos du photographe grâce à son id
    const photographerData = await this.photographerApi.getId(id);

    const PhotographerProfile = new PhotographerCard(photographerData);
    this.$photographersSection.appendChild(
      PhotographerProfile.createPhotographerProfileDOM()
    );

    // On récupere les médias du photographe
    const mediaData = await this.photographerApi.getMedia(id);

    const Medias = mediaData.map((media) => new MediaFactory(media));

    let likes = 0;

    // On créer les cartes pour les médias et on récupere les likes
    Medias.forEach((media) => {
      const Template = new MediaCard(media);
      this.$mediasSection.appendChild(Template.createMediaCardDOM());
      likes += media.likes;
    });

    // On ajoute incrémente les likes quand on clique sur le coeur
    let coeurs = document.querySelectorAll(".like");
    coeurs.forEach((coeur) => {
      coeur.addEventListener("click", () => {
        if (!coeur.classList.contains("liked")) {
          let likeMedia = parseInt(coeur.childNodes[0].nodeValue) + 1;
          likes++;
          coeur.innerHTML = `${likeMedia} <img src="assets/icons/heartRed.svg" alt="Coeur" class="coeur"/>`;
          document.querySelector(
            ".likes"
          ).innerHTML = `${likes} <img src="assets/icons/heartBlack.svg" alt="Coeur" class="coeur"/>`;
          coeur.classList.add("liked");
        }
      });
      // Navigation clavier pour les likes
      coeur.addEventListener("keyup", (e) => {
        if (e.keyCode === 13)
          if (!coeur.classList.contains("liked")) {
            let likeMedia = parseInt(coeur.childNodes[0].nodeValue) + 1;
            likes++;
            coeur.innerHTML = `${likeMedia} <img src="assets/icons/heartRed.svg" alt="Coeur" class="coeur"/>`;
            document.querySelector(
              ".likes"
            ).innerHTML = `${likes} <img src="assets/icons/heartBlack.svg" alt="Coeur" class="coeur"/>`;
            coeur.classList.add("liked");
          }
      });
    });

    // Gestion du tri
    document.querySelector(".list-tri").addEventListener("click", (e) => {
      e.target.parentNode.parentNode.style.overflow = "visible";
      if (
        !e.target.parentNode.childNodes[2].nextSibling.classList.contains(
          "reverse-arrow-tri"
        )
      ) {
        e.target.parentNode.childNodes[2].nextSibling.classList.remove(
          "arrow-tri"
        );
        e.target.parentNode.childNodes[2].nextSibling.classList.add(
          "reverse-arrow-tri"
        );
      } else {
        e.target.parentNode.childNodes[2].nextSibling.classList.remove(
          "reverse-arrow-tri"
        );
        e.target.parentNode.childNodes[2].nextSibling.classList.add(
          "arrow-tri"
        );
      }

      this.sort();
    });

    // Affiche le cadre avec les likes et le tarif du photographe
    document.querySelector(
      ".likes"
    ).innerHTML = `${likes} <img src="assets/icons/heartBlack.svg" alt="Coeur" class="coeur"/>`;
    document.querySelector(
      ".price"
    ).innerHTML = `${PhotographerProfile._photographer.price}€ / jour`;

    // Navigation clavier
    const body = document.querySelector("body");
    body.addEventListener("keyup", (e) => {
      // e.keyCode === 27 (echap)
      if (e.keyCode === 27) {
        if (
          document.getElementById("contact_modal").classList.contains("open")
        ) {
          document.getElementById("contact_modal").classList.remove("open");
          document.getElementById("contact_modal").style.display = "none";
        }
        if (document.querySelector(".lightbox").classList.contains("open")) {
          document.querySelector(".lightbox").classList.remove("open");
          document.querySelector(".lightbox").style.display = "none";
        }
      }
    });

    startLightbox();
    submit();
  }

  sort() {
    let figures = document.getElementsByTagName("figure");
    let tri = document.querySelector("ul");
    let selectedTri = document.querySelector(".selected-tri");
    let indexesArray = Array.from(figures);
    tri.addEventListener("click", () => {
      console.log(
        tri.childNodes[3].nextSibling.nextSibling.innerHTML === "Date"
      );
      // tri selon les likes
      if (tri.childNodes[2].nextSibling.innerHTML === "Popularité") {
        let sorted = indexesArray.sort((a, b) => {
          a = a.childNodes[1].getAttribute("data-like");
          b = b.childNodes[1].getAttribute("data-like");
          return b - a;
        });
        document.querySelector(".media_article").innerHTML = "";
        sorted.forEach((e) =>
          document.querySelector(".media_article").appendChild(e)
        );
        selectedTri.innerHTML = tri.childNodes[2].nextSibling.innerHTML;
      } // tri selon la date
      else if (tri.childNodes[3].nextSibling.nextSibling.innerHTML === "Date") {
        let sorted = indexesArray.sort((a, b) => {
          a = new Date(a.childNodes[1].getAttribute("data-date")).getTime();
          b = new Date(b.childNodes[1].getAttribute("data-date")).getTime();
          return a > b ? 1 : -1;
        });
        document.querySelector(".media_article").innerHTML = "";
        sorted.forEach((e) => {
          document.querySelector(".media_article").appendChild(e);
        });
        selectedTri.innerHTML = "Date";
      } // tri selon le titre
      else {
        let sorted = indexesArray.sort((a, b) => {
          a = a.childNodes[1].getAttribute("data-title");
          b = b.childNodes[1].getAttribute("data-title");
          return a.localeCompare(b);
        });
        document.querySelector(".media_article").innerHTML = "";
        sorted.forEach((e) =>
          document.querySelector(".media_article").appendChild(e)
        );
        document.querySelector(".selected-tri").innerHTML =
          tri.childNodes[2].nextSibling.innerHTML;
      }
      document.querySelector(".list-tri").style.overflow = "hidden";
    });
  }
}

const photographer = new Photographer();
photographer.main();
