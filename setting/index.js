import {gettext as t} from "i18n";
import {StationsSetup} from "./StationsSetup";
import {LinksSection} from "./LinksSection";
import {BottomToolbar, SettingsBody} from "../lib/mmk/setting/Layout";
import {TabButton, TabOffset} from "../lib/mmk/setting/Tabs";
import {ABOUT_32, SETTINGS_32} from "../lib/mmk/setting/Icons";
import {StateManager} from "../lib/mmk/setting/StateManager";
import {PleaseSelectCityPopup} from "./PleaseSelectCityPopup";
import {Theme} from "../lib/mmk/setting/Theme";
import {BUS_32} from "./ui/icons";
import {AppSettingsPane} from "./AppSettingsPane";

Theme.accentColor = "#673AB7";
Theme.accentLightColor = "#ebe7ff";

function Home(ctx) {
  if(!ctx.settingsStorage.getItem("selected_city")) {
    return PleaseSelectCityPopup(ctx);
  }

  return StationsSetup(ctx);
}

AppSettingsPage({
  build(ctx) {
    const state = new StateManager(ctx, "root");
    const [tab, setTab] = state.useState("stations")

    // Trigger Side-Service to start
    const nowTag = (new Date()).toISOString().substring(0, 19);
    if(ctx.settingsStorage.getItem("now") !== nowTag) ctx.settingsStorage.setItem("now", nowTag);

    return SettingsBody([
      tab === "stations" ? Home(ctx) : null,
      tab === "settings" ? AppSettingsPane(ctx) : null,
      tab === "about" ? View({}, LinksSection()) : null,
      TabOffset(),
      BottomToolbar([
          TabButton({
            text: t("Stations"),
            icon: BUS_32,
            active: tab === "stations",
            callback: () => setTab("stations"),
          }),
          TabButton({
            text: t("Settings"),
            icon: SETTINGS_32,
            active: tab === "settings",
            callback: () => setTab("settings"),
          }),
          TabButton({
            text: t("About"),
            icon: ABOUT_32,
            active: tab === "about",
            callback: () => setTab("about"),
          }),
      ])
    ])
  }
})
