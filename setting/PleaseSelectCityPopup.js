import {gettext as t} from "i18n";
import {CenteredPane} from "../lib/mmk/setting/Layout";
import {Paragraph, Title} from "../lib/mmk/setting/Typography";
import {StateManager} from "../lib/mmk/setting/StateManager";
import {PrimaryButton} from "../lib/mmk/setting/Buttons";
import {BottomSheet} from "../lib/mmk/setting/BottomSheet";
import {CityPicker} from "./CityPicker";

/**
 * First run "Select city" popup
 *
 * @param ctx App context
 * @returns {*} View
 */
export function PleaseSelectCityPopup(ctx) {
    const state = new StateManager(ctx, "sc_popup");
    const [loadLevel, setLoadLevel] = state.useSetting("rq_cities_load", 0);

    return CenteredPane([
        Title(t("Select your city to begin")),
        Paragraph(t("We need to know them to show available stations.")),
        PrimaryButton(t("Select city"), () => {
            setLoadLevel(1)
        }),
        BottomSheet(loadLevel !== 0, () => setLoadLevel(0), [
            CityPicker(ctx)
        ])
    ])
}