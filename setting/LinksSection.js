import {gettext as t} from "i18n";
import {Paragraph2} from "./ui/Paragraph";
import {Header} from "./ui/Header";

export const URL_TO_COPY = {
  style: {
    userSelect: "text",
    display: "block",
    color: "#673AB7",
  }
}

export function LinksSection() {
    return [
        Header(t("Links")),
        Paragraph2([
            Text({}, t("Like this application? Consider to support their development with a small donation: ")),
            Text(URL_TO_COPY, "https://mmk.pw/donate")
        ]),
        Paragraph2([
            Text({}, t("Source code available: ")),
            Text(URL_TO_COPY, "https://github.com/melianmiko/ZeppOS-Transport")
        ]),
    ]
}