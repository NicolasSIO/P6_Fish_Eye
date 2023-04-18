export default class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createPhotographerCardDOM() {
    const $section = document.createElement("article");

    const photographerCard = `
      <a href="photographer.html?id=${this._photographer.id}" class="photographer">
          <img
              alt="${this._photographer.name}"
              src="${this._photographer.portrait}"
              class="photographer-img"
          />
          <h2 class="photographer-name">${this._photographer.name}</h2>
      </a>
      <p class="photographer-details">
          <span class="photographer-location">${this._photographer.city}, ${this._photographer.country}</span>
          <span class="photographer-tagline">${this._photographer.tagline}</span>
          <span class="photographer-price">${this._photographer.price}€/jour</span>
      </p>
    `;

    $section.innerHTML = photographerCard;
    return $section;
  }

  createPhotographerProfileDOM() {
    const $section = document.createElement("article");

    const photographerProfile = `
      <div class="grid-3">
        <h1 class="photograph-name">${this._photographer.name}</h1>
        <p class="photograph-location">${this._photographer.city}, ${this._photographer.country}</p>
        <p class="photograp-tagline">${this._photographer.tagline}</p>
      </div>
      <button class="contact_button tabindex-0" tabindex="0" onclick="displayModal()">
        Contactez-moi
      </button>
      <img
        alt="${this._photographer.name}"
        src="${this._photographer.portrait}"
        class="photographer-img"
      />
    `;

    $section.innerHTML = photographerProfile;
    return $section;
  }
}
