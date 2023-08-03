import {ListScreen} from "../lib/mmk/ListScreen";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "../lib/mmk/UiParams";
import {gettext as t} from "i18n";
import {createSpinner} from "../lib/Utils";

const { config, messageBuilder } = getApp()._options.globalData

class StationInfoScreen extends ListScreen {
    constructor(props) {
        super(props);
        this.fontSize = config.get("fontSize", this.fontSize);
    }

    start(data) {
        this.param = data;

        data = JSON.parse(data)
        hmUI.setStatusBarVisible(true);
        hmUI.updateStatusBarTitle(data.name);
        hmApp.setScreenKeep(true);
        hmSetting.setBrightScreen(15);

        this.id = data.id;
        this.deleteSpinner = createSpinner();

        messageBuilder.request({
            action: "get_station_info",
            id: data.id
        }).then((d) => {
            console.log(d);
            this.buildUI(d);
        })
    }

    buildUI(data) {
        this.fetchedAt = Date.now();
        this.deleteSpinner();
        for(const row of data)
            this.buildRow(row);

        if(data.length === 0) {
            hmUI.createWidget(hmUI.widget.TEXT, {
                x: 0,
                y: 0,
                w: SCREEN_WIDTH,
                h: SCREEN_HEIGHT,
                color: 0xDDDDDD,
                text_size: this.fontSize,
                text_style: hmUI.text_style.WRAP,
                align_h: hmUI.align.CENTER_H,
                align_v: hmUI.align.CENTER_V,
                text: t("Nothing to show. Looks like this station is closed for nwo."),
            });
        }

        timer.createTimer(0, 5000, () => {
            if(Date.now() - this.fetchedAt > 60000)
                hmApp.reloadPage({
                    url: "page/ViewStation",
                    param: this.param,
                })
        })

        this.offset();
    }

    buildRow(row) {
        let est = Math.floor(row.est / 60);
        est = est < 1 ? t("Near")  : est + " " + t("min.");
        this.field({
            headline: row.name,
            headlineColor: this.getColor(row.name.substring(0, 2)),
            text: String(est),
        });
        this.text({
            text: t("Now at") + " " + row.where,
            color: 0x999999,
            fontSize: this.fontSize - 4,
            topOffset: -16,
            bottomOffset: 16,
        })
    }

    getColor(tag) {
        switch (tag) {
            case "Тр":
                return 0x4CAF50;
            case "А-":
            case "A-":
                return 0xEF5350;
            case "Т-":
            case "T-":
                return 0x26C6DA;
            case "М-":
                return 0xFFA726;
            default:
                return 0x999999;
        }
    }
}

Page({
    onInit(p) {
        new StationInfoScreen().start(p);
    }
})