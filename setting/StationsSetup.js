import {gettext as t} from "i18n";
import {TextRoot} from "../lib/mmk/setting/Layout";
import {Paragraph, Title} from "../lib/mmk/setting/Typography";
import {FloatingActionButton} from "../lib/mmk/setting/Buttons";
import {ADD_32} from "../lib/mmk/setting/Icons";
import {BottomSheet} from "../lib/mmk/setting/BottomSheet";
import {StateManager} from "../lib/mmk/setting/StateManager";
import {ReplaceCityButton} from "./ReplaceCityButton";
import {AddStationDialog} from "./AddStationDialog";
import {StationDeleteButton, StationIcon} from "./ui/stationUiParts";
import {BaseListItem, ListItemText} from "../lib/mmk/setting/ListItem";
import {FloatingActionButtonHint} from "../lib/mmk/setting/Hints";

/**
 * Stations tab content.
 *
 * @param ctx App context
 * @returns {*} View
 */
export function StationsSetup(ctx) {
    const state = new StateManager(ctx, "st_setup");
    const [newPaneVisible, setNewPaneVisible] = state.useState(false);

    return View({}, [
        ReplaceCityButton(ctx),
        TextRoot([
            Title("Stations"),
            Paragraph("On this page, you can configure your favorite stations that will be available in Transport on your smartwatch.")
        ]),
        FloatingActionButton(ADD_32, () => setNewPaneVisible(true), 64),
        BottomSheet(newPaneVisible, () => setNewPaneVisible(false), [
            AddStationDialog(ctx),
        ]),
        ...SelectedStations(ctx),
    ])
}

/**
 * Selected stations list.
 *
 * @param ctx App context
 * @returns {*|*[]} View(s)
 */
function SelectedStations(ctx) {
    const state = new StateManager(ctx, "st_list");
    const [stations, setStations] = state.useSetting("stations", []);

    if(stations.length === 0)
        return [FloatingActionButtonHint(t("Click here to add your first station"), 64)];

    return stations.map((row) => BaseListItem([
        StationIcon(row.type),
        ListItemText(row.name, row.description),
        StationDeleteButton(),
    ], () => {
        const newStations = stations.filter((i) => i.id !== row.id);
        setStations(newStations);
    }));
}
