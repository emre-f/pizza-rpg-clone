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
        this.updatePosition();

        if(this.isPlayerControlled && this.movingProgressRemaining === 0 && state.arrow) {
            this.direction = state.arrow;
            this.movingProgressRemaining = 16;
        }
    }

    updatePosition() {
        if(this.movingProgressRemaining > 0) { // If we are in-between cells, continue finishing that move
            const [property, change] = this.directionUpdate[this.direction]; // If direction is "down", propery will be "y" and dir will be 1
            this[property] += change;
            this.movingProgressRemaining -= 1;
        }
    }
}