export function Headline(text) {
    return View({
        style: {
            margin: "8px 0",
            color: "#673AB7",
            fontSize: ".9em"
        }
    }, [
        Text({bold: true}, text)]
    );
};
