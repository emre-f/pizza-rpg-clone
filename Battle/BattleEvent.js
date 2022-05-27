class BattleEvent {
    constructor(event, battle) {
        this.event = event;
        this.battle = battle;
    }

    textMessage (resolve) {
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
        const { caster, target, damage, recover, status, action } = this.event;
        let who = this.event.onCaster ? caster : target; // Should we heal the caster or the target? Does it have the flag?
        if(action.targetType === "friendly") {
            who = caster; // later will be able to choose teammate
        }

        if (damage) {
            // Modify target
            target.update({
                hp: target.hp - damage
            })

            // Start blinking
            target.pizzaElement.classList.add("battle-damage-blink");
        }

        if (recover) {
            let newHp = who.hp + recover;
            if (newHp > who.maxHp) { newHp = who.maxHp }; // Can't overheal
            
            who.update({
                hp: newHp
            })
        }

        if (status) {
            who.update({
                status: {...status} // Copy the status object over
            })
        }
        if (status === null) {
            who.update({
                status: null
            })
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