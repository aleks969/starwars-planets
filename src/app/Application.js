import config from "../config";
import EventEmitter from "eventemitter3";

const EVENTS = {
  APP_READY: "app_ready",
};

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application extends EventEmitter {
  constructor() {
    super();

    this.config = config;
    this.data = {
      count: 0,
      planets: [],
    };

    this.init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Initializes the app.
   * Called when the DOM has loaded. You can initiate your custom classes here
   * and manipulate the DOM tree. Task data should be assigned to Application.data.
   * The APP_READY event should be emitted at the end of this method.
   */
  async init() {
    // Initiate classes and wait for async operations here.
    const URL = `https://swapi.boom.dev/api/planets/`;
    let next = URL;

    do {
      const res = await fetch(next);
      const planets = await res.json();
      next = planets.next;
      this.data.count = planets.count;
      this.data.planets = [...this.data.planets, ...planets.results];
    } while (next);

    console.log(this.data.count);

    this.emit(Application.events.APP_READY);
  }
}
