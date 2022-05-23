window.BattleAnimations = {
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
    }
}