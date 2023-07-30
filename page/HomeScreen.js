import {gettext as t} from "i18n";
import {ListScreen} from "../lib/mmk/ListScreen";
import {SCREEN_HEIGHT, SCREEN_WIDTH, WIDGET_WIDTH} from "../lib/mmk/UiParams";

const {config, messageBuilder} = getApp()._options.globalData

class HomeScreen extends ListScreen {
    constructor() {
        super();
        this.fontSize = config.get("fontSize", this.fontSize);
    }

    start() {
        hmSetting.setBrightScreen(30);
        hmUI.updateStatusBarTitle(t("Stations"));

        this.spinner = hmUI.createWidget(hmUI.widget.IMG, {
            x: (SCREEN_WIDTH - 48) / 2,
            y: (SCREEN_HEIGHT - 48) / 2,
            src: "spinner.png"
        });

        messageBuilder.request({
            action: "get_stations"
        }).then((d) => {
            this.buildUI(d);
        })
    }

    buildUI(rows) {
        hmUI.deleteWidget(this.spinner);
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

        this.row({
            icon: "fontSize.png",
            text: t("Font size..."),
            callback: () => hmApp.gotoPage({
                url: "page/FontSizeSetupScreen",
            })
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
