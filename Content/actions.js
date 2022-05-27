window.Actions = {
    damage1: {
        name: "Whomp!",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}" },
            { type: "animation", animation: "spin" },
            { type: "stateChange", damage: 10 },
        ]
    },
    saucyStatus: {
        name: "Tomato Splash",
        targetType: "friendly", // can use this on who?
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}" },
            // { type: "animation", animation: "spin" },
            { type: "stateChange", status: { type: "saucy", expiresIn: 3} },
        ]
    },
    clumsyStatus: {
        name: "Olive Oil Splash",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}" },
            { type: "animation", animation: "glob", color: "#dafd2a" }, // also passing it a color
            { type: "stateChange", status: { type: "clumsy", expiresIn: 3} },
        ]
    }
}