import {gettext as t} from "i18n";
import {TextRoot} from "../lib/mmk/setting/Layout";
import {Link, Paragraph, Title} from "../lib/mmk/setting/Typography";

/**
 * Links section on "About" tab
 *
 * @returns {*} Vuew
 */
export function LinksSection() {
    return TextRoot([
        Title(t("Notices")),
        Paragraph(t("This applications uses publicly-available information from bus62.ru, and it provides only countries and cities that are connected to this system.")),
        Title(t("Links")),
        Paragraph([
            t("Like this application? Consider to support their development with a small donation: "),
            Link("https://mmk.pw/donate"),
        ]),
        Paragraph([
            t("Source code available: "),
            Link("https://github.com/melianmiko/ZeppOS-Transport"),
        ]),
    ])
}