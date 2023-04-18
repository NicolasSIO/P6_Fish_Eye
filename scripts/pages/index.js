import Api from "../api/api.js";
import PhotographerFactory from "../factories/photographerFactory.js";
import PhotographerCard from "../templates/photographerCard.js";

class Index {
  constructor() {
    this.$photographersSection = document.querySelector(
      ".photographer_section"
    );

    this.photographerApi = new Api("../../data/photographers.json");
  }

  async main() {
    // On récupere les photographes
    const photographerData = await this.photographerApi.getPhotographers();

    const Photographers = photographerData.map(
      (photographer) => new PhotographerFactory(photographer)
    );

    // Permet de créer les cartes pour chaque photographes
    Photographers.forEach((photographer) => {
      const Template = new PhotographerCard(photographer);
      this.$photographersSection.appendChild(
        Template.createPhotographerCardDOM()
      );
    });
  }
}

const index = new Index();
index.main();
