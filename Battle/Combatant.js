class Combatant {
    constructor (config, battle) {
        // Info about combatant
        Object.keys(config).forEach(key => {
            this[key] = config[key]; // Get all variables like HP, Max HP, name etc.
        })
        
        this.battle = battle;
    }

    get hpPercent () {
        const percent = this.hp / this.maxHp * 100;
        return percent > 0 ? percent : 0; // If <0 just return 0
    }

    get xpPercent () {
        return this.xp / this.maxXp * 100;
    }

    get isActive () {
        // this.team because there are 2 keys: player and enemy. we want to check if our id is the one at our team
        return this.battle.activeCombatants[this.team] === this.id; 
    }

    createElement () {
        this.hudElement = document.createElement("div");
        this.hudElement.classList.add("Combatant");
        this.hudElement.setAttribute("data-combatant", this.id); // which combatant this is
        this.hudElement.setAttribute("data-team", this.team); // which team they belong to (to place them where?)

        /*
        -> name of pizza
        -> level will start empty, will dynamically fill it (might gain xp and level up)
        -> little avatar (won't be used in combat, but will be used to display pizza in your monster selection menu)
        -> combatant type icon
        -> 2x svgs for HP bar and XP bar. Different colors and positions
            -> the width 0%s will be changed dynamically (depending on how much xp/health you have)
        */
        this.hudElement.innerHTML = (`
            <p class="Combatant_name">${this.name}</p> 
            <p class="Combatant_level"></p>
            <div class="Combatant_character_crop">
                <img class="Combatant_character" alt="${this.name}" src="${this.src}" />
            </div>
            <img class="Combatant_type" alt="${this.type}" src="${this.icon}" />
            <svg viewBox="0 0 26 3" class="Combatant_life-container">
                <rect x=0 y=0 width="0%" height=1 fill="#82ff71" />
                <rect x=0 y=1 width="0%" height=2 fill="#3ef126" />
            </svg>
            <svg viewBox="0 0 26 2" class="Combatant_xp-container">
                <rect x=0 y=0 width="0%" height=1 fill="#ffd76a" />
                <rect x=0 y=1 width="0%" height=1 fill="#ffc934" />
            </svg>
            <p class="Combatant_status"></p>
        `);

        this.pizzaElement = document.createElement("img");
        this.pizzaElement.classList.add("Pizza");
        this.pizzaElement.setAttribute("src", this.src);
        this.pizzaElement.setAttribute("alt", this.name);
        this.pizzaElement.setAttribute("data-team", this.team);

        this.hpFills = this.hudElement.querySelectorAll(".Combatant_life-container > rect"); // find rectangles under
        this.xpFills = this.hudElement.querySelectorAll(".Combatant_xp-container > rect");
    }

    update(changes = {}) {
        // Update anything incoming
        Object.keys(changes).forEach(key => {
            this[key] = changes[key];
        });

        // Update active flag to show the corret pizza & hud
        this.hudElement.setAttribute("data-active", this.isActive);
        this.pizzaElement.setAttribute("data-active", this.isActive);

        // Update HP & HP percent fills
        this.hpFills.forEach(rect => rect.style.width = `${this.hpPercent}%`);
        this.xpFills.forEach(rect => rect.style.width = `${this.xpPercent}%`);

        // Update level on screen
        this.hudElement.querySelector(".Combatant_level").innerText = this.level;

        // Update status
        const statusElement = this.hudElement.querySelector(".Combatant_status");
        if (this.status) {
            statusElement.innerText = this.status.type;
            statusElement.style.display = "block";
        } else {
            statusElement.innerText = "";
            statusElement.style.display = "none";
        }
    } 

    getReplacedEvents(originalEvents) {

        if (this.status?.type === "clumsy" && utils.randomFromArray([true, false, false])) { // 33% chance of failure if clumsy
            return [
                { type: "animation", animation: "actionFailure" },
                { type: "textMessage", text: "Slipping over! Action failed" }, // Original move will be replaced with this!
            ]
        }

        return originalEvents;
    }

    getPostEvents() {
        
        if(this.status?.type === "saucy") {
            return [
                { type: "textMessage", text: "Saucy state effect triggered" },
                { type: "stateChange", recover: 5, onCaster: true} // Heal the caster, not the target!
            ]
        }

        return [];
    }

    decrementStatus() {
        if (this.status?.expiresIn > 0) {
            this.status.expiresIn -= 1;
            if (this.status.expiresIn === 0) {
                let statusName = this.status.type

                this.update({
                    status: null // remove the status
                })
                
                return {
                    type: "textMessage",
                    text: "Status effect " + statusName + " has expired."
                }
            }
        }
    }

    init (container) {
        this.createElement();
        container.appendChild(this.hudElement);
        container.appendChild(this.pizzaElement);
        this.update(); // Populate initial values
    }
}