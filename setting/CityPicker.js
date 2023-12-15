import {gettext as t} from "i18n";
import {EntryRow} from "../lib/mmk/setting/EntryRow";
import {Spinner} from "../lib/mmk/setting/Spinner";
import {StateManager} from "../lib/mmk/setting/StateManager";
import {Paragraph, Title} from "../lib/mmk/setting/Typography";
import {TextRoot} from "../lib/mmk/setting/Layout";
import { PROVIDERS } from "../app-side/DataProviderFactory";
import { BaseListItem, ListItemText } from "../lib/mmk/setting/ListItem";
import { OptionButtonWithIcon } from "../lib/mmk/setting/Buttons";
import { ARROW_BACK_16 } from "../lib/mmk/setting/Icons";

export function DataProviderPicker(ctx) {
    const state = new StateManager(ctx, "dpc_popup");
    const [_, setProvider] = state.useSetting("data_provider");
    const [__, setLoadLevel] = state.useSetting("rq_cities_load", 0);

    setProvider("bus62");
    setLoadLevel(1);
    return View({}, []);

    // return View({}, [
    //     TextRoot([
    //         Title(t("Select data source")),
    //         Paragraph(t("Different data sources handles different cities in different countries. Pick one which have your one.")),
    //         Paragraph(t("Note: changing of city or data provider will drop currently selected stations"), {color: "#FF9900"}),
    //     ]),
    //     Object.values(PROVIDERS).map((provider) => BaseListItem([
    //         ListItemText(provider.name, provider.description),
    //     ], () => {
    //         setProvider(provider.id);
    //         setLoadLevel(1);
    //     }))
    // ]);
}

/**
 * City picker popup content.
 *
 * @param ctx App context
 * @returns {*} View
 */
export function CityPicker(ctx, callback) {
    const state = new StateManager(ctx, "sc_popup");
    const [loadLevel, setLoadLevel] = state.useSetting("rq_cities_load", 0);
    const [cities, _] = state.useSetting("available_cities");

    if(loadLevel < 1) return DataProviderPicker(ctx);
    if(loadLevel < 2) return Spinner();
    return View({}, [
        // OptionButtonWithIcon(t("Change data source"), ARROW_BACK_16, () => {
        //     setLoadLevel(0)
        // }),
        TextRoot([
            Title(t("Select city")),
        ]),
        ...cities.map((row) => EntryRow({
            label: row.name,
            onClick: () => {
                ctx.settingsStorage.setItem("selected_city_name", row.name);
                ctx.settingsStorage.setItem("selected_city", row.id);
                setLoadLevel(0);
                callback();
            }
        }))
    ]);
}
