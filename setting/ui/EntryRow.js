export function EntryRow(data) {
    return Button({
        ...data,
        style: {
            display: "block",
            fontSize: "1.1em",
            borderBottom: "thin #ddd solid",
            boxShadow: "none",
            background: "none",
            textAlign: "left",
            width: "100%",
            margin: "0"
        }
    })
}