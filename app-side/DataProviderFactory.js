import { Bus62Provider } from "./provider/Bus62Provider";

export const PROVIDERS = {
    "bus62": new Bus62Provider(),
};

export class DataProviderFactory {
    static async getProvider(id) {
        const obj = PROVIDERS[id];
        await obj.init();
        return obj;
    }
}
