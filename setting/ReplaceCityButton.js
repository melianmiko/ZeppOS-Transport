import {BottomSheet} from "../lib/mmk/setting/BottomSheet";
import {CityPicker} from "./CityPicker";
import {StateManager} from "../lib/mmk/setting/StateManager";
import {OptionButtonWithIcon} from "../lib/mmk/setting/Buttons";
import {LOCATION_16} from "../lib/mmk/setting/Icons";

/**
 * Change city button, appears at first tab.
 *
 * @param ctx App context
 * @returns {*} View
 */
export function ReplaceCityButton(ctx) {
    const state = new StateManager(ctx, "rc_btn");
    const [open, setOpen] = state.useState(false);

    return View({}, [
        OptionButtonWithIcon(state.get("selected_city_name"), LOCATION_16, () => {
            setOpen(true);
        }),
        BottomSheet(open, () => setOpen(false), [
            CityPicker(ctx, () => setOpen(false)),
        ]),
    ])
}