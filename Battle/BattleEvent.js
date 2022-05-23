class BattleEvent {
    constructor(event, battle) {
        this.event = event;
        this.battle = battle;
    }

    textMessage (resolve) {
        console.log(this.event)
        const text = this.event.text
        .replace("{CASTER}", this.event.caster?.name)
        .replace("{TARGET}", this.event.target?.name)
        .replace("{ACTION}", this.event.action?.name)

        const message = new TextMessage({
            text,
            onComplete: () => { // When completed (aka player presses enter to skip)
                resolve(); // resolve this event
            }
        })
        message.init( this.battle.element );
    }

    async stateChange(resolve) {
        const { caster, target, damage } = this.event;
        if (damage) {
            // Modify target
            target.update({
                hp: target.hp - damage
            })

            // Start blinking
            target.pizzaElement.classList.add("battle-damage-blink");
        }

        // Wait a bit (so that user can see whats happening)
        await utils.wait(600)
        
        // Stop blinking
        target.pizzaElement.classList.remove("battle-damage-blink");

        resolve();
    }

    submissionMenu (resolve) {
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            onComplete: submission => { // submission: what move to use, who to use it on, etc.
                resolve(submission);
            }
        })
        menu.init( this.battle.element );
    }

    animation (resolve) {
        const fn = BattleAnimations[this.event.animation]; // Find the animation from our file
        fn(this.event, resolve);
    }

    init (resolve) {
        this[this.event.type](resolve); // Resolve whatever type of event was received
    }
}