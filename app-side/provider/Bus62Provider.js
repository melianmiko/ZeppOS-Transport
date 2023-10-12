import { DataProvider } from "../DataProvider";
import {generateString} from "../tools";

export class Bus62Provider extends DataProvider {
    constructor() {
        super();
        this.id = "bus62";
        this.name = "Bus62.ru";
        this.description = "Общественный транспорт ряда городов России и Казахстана.";
    }

    async init() {
        const ident = this.getProp("api_ident");
        if(ident) return;
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
    
        this.setProp("api_ident", `${deviceID}_${installationID}`);
    }

    async _doApiRequest(url) {
        const ident = this.getProp("api_ident");
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

    async getCitiesList() {
        const data = await this._doApiRequest("https://api9.bus62.ru/getAllCities.php");
        const availableCities = [];
        for(const row of data) {
          availableCities.push({
            id: row.code,
            name: row.name,
          });
        }
        return availableCities;
    }

    async getStationsList(cityID) {
        const data = await this._doApiRequest(`https://api9.bus62.ru/getAllStations.php?city=${cityID}`);
        const availableStations = [];
        for(const row of data) {
            availableStations.push({
                id: row.id,
                name: row.name,
                description: row.description,
                type: row.type,
            });
        }
        return availableStations;
    }

    async getUpcomingBuses(cityID, stationID) {
        const data = await this._doApiRequest(`https://api9.bus62.ru/getStationForecastsAllTransport.php?city=${cityID}&sid=${stationID}`);
        const output = [];
        const addedNames = [];
    
        let name;
        for(const row of data) {
          name = `${row.rtype}-${row.rnum}`;
          if(addedNames.indexOf(name) > -1 || row.arrt < 0) continue;
          addedNames.push(name);
          output.push({
            name,
            color: this._getColor(name.substring(0, 2)),
            estArriveTime: row.arrt,
            stationNext: row.where,
            stationCurrent: row.last,
          });
        }

        return output;
    }

    _getColor(tag) {
        switch (tag) {
            case "Тр":
                return 0x4CAF50;
            case "А-":
            case "A-":
                return 0xEF5350;
            case "Т-":
            case "T-":
                return 0x26C6DA;
            case "М-":
                return 0xFFA726;
            default:
                return 0x999999;
        }
    }
}