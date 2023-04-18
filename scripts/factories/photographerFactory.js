import Photographer from "../models/photographer.js";

export default class PhotographerFactory {
  constructor(photographer) {
    return new Photographer(photographer);
  }
}
