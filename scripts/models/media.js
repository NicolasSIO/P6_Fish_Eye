export default class Media {
  constructor(data) {
    this._photographerId = data.photographerId;
    this._id = data.id;
    this._title = data.title;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;

    // Permet de dire si le média est une photo ou une vidéo
    if (data.hasOwnProperty("image")) {
      this._type = "image";
      this._media = data.image;
    } else {
      this._type = "video";
      this._media = data.video;
    }
  }

  get photographerId() {
    return this._photographerId;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get likes() {
    return this._likes;
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }

  get type() {
    return this._type;
  }

  get media() {
    return this._media;
  }
}
