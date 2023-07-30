export function RowWithButton(cfg) {
    return View({
        style: {
            display: "flex",
            alignItems: "center",
            margin: "8px 0"
        }
    }, [
        View({
            style: {
                flex: 1,
                width: "0"
            }
        }, [
            View({}, [
                cfg.prefix ? Text({
                    style: {
                        color: cfg.prefixColor,
                        marginRight: "8px",
                        fontWeight: "bold"
                    }
                }, cfg.prefix) : null,
                Text({}, cfg.title),
            ]),
            Text({
                style: {
                    display: "block",
                    fontSize: "0.8em",
                    color: "#555"
                }
            }, cfg.subtitle),
        ]),
        Button({
            label: cfg.action,
            style: {
                background: cfg.color,
                boxShadow: "none",
                width: "80px",
                padding: "2px 12px"
            },
            onClick: cfg.onClick,
        })
    ])
}