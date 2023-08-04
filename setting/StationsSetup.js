import {gettext as t} from "i18n";
import {Header} from "./ui/Header";
import {SearchField} from "./ui/SearchField";
import {RowWithButton} from "./ui/RowWithButton";
import {StationTypes} from "../lib/StationTypes";
import {Paragraph} from "./ui/Paragraph";

export function StationsSetup(settingsStorage) {
    return View({}, [
        RowWithButton({
            title: t("Current city"),
            subtitle: settingsStorage.getItem("selected_city_name"),
            action: t("Change"),
            onClick: () => {
                settingsStorage.setItem("available_cities", "[]");
            }
        }),
        Header(t("Stations:")),
        Paragraph(t("Start typing station name in search to add them")),
        SearchField({
            placeholder: t("Search"),
            value: settingsStorage.getItem("stations_query"),
            onChange: (v) => {
                console.log(v);
                settingsStorage.setItem("stations_query", v);
            }
        }),
        ...AvailableStations(settingsStorage),
        ...SelectedStations(settingsStorage),
    ])
}

function SelectedStations(settingsStorage) {
    let data = settingsStorage.getItem("stations");
    if(!data || data[0] !== "[") return [];
    data = JSON.parse(data);

    return data.map((row, i) => RowWithButton({
        title: row.name,
        subtitle: row.description,
        ...StationTypes[row.type],
        action: t("Delete"),
        onClick: () => {
            data.splice(i, 1);
            settingsStorage.setItem("stations", JSON.stringify(data));
        }
    }))
}

function AvailableStations(settingsStorage) {
    let data = settingsStorage.getItem("available_stations");
    if(!data || data[0] !== "[") return [];
    data = JSON.parse(data);

    return data.map((row) => RowWithButton({
        title: row.name,
        subtitle: row.description,
        ...StationTypes[row.type],
        color: "#C8E6C9",
        action: t("Add"),
        onClick: () => {
            let stations = JSON.parse(settingsStorage.getItem("stations"));
            if(!stations) stations = [];
            stations.push(row);
            settingsStorage.setItem("stations", JSON.stringify(stations));
        }
    }))
}