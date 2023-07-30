export function Header(text) {
    return Text({
        bold: true,
        style: {
            marginTop: "0.5em",
            display: "block",
            marginBottom: "0.25em",
            fontSize: "2rem"
        }
    }, text);
}