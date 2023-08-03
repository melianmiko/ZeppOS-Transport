import {gettext as t} from "i18n";
import {ListScreen} from "../lib/mmk/ListScreen";
import {createSpinner} from "../lib/Utils";

const {config, messageBuilder} = getApp()._options.globalData

class HomeScreen extends ListScreen {
    constructor() {
        super();
        this.fontSize = config.get("fontSize", this.fontSize);
        this.accentColor = 0x673AB7;
    }

    start() {
        hmSetting.setBrightScreen(30);
        hmUI.updateStatusBarTitle(t("Transport"));

        this.deleteSpinner = createSpinner();

        messageBuilder.request({
            action: "get_stations"
        }).then((d) => {
            this.buildUI(d);
        })
    }

    buildUI(rows) {
        this.deleteSpinner();

        this.row({
            icon: "about.png",
            text: t("About..."),
            callback: () => hmApp.gotoPage({
                url: "page/AboutScreen",
            })
        })
        this.row({
            icon: "fontSize.png",
            text: t("Font size..."),
            callback: () => hmApp.gotoPage({
                url: "page/FontSizeSetupScreen",
            })
        })
        this.headline(t("Stations"));

        for (const row of rows) {
            this.displayRow(row);
        }

        this.text({
            text: t("Add or remove stations from Zepp application on your phone."),
            align: hmUI.align.CENTER_H,
            fontSize: this.fontSize - 4,
            bottomOffset: 32,
            color: 0xAAAAAA,
        })

        this.offset();
    }

    displayRow(row) {
        this.row({
            text: row.name,
            description: row.description,
            icon: `stations/${row.type}.png`,
            callback: () => {
                hmApp.gotoPage({
                    url: "page/ViewStation",
                    param: JSON.stringify(row),
                })
            }
        });
    }
}

Page({
    build() {
        new HomeScreen().start()
    }
})
