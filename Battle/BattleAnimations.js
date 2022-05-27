window.BattleAnimations = {
    // SEE Battle.css for more animation detail

    async spin(event, onComplete) {
        const element = event.caster.pizzaElement;

        // Left or right?
        const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";

        element.classList.add(animationClassName);

        // Remove class when animation is done
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, { once: true }); // removed after once

        await utils.wait(100); // We want to sync-up the pizza hitting the target and health going down
        onComplete();
    },

    async glob(event, onComplete) {
        const {caster} = event;
        
        let div = document.createElement("div");
        div.classList.add("glob-orb");
        div.classList.add(caster.team === "player"? "battle-glob-right" : "battle-glob-left");

        div.innerHTML = (`
            <svg viewBox="0 0 32 32" width="32" height="32">
                <circle cx="16" cy="16" r="16" fill="${event.color}" />
            </svg>
        `);

        // Remove when animation is complete
        div.addEventListener("animationend", () => {
            div.remove();
        });

        document.querySelector(".Battle").appendChild(div);

        await utils.wait(820); // We want to sync-up the pizza hitting the target and health going down
        onComplete();
    },

    async actionFailure(event, onComplete) {
        const element = event.caster.pizzaElement;

        // Left or right?
        const animationClassName = "battle-action-miss";

        element.classList.add(animationClassName);

        // Remove class when animation is done
        element.addEventListener("animationend", () => {
            element.classList.remove(animationClassName);
        }, { once: true }); // removed after once

        await utils.wait(100); // We want to sync-up the pizza hitting the target and health going down
        onComplete();
    }
}