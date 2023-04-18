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
        let likeMedia = parseInt(coeur.childNodes[0].nodeValue) + 1;
        likes++;
        coeur.innerHTML = `${likeMedia} <img src="assets/icons/heartRed.svg" alt="Coeur" class="coeur"/>`;
        document.querySelector(
          ".likes"
        ).innerHTML = `${likes} <img src="assets/icons/heartBlack.svg" alt="Coeur" class="coeur"/>`;
      });
    });

    document.querySelector(
      ".likes"
    ).innerHTML = `${likes} <img src="assets/icons/heartBlack.svg" alt="Coeur" class="coeur"/>`;
    document.querySelector(
      ".price"
    ).innerHTML = `${PhotographerProfile._photographer.price}€ / jour`;

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

    this.sort();
  }

  sort() {
    let figures = document.getElementsByTagName("figure");
    let tri = document.querySelector("select");
    let indexesArray = Array.from(figures);
    tri.addEventListener("change", () => {
      // tri selon les likes
      if (tri.value === "popularite") {
        let sorted = indexesArray.sort((a, b) => {
          a = a.childNodes[1].getAttribute("data-like");
          b = b.childNodes[1].getAttribute("data-like");
          return a - b;
        });
        document.querySelector(".media_article").innerHTML = "";
        sorted.forEach((e) =>
          document.querySelector(".media_article").appendChild(e)
        );
      } // tri selon la date
      else if (tri.value === "date") {
        let sorted = indexesArray.sort((a, b) => {
          a = new Date(a.childNodes[1].getAttribute("data-date")).getTime();
          b = new Date(b.childNodes[1].getAttribute("data-date")).getTime();
          return a > b ? 1 : -1;
        });
        document.querySelector(".media_article").innerHTML = "";
        sorted.forEach((e) => {
          document.querySelector(".media_article").appendChild(e);
        });
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
      }
    });
  }
}

const photographer = new Photographer();
photographer.main();
