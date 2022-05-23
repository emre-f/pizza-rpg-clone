class TurnCycle {
    constructor( { battle, onNewEvent }) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.currentTeam = "player" // or "enemy"
    }

    async turn() {
        // Get the caster
        const casterId = this.battle.activeCombatants[this.currentTeam];
        const caster = this.battle.combatants[casterId]; // the caster

        // Get the enemy
        const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"];
        const enemy = this.battle.combatants[enemyId];

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            enemy
        })

        const resultingEvents = submission.action.success;

        for (let i = 0; i < resultingEvents.length; i++) {
            const event = {
                ...resultingEvents[i], // configuration of the event (text message, the text etc.)
                submission, // what we submitted
                action: submission.action,
                caster,
                target: submission.target,
            }
            await this.onNewEvent(event);
        }

        // Next turn
        this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
        this.turn();
    }

    async init() {
        await this.onNewEvent({
            type: "textMessage",
            text: "The battle is starting"
        })

        // Start the first turn
        this.turn();
    }
}