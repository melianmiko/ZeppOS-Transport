import {generateString} from "./tools";
import {MessageBuilder} from "../lib/zeppos/message";

const messageBuilder = new MessageBuilder();
const TEMPORARY_KEYS = [
  "stations_query",
  "rq_cities_load",
  "available_cities",
  "available_stations",
]

class SideServiceHandler {
  constructor() {
    this.dbCitites = {};
    this.dbStations = null;

    let showMode = "current";
    try {
      showMode = JSON.parse(settings.settingsStorage.getItem("location_show_mode"));
    } catch(e) {}

    this.locationShowMode = showMode;
  }

  start() {
    for(const key of TEMPORARY_KEYS)
      settings.settingsStorage.removeItem(key);

    messageBuilder.listen(() => {});
    messageBuilder.on("request", (ctx) => {
      const request = messageBuilder.buf2Json(ctx.request.payload);
      this.deviceRequest(ctx, request);
    });

    settings.settingsStorage.addListener("change", ({key, newValue, oldValue}) => {
      this.settingChanged(key, oldValue, newValue);
    });
  }

  async deviceRequest(ctx, payload) {
    console.log("-----", payload);
    switch (payload.action) {
      case "get_stations":
        return await this.deviceListStations(ctx);
      case "get_station_info":
        return await this.deviceStationInfo(ctx, payload.id);
    }
  }

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

  async deviceStationInfo(ctx, id) {
    const city = settings.settingsStorage.getItem("selected_city");
    console.log("Fetch information about station", id, "in", city);

    let data;
    try {
      data = await this.doApiRequest(`https://api9.bus62.ru/getStationForecastsAllTransport.php?city=${city}&sid=${id}`);
    } catch(e) {
      return ctx.response({
        data: {error: e.message}
      });
    }

    const output = [];
    const addedNames = [];

    let name;
    for(const row of data) {
      name = `${row.rtype}-${row.rnum}`;
      if(addedNames.indexOf(name) > -1 || row.arrt < 0) continue;
      addedNames.push(name);
      output.push({
        name,
        est: row.arrt,
        goesTo: row.where,
        current: row.last,
      });
    }

    ctx.response({
      data: {
        routes: output,
        showMode: this.locationShowMode,
      },
    });
  }

  settingChanged(key, oldValue, newValue) {
    switch(key) {
      case "selected_city":
        return this.handleCityChange();
      case "rq_cities_load":
        return this.updateCitiesList(newValue);
      case "stations_query":
        return this.queryStations(newValue);
      case "location_show_mode":
        this.locationShowMode = JSON.parse(newValue);
    }
  }

  async updateCitiesList(newValue) {
    if(newValue !== "1") return;
    console.log("Load list of cities...", newValue);

    const data = await this.doApiRequest("https://api9.bus62.ru/getAllCities.php");
    const availableCities = [];
    this.dbCitites = {};
    for(const row of data) {
      this.dbCitites[row.code] = row;
      availableCities.push({
        code: row.code,
        name: row.name,
      })
    }

    settings.settingsStorage.setItem("available_cities", JSON.stringify(availableCities));
    settings.settingsStorage.setItem("rq_cities_load", "2")
    console.log("Cities list ready");
  }

  async handleCityChange() {
    settings.settingsStorage.removeItem("available_stations");
    settings.settingsStorage.setItem("stations", "[]");
    this.dbStations = null;
  }

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

  async fetchStations() {
    const city = settings.settingsStorage.getItem("selected_city");
    console.log("Fetch stations in", city);

    this.dbStations = await this.doApiRequest(`https://api9.bus62.ru/getAllStations.php?city=${city}`);
  }

  getSavedStations() {
    try {
      const stations = settings.settingsStorage.getItem("stations");
      return JSON.parse(stations);
    } catch(e) {
      console.log("Can't list stations", e);
      return [];
    }
  }

  async doApiRequest(url) {
    const ident = settings.settingsStorage.getItem("api_ident");
    if(!ident)
      await this.setupIdentifiers();

    const res = await fetch({
      method: "GET",
      url,
      headers: {
        "User-Agent": `okhttp_${ident}`
      }
    });
    if(res.status !== 200) throw new Error("Status code != 200");
    return typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
  }

  /**
   * Generate new IDs and register them into API
   * @returns {Promise<void>}
   */
  async setupIdentifiers() {
    const deviceID = generateString(16);
    const installationID = generateString(8);

    console.log("Registering device ident...");
    const resp = await fetch({
      method: "GET",
      url: `https://api9.bus62.ru/addStat.php?is=${installationID}&id=${deviceID}`,
      headers: {
        "User-Agent": `okhttp_${deviceID}`
      }
    });
    console.log("Registration result:", resp);

    settings.settingsStorage.setItem("api_ident", `${deviceID}_${installationID}`);
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
