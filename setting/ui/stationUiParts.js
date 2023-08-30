import {StationTypes} from "../../lib/StationTypes";
import {gettext as t} from "i18n";

/**
 * Check that provided array of stations contains provided
 * @param list of stations
 * @param station target
 * @returns {boolean} true if contain
 */
export function stationsListContain(list, station) {
    for(const row of list)
        if(row.id === station.id)
            return true;
    return false;
}

/**
 * "Add" button for station
 * @param alreadyAdded is already added? If true, will use "Added" text instead of button
 * @returns {*} View
 */
export function StationAddButton(alreadyAdded) {
    if(alreadyAdded) return Text({
        style: {
            margin: "8px",
            display: "block",
            width: "90px",
            textAlign: "center",
            color: "#444",
        }
    }, t("Added"));

    return Button({
        label: t("Add"),
        style: {
            margin: "8px",
            boxShadow: "none",
            width: "90px",
            padding: "0px",
            backgroundColor: "#C8E6C9",
            color: "#000000",
        }
    });
}

/**
 * Station delete button
 * @returns {*} View
 */
export function StationDeleteButton() {
    return Button({
        label: t("Delete"),
        style: {
            margin: "8px",
            boxShadow: "none",
            padding: "0px",
            width: "80px",
            backgroundColor: "#DDD",
            color: "#000000",
        }
    });
}

/**
 * Station icon view
 * @param type station type id
 * @returns {*} View
 */
export function StationIcon(type) {
    return View({
        style: {
            margin: "8px",
            width: "24px",
            height: "24px",
            maskImage: StationTypes[type].icon,
            WebkitMaskImage: StationTypes[type].icon,
            backgroundColor: StationTypes[type].prefixColor,
        }
    }, []);
}