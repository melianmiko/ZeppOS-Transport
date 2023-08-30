import {gettext as t} from "i18n";
import {TextRoot} from "../lib/mmk/setting/Layout";
import {Title} from "../lib/mmk/setting/Typography";
import {StateManager} from "../lib/mmk/setting/StateManager";
import {RadioListItem} from "../lib/mmk/setting/Forms";

/**
 * App settings pane. Content of second tab.

 * @param ctx App contet
 * @returns {*[]} View(s)
 */
export function AppSettingsPane(ctx) {
    const state = new StateManager(ctx, "app_cfg");
    const [locMode, setLocMode] = state.useSetting("location_show_mode", "current");
    console.log(locMode);

    return [
        TextRoot([
            Title(t("Bus location display mode"))
        ]),
        RadioListItem(t("Between ... and ..."), locMode === "full", () => setLocMode("full")),
        RadioListItem(t("Goes to ..."), locMode === "goesTo", () => setLocMode("goesTo")),
        RadioListItem(t("Now at ..."), locMode === "current", () => setLocMode("current")),
    ]
}