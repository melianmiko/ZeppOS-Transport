import {gettext as t} from "i18n";
import {Header} from "./ui/Header";
import {EntryRow} from "./ui/EntryRow";
import {Paragraph} from "./ui/Paragraph";

export function CityPicker(settingsStorage) {
    const citiesData = settingsStorage.getItem("available_cities");
    const cities = JSON.parse(citiesData);
    console.log(cities);

    return View({}, [
        Header(t("Select city...")),
        cities.length === 0 ? Paragraph(t("Loading...")) : null,
        ...cities.map((row) => EntryRow({
            label: row.name,
            onClick: () => {
                settingsStorage.setItem("selected_city_name", row.name);
                settingsStorage.setItem("selected_city", row.code);
                settingsStorage.removeItem("available_cities");
            }
        }))
    ]);
}
