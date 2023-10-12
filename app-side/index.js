import {MessageBuilder} from "../lib/zeppos/message";
import { DataProviderFactory } from "./DataProviderFactory";

const messageBuilder = new MessageBuilder();
const TEMPORARY_KEYS = [
  "stations_query",
  "rq_cities_load",
  "available_cities",
  "available_stations",
]

class SideServiceHandler {
  constructor() {
    this.provider = null;
    this.dbCitites = {};
    this.dbStations = null;
    this.locationShowMode = "current";
  }

  /**
   * Start side service
   */
  start() {
    for(const key of TEMPORARY_KEYS)
      settings.settingsStorage.removeItem(key);

    try {
      this.locationShowMode = JSON.parse(settings.settingsStorage.getItem("location_show_mode"));
    } catch(e) {}

    messageBuilder.listen(() => {});
    messageBuilder.on("request", (ctx) => {
      const request = messageBuilder.buf2Json(ctx.request.payload);
      this.deviceRequest(ctx, request);
    });

    settings.settingsStorage.addListener("change", ({key, newValue, oldValue}) => {
      this.settingChanged(key, oldValue, newValue);
    });
  }

  /**
   * Initializa API data provider
   */
  async init() {
    let provider = "bus62";
    try {
      provider = JSON.parse(settings.settingsStorage.getItem("data_provider"));
    } catch(_) {}

    console.log("Init with data provider", provider);
    this.provider = await DataProviderFactory.getProvider(provider);
  }

  /**
   * Handle request from device
   * 
   * @param {*} ctx 
   * @param {*} payload 
   * @returns 
   */
  async deviceRequest(ctx, payload) {
    console.log("-----", payload);
    switch (payload.action) {
      case "get_stations":
        return await this.deviceListStations(ctx);
      case "get_station_info":
        return await this.deviceStationInfo(ctx, payload.id);
    }
  }

  /**
   * Handle settigns change
   * 
   * @param {*} key 
   * @param {*} oldValue 
   * @param {*} newValue 
   * @returns 
   */
  settingChanged(key, oldValue, newValue) {
    switch(key) {
      case "data_provider":
        this.provider = null;
        this.dbCitites = null;
      case "selected_city":
        settings.settingsStorage.removeItem("available_stations");
        settings.settingsStorage.setItem("stations", "[]");
        this.dbStations = null;
        return;
      case "rq_cities_load":
        return this.updateCitiesList(newValue);
      case "stations_query":
        return this.queryStations(newValue);
      case "location_show_mode":
        this.locationShowMode = JSON.parse(newValue);
    }
  }

  /**
   * Handle list stations request from device
   * 
   * @param {*} ctx 
   */
  async deviceListStations(ctx) {
    const stations = this.getSavedStations().map((row) => {
      return {
        name: row.name,
        description: row.description,
        id: row.id,
        type: row.type,
      }
    });

    ctx.response({
      data: stations
    })
  }

  /**
   * Handle station info request from device.
   * 
   * @param {*} ctx 
   * @param {*} id 
   */
  async deviceStationInfo(ctx, id) {
    const city = settings.settingsStorage.getItem("selected_city");
    console.log("Fetch information about station", id, "in", city);
    if(!this.provider) await this.init();

    try {
      ctx.response({
        data: {
          routes: await this.provider.getUpcomingBuses(city, id),
          showMode: this.locationShowMode,
        },
      });
    } catch(e) {
      ctx.response({
        data: {
          error: e.message,
        }
      });
    }
  }

  /**
   * Handle city change
   */
  async handleCityChange() {
  }

  /**
   * Handle query stations request
   */
  async queryStations(query) {
    if(!this.dbStations) await this.fetchStations();
    query = JSON.parse(query).toLowerCase();

    const available = [];
    if(query) {
      console.log("Querying stations from db...", query);
      for(const row of this.dbStations) {
        if(row.name.toLowerCase().indexOf(query) < 0) continue;
        available.push(row);
      }
    }

    settings.settingsStorage.setItem("available_stations", JSON.stringify(available));
    console.log("Set", "available_stations", available);
  }

  /**
   * Handle fetch stations request
   */
  async fetchStations() {
    const city = settings.settingsStorage.getItem("selected_city");
    console.log("Fetch stations in", city);

    if(!this.provider) await this.init();
    this.dbStations = await this.provider.getStationsList(city);
  }

  /**
   * Handle update cities list request
   */
  async updateCitiesList(newValue) {
    if(newValue !== "1") return;
    console.log("Load list of cities...", newValue);

    if(!this.provider) await this.init();
    this.dbCitites = await this.provider.getCitiesList();

    settings.settingsStorage.setItem("available_cities", JSON.stringify(this.dbCitites));
    settings.settingsStorage.setItem("rq_cities_load", "2")
  }

  /**
   * Get list of saved stations
   */
  getSavedStations() {
    try {
      const stations = settings.settingsStorage.getItem("stations");
      if(!stations) return [];
      return JSON.parse(stations);
    } catch(e) {
      console.log("Can't list stations", e);
      return [];
    }
  }
}


AppSideService({
  onInit() {
    new SideServiceHandler().start();
  },

  onRun() {
  },

  onDestroy() {
  }
})
