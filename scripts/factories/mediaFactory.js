import Media from "../models/media.js";

export default class MediaFactory {
  constructor(media) {
    return new Media(media);
  }
}
