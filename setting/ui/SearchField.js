export function SearchField(props) {
    return TextInput({
        label: props.placeholder,
        onChange: props.onChange,
        value: props.value,
        subStyle: {
            border: "thin rgba(0,0,0,0.1) solid",
            borderRadius: "8px",
            marginTop: "-1em",
            marginBottom: "12px",
            padding: "8px",
            paddingTop: "1.2em",
            height: "1.5em",
            boxSizing: "content-box",
            lineHeight: "1.5em",
            color: "#000"
        },
        labelStyle: {
            position: "relative",
            top: "0.2em",
            color: "#555",
            paddingLeft: "8px",
            fontSize: "0.8em"
        }
    })
}