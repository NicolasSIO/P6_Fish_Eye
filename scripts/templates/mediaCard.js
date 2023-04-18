export default class MediaCard {
  constructor(media) {
    this._media = media;
  }

  // Permet de changer l'affichage selon le type de média
  createMediaCardDOM() {
    if (this._media.type === "image") {
      return this.createMediaCardImage();
    } else {
      return this.createMediaCardVideo();
    }
  }

  createMediaCardImage() {
    const $section = document.createElement("figure");
    $section.setAttribute("data-type", "image");

    const mediaCard = `
      <div class="media-container" data-like="${this._media.likes}" data-title="${this._media.title}" data-date="${this._media.date}" aria-label="${this._media.title}" tabindex="0">
        <img
          alt="${this._media.title}"
          src="${this._media.media}"
        />
      </div>
      <footer class="footer-figure">
        <p>${this._media.title}</p>
        <p class="like">${this._media.likes} <img src="assets/icons/heartRed.svg" alt="Coeur" class="coeur"/></p>
      </footer>
    `;

    $section.innerHTML = mediaCard;
    return $section;
  }

  createMediaCardVideo() {
    const $section = document.createElement("figure");
    $section.setAttribute("data-type", "video");

    const mediaCard = `
      <div class="media-container" data-like="${this._media.likes}" data-title="${this._media.title}" data-date="${this._media.date}" aria-label="${this._media.title}" tabindex="0">
        <video title="${this._media.title}">
          <source src="${this._media.media}" type="video/mp4">
          Votre navigateur ne prend pas en charge la vidéo.
        </video>
      </div>
      <footer class="footer-figure">
        <p>${this._media.title}</p>
        <p class="like">${this._media.likes} <img src="assets/icons/heartRed.svg" alt="Coeur" class="coeur"/></p>
      </footer>
    `;

    $section.innerHTML = mediaCard;
    return $section;
  }
}
