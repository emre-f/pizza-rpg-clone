class Person extends GameObject {
    constructor(config) {
        super(config); // Constructor for GameObject class
        this.movingProgressRemaining = 16; // Person can't exist in-between cells, they have to be in a cell

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
            if(this.isPlayerControlled && state.arrow) {
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
            if(state.map.isSpaceTaken(this.x, this.y, this.direction)) { // If space is taken, don't move
                return;
            }

            // Ready to walk!
            state.map.moveWall(this.x, this.y, this.direction); // Move the "wall" that is on the character as character moves
            this.movingProgressRemaining = 16;
        }
    }

    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction]; // If direction is "down", propery will be "y" and dir will be 1
        this[property] += change;
        this.movingProgressRemaining -= 1;
    }

    updateSprite() { // Changing the animation depending on the direction we are looking towards
        if (this.movingProgressRemaining > 0) { // If moving
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction); // If not moving -> idle
    }
}