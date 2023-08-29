import {StationTypes} from "../../lib/StationTypes";
import {gettext as t} from "i18n";

export function stationsListContain(list, station) {
    for(const row of list)
        if(row.id === station.id)
            return true;
    return false;
}

export function StationAddButton(alreadyAdded) {
    if(alreadyAdded) return Text({
        style: {
            margin: "8px",
            display: "block",
            width: "64px",
            textAlign: "center",
            color: "#444",
        }
    }, t("Added"));

    return Button({
        label: t("Add"),
        style: {
            margin: "8px",
            boxShadow: "none",
            padding: "0px",
            backgroundColor: "#C8E6C9",
            color: "#000000",
        }
    });
}

export function StationDeleteButton(alreadyAdded) {
    return Button({
        label: t("Delete"),
        style: {
            margin: "8px",
            boxShadow: "none",
            padding: "0px",
            backgroundColor: "#DDD",
            color: "#000000",
        }
    });
}

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