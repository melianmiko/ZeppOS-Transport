import {gettext as t} from "i18n";
import {TextRoot} from "../lib/mmk/setting/Layout";
import {Link, Paragraph, Title} from "../lib/mmk/setting/Typography";

export const URL_TO_COPY = {
  style: {
    userSelect: "text",
    display: "block",
    color: "#673AB7",
  }
}

export function LinksSection() {
    return TextRoot([
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