class Battle {
    constructor() {
        this.combatants = {
            "player1": new Combatant({
                ...Pizzas.s001, // get pre-defined stuff, same as writing ...Pizzas["s001"]
                team: "player", // two teams player or enemy
                hp: 50, // add more stuff
                maxHp: 50,
                xp: 0,
                maxXp: 100,
                level: 1,
                status: null
            }, this),
            "enemy1": new Combatant({
                ...Pizzas.v001,
                team: "enemy",
                hp: 50,
                maxHp: 50,
                xp: 20,
                maxXp: 100,
                level: 1,
                status: null
            }, this),
            "enemy2": new Combatant({
                ...Pizzas.f001,
                team: "enemy", 
                hp: 50,
                maxHp: 50,
                xp: 30,
                maxXp: 100,
                level: 1,
                status: null
            }, this)
        }
        this.activeCombatants = {
            player: "player1",
            enemy: "enemy1",
        }
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Battle");
        this.element.innerHTML = `
        <div class="Battle_hero">
            <img src="${'images/characters/people/hero.png'}" alt="Hero" />
        </div>
        <div class="Battle_enemy">
            <img src="${'images/characters/people/npc3.png'}" alt="Enemy" />
        </div>
        `;
    }   

    init(container) {
        this.createElement(); // Create the element
        container.appendChild(this.element); // Inject it to the "mother" container

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element);
        })

        this.turnCycle = new TurnCycle({ // Setting up the turn cycle system
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this);
                    battleEvent.init(resolve);
                })
            }
        })
        this.turnCycle.init();
    }
}