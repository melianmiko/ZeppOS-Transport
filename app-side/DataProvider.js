export class DataProvider {
    constructor() {
        this.id = "interface";
        this.name = "";
        this.description = "";
    }

    /**
     * Perform required initializations
     */
    async init() {
        throw new Error("override me");
    }

    /**
     * Must return a list of available cities.
     * Type: {id: any, name: string}[]
     */
    async getCitiesList() {
        throw new Error("override me");
    }

    /**
     * Must return a list of stations in city.
     * Type: {id: any, type: string, name: string, description: string}[]
     * @param {any} cityId ID of selected city
     */
    async getStationsList(cityId) {
        throw new Error("override me");
    }

    /**
     * Must return list of upcoming buses at station.
     * Type: {name: string, color: number, estArriveTime: number, stationCurrent: string, stationNext: string}[]
     */
    async getUpcomingBuses(cityID, stationID) {
        throw new Error("override me");
    }

    getProp(id, fallback) {
        const prop = settings.settingsStorage.getItem(`${this.id}_${id}`);
        return prop ? prop : fallback;
    }

    setProp(id, value) {
        settings.settingsStorage.setItem(`${this.id}_${id}`, value);
    }
}
