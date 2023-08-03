import {gettext as t} from "i18n";
import { BaseAboutScreen } from "../lib/mmk/BaseAboutScreen";
import {VERSION} from "../version";

export class AboutScreen extends BaseAboutScreen {
  constructor() {
    super();
    this.appId = 1030884;
    this.appName = t("Transport");
    this.version = VERSION;
    this.donateUrl = `page/DonateScreen`;
    this.donateText = t("Donate");

    this.infoRows = [
      ["melianmiko", "Developer"],
    ];
  }
}

Page({
  onInit() {
    hmUI.setStatusBarVisible(false);
    new AboutScreen().start();
  }
})
