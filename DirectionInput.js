class DirectionInput {
    constructor() {
        this.heldDirection = []; // Which direction movements were held in before

        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right",
        }
    }

    get direction() {
        return this.heldDirection[0]; // Letting other objects asks for which direction we are moving in
    }

    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            if(dir && this.heldDirection.indexOf(dir) === -1) { // dir is found in map (valid input), and its not already held (not in heldDirection)
                this.heldDirection.unshift(dir); // Put in the BEGINNING of the array
            }
        });
        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const index = this.heldDirection.indexOf(dir);
            if (index > -1) { // If key was already being held
                this.heldDirection.splice(index, 1); // Remove it from list
            }
        })
    }
}