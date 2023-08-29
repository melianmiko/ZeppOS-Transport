import {gettext as t} from "i18n";
import {EntryRow} from "../lib/mmk/setting/EntryRow";
import {Spinner} from "../lib/mmk/setting/Spinner";
import {StateManager} from "../lib/mmk/setting/StateManager";
import {Title} from "../lib/mmk/setting/Typography";
import {TextRoot} from "../lib/mmk/setting/Layout";

export function CityPicker(ctx) {
    const state = new StateManager(ctx, "sc_popup");
    const [loadLevel, setLoadLevel] = state.useSetting("rq_cities_load", 0);
    const [cities, _] = state.useSetting("available_cities");

    if(loadLevel < 2) return Spinner();
    return View({}, [
        TextRoot([
            Title(t("Select city...")),
        ]),
        ...cities.map((row) => EntryRow({
            label: row.name,
            onClick: () => {
                ctx.settingsStorage.setItem("selected_city_name", row.name);
                ctx.settingsStorage.setItem("selected_city", row.code);
                setLoadLevel(0);
            }
        }))
    ]);
}
