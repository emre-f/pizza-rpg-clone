class Person extends GameObject {
    constructor(config) {
        super(config); // Constructor for GameObject class
        this.movingProgressRemaining = 0; // Person can't exist in-between cells, they have to be in a cell
        this.isStanding = false;

        this.isPlayerControlled = config.isPlayerControlled || false; // Only player controlled Persons will move with keyboard input

        this.directionUpdate = { // What to do in each direction
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        }
    }

    update(state) {
        if(this.movingProgressRemaining > 0) { // If we are in-between cells, continue finishing that move
            this.updatePosition();
        } else {

            // More cases for starting to walk will come here

            // Case: We're keyboard ready, and have an arrow pressed
            if(!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow,
                })
            }
            this.updateSprite(state);
        }
    }

    startBehavior(state, behavior) {
        // Setting character direction to behavior
        this.direction = behavior.direction;
        if(behavior.type === "walk") {
            // If space is taken, don't move
            if(state.map.isSpaceTaken(this.x, this.y, this.direction)) { 
                
                // If retry = true, try again in 10ms
                behavior.retry && setTimeout(() => {
                    this.startBehavior(state, behavior)
                }, 10)

                return;
            }

            // Ready to walk!
            state.map.moveWall(this.x, this.y, this.direction); // Move the "wall" that is on the character as character moves
            this.movingProgressRemaining = 16;
            this.updateSprite(state); // Play the animation frame also
        }

        if(behavior.type === "stand") {
            this.isStanding = true; // So that standing actions can't overlap
            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", { whoId: this.id })
                this.isStanding = false;
            }, behavior.time)
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]; // If direction is "down", propery will be "y" and dir will be 1
        this[property] += change;
        this.movingProgressRemaining -= 1;

        if(this.movingProgressRemaining === 0) {
            // We finished the walk
            utils.emitEvent("PersonWalkingComplete", { whoId: this.id })
        }
    }

    updateSprite() { // Changing the animation depending on the direction we are looking towards
        if (this.movingProgressRemaining > 0) { // If moving
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction); // If not moving -> idle
    }
}