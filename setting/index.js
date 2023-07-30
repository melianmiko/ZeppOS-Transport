import {gettext as t} from "i18n";
import {CityPicker} from "./CityPicker";
import {StationsSetup} from "./StationsSetup";
import {LinksSection} from "./LinksSection";

function Home(settingsStorage) {
  if(settingsStorage.getItem("available_cities")) return CityPicker(settingsStorage);
  if(!settingsStorage.getItem("selected_city")) {
    return Button({
      label: t("Select city..."),
      style: {
        display: "block",
        width: "100%",
      },
      onClick: () => {
        console.log(1111);
        settingsStorage.setItem("available_cities", "[]");
      }
    })
  }

  return StationsSetup(settingsStorage);
}

AppSettingsPage({
  build(p) {
    const settingsStorage = p.settingsStorage;

    // Trigger Side-Service to start
    const nowTag = (new Date()).toISOString().substring(0, 19);
    if(settingsStorage.getItem("now") !== nowTag) settingsStorage.setItem("now", nowTag);

    return View({
      style: {
        margin: "8px"
      }
    }, [
        Home(settingsStorage),
        ...LinksSection(),
    ])
  }
})
