import {StateManager} from "../lib/mmk/setting/StateManager";
import {Input} from "../lib/mmk/setting/Input";
import {gettext as t} from "i18n";
import {BaseListItem, ListItemText} from "../lib/mmk/setting/ListItem";
import {StationAddButton, StationIcon, stationsListContain} from "./ui/stationUiParts";
import {TextRoot} from "../lib/mmk/setting/Layout";
import {Paragraph, Title} from "../lib/mmk/setting/Typography";

/**
 * Add station dialog. Appears when clicking "Add" button at first tab.
 *
 * @param ctx App context
 * @returns {*} View
 */
export function AddStationDialog(ctx) {
    const state = new StateManager(ctx, "st_add_dial");
    const [query, setQuery] = state.useSetting("stations_query", "");

    return View({}, [
            TextRoot([
                Title(t("Add station...")),
                Paragraph(t("Start typing station name in search to add them.")),
            ]),
            Input(t("Search"), query, setQuery),
            ...AvailableStations(ctx),
    ]);
}

/**
 * Available stations list view
 * @param ctx App context
 * @returns {*} View
 */
function AvailableStations(ctx) {
    const state = new StateManager(ctx, "st_add_available");
    const [available, _] = state.useSetting("available_stations", []);
    const [selected, setSelected] = state.useSetting("stations", []);

    return available.map((row) => {
        const added = stationsListContain(selected, row);
        return BaseListItem([
            StationIcon(row.type),
            ListItemText(row.name, row.description),
            StationAddButton(added),
        ], () => {
            if(!added) setSelected([...selected, row])
        });
    });
}
